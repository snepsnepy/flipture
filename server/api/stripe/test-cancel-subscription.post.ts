// TEST ENDPOINT - Remove in production!
// server/api/stripe/test-cancel-subscription.post.ts

import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: "2024-11-20.acacia" as any,
  });

  try {
    const body = await readBody(event);
    const { subscriptionId } = body;

    if (!subscriptionId) {
      throw createError({
        statusCode: 400,
        message: "Missing subscriptionId",
      });
    }

    // Cancel the subscription immediately
    const canceledSubscription = await stripe.subscriptions.cancel(
      subscriptionId
    );

    return {
      success: true,
      subscription: canceledSubscription,
    };
  } catch (error: any) {
    console.error("Error canceling subscription:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to cancel subscription",
    });
  }
});

