import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2024-11-20.acacia',
  });

  try {
    const body = await readBody(event);
    const { customerId } = body;

    if (!customerId) {
      throw createError({
        statusCode: 400,
        message: 'Missing customerId',
      });
    }

    // Get the request origin for return URL
    const origin = getRequestURL(event).origin;

    // Create a portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard`,
    });

    return {
      url: session.url,
    };
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create portal session',
    });
  }
});

