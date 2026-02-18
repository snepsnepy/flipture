<template>
  <section
    class="flex flex-row gap-2 items-start md:items-center border-2 border-primary bg-base-200 p-2 rounded-2xl"
  >
    <Icon
      name="fluent:info-24-regular"
      :size="24"
      style="color: var(--color-primary)"
    />
    <div class="flex flex-row items-center justify-between flex-1 gap-4">
      <p class="text-xs leading-4 md:text-sm font-poppins">
        You are currently on a <strong class="font-semibold">Free Plan</strong>
        and have limited access to features. Upgrade to unlock all features and
        benefits.
        <UnderlineLink
          @click="navigateToPricing"
          text-class="text-primary font-medium font-poppins"
        >
          See Pricing
        </UnderlineLink>
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
const navigateToPricing = () => {
  return navigateTo({ name: "pricing" });
};
</script>
