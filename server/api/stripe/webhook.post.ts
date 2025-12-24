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
        console.error(`Payment failed for invoice ${invoice.id}`);
        // You can add logic to notify the user or handle the failed payment
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
