<template>
  <VueBitsSilk
    :speed="3"
    :scale="1"
    color="#0046ff"
    :noise-intensity="0.5"
    :rotation="0"
    class="relative border-2 border-base-content flex flex-row gap-x-10 bg-primary rounded-3xl p-6 md:p-8 overflow-hidden !h-full w-full xl:!w-1/2"
  >
    <section class="flex flex-col gap-20 w-full relative z-10 h-full">
      <header
        class="flex flex-col gap-4"
        :class="{
          'justify-between h-full': hasFlipbooks,
        }"
      >
        <h1
          class="text-primary-content text-[32px] leading-8 md:text-[40px] md:leading-10 font-bold font-poppins"
        >
          Turn Your Files Into <br />
          Interactive Flipbooks
        </h1>
        <p class="text-primary-content text-base leading-4 font-poppins">
          Upload your PDF and watch it transform into an engaging digital
          experience in seconds.
        </p>
      </header>

      <button
        v-if="!hasFlipbooks"
        type="button"
        class="w-fit flex gap-4 py-2 px-3 md:px-4 hover:bg-base-200 pr-3 text-center border border-base-content justify-center items-center bg-primary-content rounded-full transition-all duration-300 text-base-content hover:cursor-pointer hover:border hover:border-base-content hover:text-primary font-poppins font-bold text-sm md:text-base leading-4 disabled:opacity-50 disabled:pointer-events-none"
        role="menuitem"
        @click="navigateToNewFlipbook"
      >
        Create Now
        <span class="bg-primary rounded-full p-1 md:p-2"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path stroke-dasharray="20" stroke-dashoffset="20" d="M3 12h17.5">
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
                d="M21 12l-7 7M21 12l-7 -7"
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
        </span>
      </button>
    </section>
  </VueBitsSilk>
</template>

<script setup lang="ts">
defineProps<{
  hasFlipbooks: boolean;
}>();

const navigateToNewFlipbook = () => {
  return navigateTo("/new-flipbook");
};
</script>
