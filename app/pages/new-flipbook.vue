<template>
  <section
    class="container mx-auto py-0 flex flex-col gap-6 md:gap-y-8 items-start"
  >
    <button
      class="btn border-none bg-transparent shadow-none flex flex-row items-center gap-2 hover:text-primary"
      @click="navigateToDashboard"
    >
      <div class="bg-primary rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path stroke-dasharray="20" stroke-dashoffset="20" d="M21 12h-17.5">
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.2s"
                values="20;0"
              />
            </path>
            <path
              stroke-dasharray="12"
              stroke-dashoffset="12"
              d="M3 12l7 7M3 12l7 -7"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.2s"
                dur="0.2s"
                values="12;0"
              />
            </path>
          </g>
        </svg>
      </div>
      <span class="font-poppins text-base leading-4 font-semibold"
        >Back to Dashboard</span
      >
    </button>

    <section
      class="relative !flex !flex-col gap-y-4 md:gap-y-8 rounded-3xl overflow-hidden w-full"
    >
      <!-- Header Info -->
      <header
        class="flex flex-col items-center justify-center w-full text-center bg-secondary border-2 border-base-content p-6 md:p-8 rounded-3xl shadow-md z-10 relative"
      >
        <h1
          class="font-poppins font-bold text-4xl md:text-5xl text-base-content mb-4"
        >
          Create New Flipbook
        </h1>
        <p
          class="font-poppins text-base leading-4 md:text-xl text-base-content/50 max-w-2xl mx-auto"
        >
          Please fill in the required fields below and upload your PDF file to
          create your new flipbook.
        </p>
      </header>

      <!-- Form -->
      <section
        class="bg-[url('@/assets/img/magazines.jpg')] bg-cover bg-center bg-no-repeat w-full rounded-3xl border-2 border-base-content z-10 relative shadow-md p-6 md:p-8"
      >
        <div class="absolute inset-0 bg-base-content/70 rounded-3xl"></div>
        <DashboardFlipbookForm class="relative z-10" />
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "base",
  middleware: "auth",
});

const navigateToDashboard = () => {
  return navigateTo("/dashboard");
};
</script>
