<template>
  <VueBitsSilk
    :speed="3"
    :scale="1"
    color="#0046ff"
    :noise-intensity="0.5"
    :rotation="0"
    class="relative border-2 border-base-content flex flex-row gap-x-10 bg-primary rounded-3xl p-4 md:p-8 overflow-hidden !h-full min-h-full w-full"
  >
    <section class="flex flex-col gap-20 w-full relative z-10 h-full">
      <header class="flex flex-col justify-between h-full gap-4">
        <h1
          class="text-primary-content text-xl leading-5 md:text-[40px] md:leading-10 font-bold font-poppins"
        >
          Turn Your Files Into <br />
          Interactive Flipbooks
        </h1>
        <p
          class="text-primary-content text-sm leading-3 md:text-base md:leading-4 font-poppins"
        >
          Upload your PDF and watch it transform into an engaging digital
          experience in seconds.
        </p>
      </header>
    </section>
  </VueBitsSilk>
</template>

<script setup lang="ts"></script>
