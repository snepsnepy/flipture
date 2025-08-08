<template>
  <section class="bg-base-content">
    <div class="container mx-auto py-32 flex flex-col gap-y-20">
      <!-- Header -->
      <header class="flex flex-col gap-y-6 items-center text-center">
        <h2
          class="font-poppins font-bold text-3xl md:text-5xl text-primary-content"
        >
          Choose the perfect plan <br />for your needs
        </h2>
        <p
          class="text-primary-content text-sm md:text-base text-center font-poppins max-w-[600px] font-medium"
        >
          Transform your PDFs into stunning 3D flipbooks with our flexible
          pricing plans. Start free and scale as you grow —
          <b class="text-primary"> no hidden fees, cancel anytime.</b>
        </p>
      </header>

      <!-- Content -->
      <section class="flex flex-col lg:flex-row gap-10 gap-y-5">
        <!-- Monthly -->
        <div class="w-full relative overflow-hidden">
          <VueBitsSilk
            :speed="3"
            :scale="1"
            color="#0046ff"
            :noise-intensity="0.5"
            :rotation="0"
            class="relative rounded-3xl p-8 md:p-14 overflow-hidden"
          >
            <!-- Container -->
            <section class="flex flex-col gap-y-8 md:gap-y-10">
              <!-- Badges -->
              <div
                class="flex flex-col gap-2 items-left md:flex-row md:items-center justify-between z-10 relative"
              >
                <span
                  class="w-fit font-poppins font-medium text-base tracking-[8%] leading-[130%] text-primary-content py-1.5 px-5 border border-primary-content rounded-full hover:cursor-default"
                  >STANDARD</span
                >
                <span
                  class="w-fit flex flex-row items-center gap-1 font-poppins font-medium text-base tracking-[8%] leading-[130%] text-base-content py-1.5 px-5 bg-secondary rounded-full hover:cursor-default"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      d="M12 19.875q-.425 0-.825-.187t-.7-.538L2.825 10q-.225-.275-.337-.6t-.113-.675q0-.225.038-.462t.162-.438L4.45 4.1q.275-.5.738-.8T6.225 3h11.55q.575 0 1.038.3t.737.8l1.875 3.725q.125.2.163.437t.037.463q0 .35-.112.675t-.338.6l-7.65 9.15q-.3.35-.7.538t-.825.187M9.625 8h4.75l-1.5-3h-1.75zM11 16.675V10H5.45zm2 0L18.55 10H13zM16.6 8h2.65l-1.5-3H15.1zM4.75 8H7.4l1.5-3H6.25z"
                    />
                  </svg>
                  Popular
                </span>
              </div>

              <!-- Content -->
              <section class="flex flex-col gap-4 md:gap-5 z-10 relative">
                <p
                  class="font-poppins font-medium text-base md:text-lg leading-[131%] text-primary-content"
                >
                  Flexible, pay‑as‑you‑go — perfect for getting started
                </p>
                <div class="flex flex-row gap-2 items-start">
                  <h4
                    class="font-poppins font-bold text-4xl md:text-6xl leading-[104%] text-secondary"
                  >
                    €5.99
                  </h4>
                  <span
                    class="text-primary-content/80 text-sm md:text-lg font-poppins"
                    >/Month</span
                  >
                </div>
                <button
                  type="button"
                  class="w-full py-3 px-6 md:px-10 bg-primary-content rounded-full text-base-content hover:cursor-pointer hover:bg-primary-content font-poppins font-bold text-sm md:text-lg hover:scale-105 transition-all duration-300"
                >
                  Get started
                </button>
              </section>
              <HorizontalDivider class="relative z-10" />

              <!-- Bullet Points -->
              <section class="flex flex-col gap-y-4 z-10 relative">
                <div
                  class="flex flex-row gap-2"
                  v-for="feature in standardPlan"
                  :key="feature"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      fill-rule="evenodd"
                      d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span
                    class="font-poppins text-sm md:text-base text-primary-content"
                    >{{ feature }}</span
                  >
                </div>
              </section>
            </section>
          </VueBitsSilk>
        </div>

        <!-- Yearly -->
        <div class="w-full relative overflow-hidden">
          <div
            class="relative bg-primary-content rounded-3xl p-8 md:p-14 overflow-hidden"
          >
            <!-- Container -->
            <section class="flex flex-col gap-y-8 md:gap-y-10">
              <!-- Badges -->
              <div
                class="flex flex-row items-center justify-between z-10 relative"
              >
                <span
                  class="font-poppins font-medium text-base tracking-[8%] leading-[130%] text-base-content py-1.5 px-5 border border-base-content rounded-full hover:cursor-default"
                  >PREMIUM</span
                >
              </div>

              <!-- Content -->
              <section class="flex flex-col gap-4 md:gap-5 z-10 relative">
                <p
                  class="font-poppins font-medium text-base md:text-lg leading-[131%] text-base-content"
                >
                  Best value if you publish regularly.
                </p>
                <div class="flex flex-row gap-2 items-start">
                  <h4
                    class="font-poppins font-bold text-4xl md:text-6xl leading-[104%] text-base-content"
                  >
                    €59.99
                  </h4>
                  <span
                    class="text-base-content/80 text-sm md:text-lg font-poppins"
                    >/Year</span
                  >
                </div>
                <button
                  type="button"
                  class="w-full py-3 px-6 md:px-10 bg-primary rounded-full text-primary-content hover:cursor-pointer font-poppins font-bold text-sm md:text-lg hover:scale-105 transition-all duration-300"
                >
                  Get started
                </button>
              </section>
              <HorizontalDivider class="relative z-10" />

              <!-- Bullet Points -->
              <section class="flex flex-col gap-y-4 z-10 relative">
                <div
                  class="flex flex-row gap-2"
                  v-for="feature in premiumPlan"
                  :key="feature"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      fill-rule="evenodd"
                      d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span
                    class="font-poppins text-sm md:text-base text-base-content"
                    >{{ feature }}</span
                  >
                </div>
              </section>
            </section>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const standardPlan = [
  "All features included",
  "No ads or hidden fees",
  "Cancel anytime",
  "Friendly email support",
];

const premiumPlan = [
  "All features included",
  "No ads or hidden fees",
  "Cancel anytime",
  "Friendly email support",
  "Save 2 months with annual billing",
  "One simple annual invoice",
];
</script>
