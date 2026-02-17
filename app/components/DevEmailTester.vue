<template>
  <div class="dev-email-tester bg-warning/10 border-2 border-warning rounded-lg p-4">
    <div class="flex items-center gap-2 mb-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-warning"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <h3 class="font-semibold text-warning">Development Email Tester</h3>
    </div>
    
    <p class="text-sm text-base-content/70 mb-3">
      Test email templates by sending them to your email address ({{ userEmail }})
    </p>
    
    <div class="flex flex-wrap gap-2">
      <button
        v-for="emailType in emailTypes"
        :key="emailType.value"
        @click="sendTestEmail(emailType.value)"
        :disabled="isSending"
        class="btn btn-sm btn-outline btn-warning hover:btn-warning transition-all"
        :class="{ 'loading': isSending && currentEmailType === emailType.value }"
      >
        <svg
          v-if="!isSending || currentEmailType !== emailType.value"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        {{ emailType.label }}
      </button>
    </div>
    
    <div
      v-if="message"
      class="mt-3 p-2 rounded text-sm"
      :class="messageType === 'success' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const userStore = useUserStore();

const userEmail = computed(() => userStore.profile?.email || user.value?.email || 'N/A');

const emailTypes = [
  { value: 'welcome', label: 'Welcome' },
  { value: 'subscriptionSuccess', label: 'Subscription Success' },
  { value: 'subscriptionCancelled', label: 'Subscription Cancelled' },
  { value: 'paymentFailed', label: 'Payment Failed' },
  { value: 'renewalReminder', label: 'Renewal Reminder' },
];

const isSending = ref(false);
const currentEmailType = ref<string | null>(null);
const message = ref('');
const messageType = ref<'success' | 'error'>('success');

const sendTestEmail = async (emailType: string) => {
  if (!user.value?.sub) {
    message.value = 'User not found';
    messageType.value = 'error';
    return;
  }

  isSending.value = true;
  currentEmailType.value = emailType;
  message.value = '';

  try {
    const { data, error } = await $fetch('/api/dev/test-email', {
      method: 'POST',
      body: {
        userId: user.value.sub,
        emailType,
      },
    });

    if (error) {
      throw error;
    }

    message.value = data?.message || 'Test email sent successfully!';
    messageType.value = 'success';
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      message.value = '';
    }, 5000);
  } catch (error: any) {
    console.error('Error sending test email:', error);
    message.value = error?.data?.message || error?.message || 'Failed to send test email';
    messageType.value = 'error';
    
    // Clear error message after 8 seconds
    setTimeout(() => {
      message.value = '';
    }, 8000);
  } finally {
    isSending.value = false;
    currentEmailType.value = null;
  }
};
</script>

<style scoped>
.dev-email-tester {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
