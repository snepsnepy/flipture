import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: "2024-11-20.acacia" as any,
  });

  try {
    // Get the raw body for signature verification
    const body = await readRawBody(event);
    const signature = getHeader(event, "stripe-signature");

    if (!body || !signature) {
      throw createError({
        statusCode: 400,
        message: "Missing body or signature",
      });
    }

    // Verify webhook signature
    let stripeEvent: Stripe.Event;
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        body,
        signature,
        config.stripeWebhookSecret
      );
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      throw createError({
        statusCode: 400,
        message: `Webhook Error: ${err.message}`,
      });
    }

    // Initialize Supabase client with service role key to bypass RLS
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      config.supabaseSecretKey!
    );

    // Handle different event types
    switch (stripeEvent.type) {
      case "checkout.session.completed": {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription as string;

        if (userId && subscriptionId) {
          // Retrieve subscription details
          const subscription = await stripe.subscriptions.retrieve(
            subscriptionId
          );

          const priceId = subscription.items.data[0].price.id;

          // Determine plan type
          const planType =
            priceId === config.public.stripePremiumPriceId
              ? "premium"
              : "standard";

          // Convert timestamp safely
          const periodEnd = (subscription as any).current_period_end
            ? new Date(
                (subscription as any).current_period_end * 1000
              ).toISOString()
            : null;

          // Get user profile for email
          const { data: profile } = await supabase
            .from("profiles")
            .select("email, full_name")
            .eq("id", userId)
            .single();

          // Update user subscription in database
          const { error } = await supabase
            .from("profiles")
            .update({
              subscription_status: "active",
              subscription_plan: planType,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: subscriptionId,
              subscription_current_period_end: periodEnd,
            })
            .eq("id", userId);

          if (error) {
            console.error("Error updating user subscription:", error);
          } else {
            console.log(
              `✅ Subscription created for user ${userId}: ${planType} plan`
            );

            // Send subscription success email
            if (profile?.email) {
              const userName = profile.full_name || "there";
              const planName = planType === "premium" ? "Premium" : "Standard";
              const amount =
                planType === "premium" ? "€59.99/year" : "€5.99/month";

              try {
                const { sendEmail, emailTemplates } = await import(
                  "../../utils/sendEmail"
                );
                const emailContent = emailTemplates.subscriptionSuccess(
                  userName,
                  planName,
                  amount
                );

                await sendEmail({
                  to: profile.email,
                  subject: emailContent.subject,
                  html: emailContent.html,
                  text: emailContent.text,
                });

                console.log(
                  `📧 Subscription success email sent to ${profile.email}`
                );
              } catch (emailError) {
                console.error(
                  "Error sending subscription success email:",
                  emailError
                );
                // Don't fail the webhook if email fails
              }
            }
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (userId) {
          const priceId = subscription.items.data[0].price.id;
          const planType =
            priceId === config.public.stripePremiumPriceId
              ? "premium"
              : "standard";

          // Convert timestamp safely
          const periodEnd = (subscription as any).current_period_end
            ? new Date(
                (subscription as any).current_period_end * 1000
              ).toISOString()
            : null;

          // Build update data - only update fields that have values
          const updateData: any = {
            subscription_status: subscription.status,
            subscription_plan: planType,
          };

          // Only update period end if we have a value (prevents overwriting with null)
          if (periodEnd) {
            updateData.subscription_current_period_end = periodEnd;
          }

          const { error } = await supabase
            .from("profiles")
            .update(updateData)
            .eq("id", userId);

          if (error) {
            console.error("Error updating subscription:", error);
          } else {
            console.log(
              `✅ Subscription updated for user ${userId}: ${subscription.status}`
            );
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (userId) {
          // Get user profile to fetch email and details
          const { data: profile } = await supabase
            .from("profiles")
            .select("email, full_name, subscription_plan")
            .eq("id", userId)
            .single();

          // Update subscription status in database
          const { error } = await supabase
            .from("profiles")
            .update({
              subscription_status: "canceled",
              subscription_plan: null,
              stripe_subscription_id: null,
              subscription_current_period_end: null,
            })
            .eq("id", userId);

          if (error) {
            console.error("Error canceling subscription:", error);
          } else {
            console.log(`✅ Subscription canceled for user ${userId}`);

            // Send cancellation email notification
            if (profile?.email) {
              const userName = profile.full_name || "there";
              const planName =
                profile.subscription_plan === "premium"
                  ? "Premium"
                  : "Standard";

              try {
                const { sendEmail, emailTemplates } = await import(
                  "../../utils/sendEmail"
                );
                const emailContent = emailTemplates.subscriptionCancelled(
                  userName,
                  planName
                );

                await sendEmail({
                  to: profile.email,
                  subject: emailContent.subject,
                  html: emailContent.html,
                  text: emailContent.text,
                });

                console.log(`📧 Cancellation email sent to ${profile.email}`);
              } catch (emailError) {
                console.error("Error sending cancellation email:", emailError);
                // Don't fail the webhook if email fails
              }
            }
          }
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = stripeEvent.data.object as Stripe.Invoice;
        console.log(`Payment succeeded for invoice ${invoice.id}`);
        // You can add additional logic here if needed
        break;
      }

      case "invoice.payment_failed": {
        const invoice = stripeEvent.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        console.error(`Payment failed for invoice ${invoice.id}`);

        // Get user by Stripe customer ID
        const { data: profile } = await supabase
          .from("profiles")
          .select("id, email, full_name")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile?.email) {
          const userName = profile.full_name || "there";

          try {
            const { sendEmail, emailTemplates } = await import(
              "../../utils/sendEmail"
            );
            const emailContent = emailTemplates.paymentFailed(userName);

            await sendEmail({
              to: profile.email,
              subject: emailContent.subject,
              html: emailContent.html,
              text: emailContent.text,
            });

            console.log(`📧 Payment failed email sent to ${profile.email}`);
          } catch (emailError) {
            console.error("Error sending payment failed email:", emailError);
            // Don't fail the webhook if email fails
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return { received: true };
  } catch (error: any) {
    console.error("Webhook error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Webhook processing failed",
    });
  }
});
