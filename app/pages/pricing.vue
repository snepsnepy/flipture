<template>
  <div class="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p class="text-lg text-base-content/70">
          Select the perfect plan for your flipbook needs
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <!-- Standard Plan -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl justify-center">Standard</h2>
            <div class="text-center my-6">
              <div class="text-5xl font-bold">$9</div>
              <div class="text-base-content/70 mt-2">per month</div>
            </div>
            
            <ul class="space-y-3 mb-6">
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Up to 10 flipbooks</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Basic analytics</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Standard support</span>
              </li>
            </ul>

            <div class="card-actions justify-center">
              <button
                @click="handleSubscribe('standard')"
                :disabled="loading || (userData?.subscription_plan === 'standard')"
                class="btn btn-primary btn-block"
              >
                <span v-if="loading && selectedPlan === 'standard'" class="loading loading-spinner"></span>
                <span v-else-if="userData?.subscription_plan === 'standard'">Current Plan</span>
                <span v-else>Get Started</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Premium Plan -->
        <div class="card bg-primary text-primary-content shadow-xl border-4 border-primary">
          <div class="badge badge-secondary absolute -top-3 left-1/2 -translate-x-1/2">
            POPULAR
          </div>
          <div class="card-body">
            <h2 class="card-title text-2xl justify-center">Premium</h2>
            <div class="text-center my-6">
              <div class="text-5xl font-bold">$19</div>
              <div class="text-primary-content/70 mt-2">per month</div>
            </div>
            
            <ul class="space-y-3 mb-6">
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Unlimited flipbooks</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Advanced analytics</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Priority support</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Custom branding</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Export options</span>
              </li>
            </ul>

            <div class="card-actions justify-center">
              <button
                @click="handleSubscribe('premium')"
                :disabled="loading || (userData?.subscription_plan === 'premium')"
                class="btn btn-secondary btn-block"
              >
                <span v-if="loading && selectedPlan === 'premium'" class="loading loading-spinner"></span>
                <span v-else-if="userData?.subscription_plan === 'premium'">Current Plan</span>
                <span v-else>Get Started</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Manage Subscription -->
      <div v-if="userData?.stripe_customer_id" class="text-center mt-12">
        <p class="mb-4 text-base-content/70">
          Already subscribed? Manage your subscription
        </p>
        <button
          @click="handleManageSubscription"
          :disabled="portalLoading"
          class="btn btn-outline"
        >
          <span v-if="portalLoading" class="loading loading-spinner"></span>
          <span v-else>Manage Subscription</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'base',
  middleware: 'auth',
});

const user = useSupabaseUser();
const { profile: userData } = useUserProfile();
const { redirectToCheckout, redirectToCustomerPortal } = useStripe();
const config = useRuntimeConfig();
const { showToast } = useToast();

const loading = ref(false);
const portalLoading = ref(false);
const selectedPlan = ref<'standard' | 'premium' | null>(null);

const handleSubscribe = async (plan: 'standard' | 'premium') => {
  console.log('handleSubscribe called', { plan, user: user.value });
  
  if (!user.value) {
    console.error('No user found');
    showToast('Please log in to subscribe', 'error');
    return;
  }

  // Get user ID from either id or sub field
  const userId = (user.value as any).id || (user.value as any).sub;
  const userEmail = user.value.email;

  // Validate required fields
  if (!userId) {
    console.error('No user ID found');
    showToast('User ID not found. Please try logging in again.', 'error');
    return;
  }

  if (!userEmail) {
    console.error('No user email found');
    showToast('User email not found. Please try logging in again.', 'error');
    return;
  }

  loading.value = true;
  selectedPlan.value = plan;

  try {
    const priceId = plan === 'standard' 
      ? config.public.stripeStandardPriceId 
      : config.public.stripePremiumPriceId;

    console.log('Checkout details:', {
      priceId,
      userId,
      userEmail,
    });

    await redirectToCheckout(
      priceId,
      userId,
      userEmail
    );
  } catch (error: any) {
    console.error('Subscription error:', error);
    showToast(error.message || 'Failed to start subscription process', 'error');
    loading.value = false;
    selectedPlan.value = null;
  }
};

const handleManageSubscription = async () => {
  if (!userData.value?.stripe_customer_id) {
    showToast('No subscription found', 'error');
    return;
  }

  portalLoading.value = true;

  try {
    await redirectToCustomerPortal(userData.value.stripe_customer_id);
  } catch (error: any) {
    console.error('Portal error:', error);
    
    // Handle deleted customer error
    if (error.message?.includes('No such customer')) {
      showToast('Subscription not found. Please subscribe to a new plan.', 'error');
    } else {
      showToast('Failed to open subscription management', 'error');
    }
    
    portalLoading.value = false;
  }
};
</script>

