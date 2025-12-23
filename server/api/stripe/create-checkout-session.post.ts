import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: "2024-11-20.acacia" as any,
  });

  try {
    const body = await readBody(event);
    const { priceId, userId, userEmail } = body;

    console.log("Received checkout request:", {
      priceId,
      userId,
      userEmail,
      body,
    });

    if (!priceId || !userId || !userEmail) {
      console.error("Missing required fields:", {
        hasPriceId: !!priceId,
        hasUserId: !!userId,
        hasUserEmail: !!userEmail,
        body,
      });
      throw createError({
        statusCode: 400,
        message: "Missing required fields",
      });
    }

    // Get the request origin for redirect URLs
    const origin = getRequestURL(event).origin;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      metadata: {
        userId,
      },
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard?canceled=true`,
      subscription_data: {
        metadata: {
          userId,
        },
      },
    });

    return {
      sessionId: session.id,
      url: session.url,
    };
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to create checkout session",
    });
  }
});
