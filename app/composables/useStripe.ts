import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

export const useStripe = () => {
  const config = useRuntimeConfig();
  let stripePromise: Promise<Stripe | null>;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(config.public.stripePublishableKey);
    }
    return stripePromise;
  };

  const createCheckoutSession = async (
    priceId: string,
    userId: string,
    userEmail: string
  ) => {
    try {
      console.log('Creating checkout session with:', { priceId, userId, userEmail });
      
      const data = await $fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        body: {
          priceId,
          userId,
          userEmail,
        },
      });

      console.log('Checkout session created:', data);
      return data;
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  };

  const redirectToCheckout = async (
    priceId: string,
    userId: string,
    userEmail: string
  ) => {
    try {
      const session = await createCheckoutSession(priceId, userId, userEmail);
      
      if (session?.url) {
        // Redirect to Stripe Checkout
        window.location.href = session.url;
      }
    } catch (error: any) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  };

  const redirectToCustomerPortal = async (customerId: string) => {
    try {
      const data = await $fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        body: {
          customerId,
        },
      }) as any;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Error redirecting to portal:', error);
      throw error;
    }
  };

  return {
    getStripe,
    createCheckoutSession,
    redirectToCheckout,
    redirectToCustomerPortal,
  };
};

