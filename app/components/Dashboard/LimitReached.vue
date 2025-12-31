<template>
  <section
    class="flex flex-row gap-2 items-start md:items-center border-2 border-error bg-error p-4 py-4 rounded-2xl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 32 32"
      class="shrink-0"
    >
      <path
        fill="#ffffff"
        d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
      />
    </svg>
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between flex-1 gap-4"
    >
      <p
        class="text-xs md:text-base font-medium font-poppins leading-4 text-primary-content"
      >
        You've reached the maximum of {{ currentLimits.maxFlipbooks }} flipbooks
        on your {{ currentLimits.displayName }} plan. Upgrade to create more and
        unlock premium features!
      </p>
      <NuxtLink
        to="/pricing"
        class="btn btn-sm md:btn-md w-full md:w-fit bg-primary-content text-base-content border-none hover:bg-base-200 rounded-full whitespace-nowrap shrink-0"
      >
        <span class="font-poppins">Upgrade Now</span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  currentLimits: Record<string, any>;
}>();
</script>
