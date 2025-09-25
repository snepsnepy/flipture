<template>
  <VueBitsSilk
    :speed="3"
    :scale="1"
    color="#0046ff"
    :noise-intensity="0.5"
    :rotation="0"
    class="relative flex flex-row gap-x-10 bg-primary rounded-3xl p-8 overflow-hidden !h-full w-full xl:w-2/3"
  >
    <section class="flex flex-col gap-20 w-full relative z-10">
      <header class="flex flex-col gap-4">
        <h1
          class="text-primary-content text-[40px] leading-10 font-bold font-poppins"
        >
          Turn Your Files Into <br />
          Interactive Flipbooks
        </h1>
        <p class="text-primary-content text-sm leading-[14px] font-poppins">
          Upload your PDF and watch it transform into an engaging digital
          experience in seconds.
        </p>
      </header>

      <button
        type="button"
        class="w-fit flex gap-2 py-2 px-4 pr-3 text-center border border-base-content justify-center items-center bg-primary-content rounded-full transition-all duration-300 text-base-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-primary font-poppins font-bold text-base leading-4 disabled:opacity-50 disabled:pointer-events-none"
        role="menuitem"
      >
        Create Now
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0046FF"
              fill-rule="evenodd"
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m.47-13.53a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H8a.75.75 0 0 1 0-1.5h6.19l-1.72-1.72a.75.75 0 0 1 0-1.06"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
    </section>
  </VueBitsSilk>
</template>

<script setup lang="ts"></script>
