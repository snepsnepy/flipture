<template>
  <div class="w-full relative overflow-hidden">
    <VueBitsSilk
      :speed="3"
      :scale="1"
      color="#0046ff"
      :noise-intensity="0.5"
      :rotation="0"
      class="relative overflow-hidden"
    >
      <div class="container mx-auto relative z-10">
        <div
          class="flex flex-col gap-y-6 lg:flex-row justify-between items-center lg:items-end"
        >
          <h1
            class="font-poppins text-center font-bold text-5xl lg:text-9xl tracking-tighter text-primary-content"
          >
            Flipture.
          </h1>
          <span
            class="font-poppins text-center font-semibold text-primary-content text-base leading-4 lg:text-xl lg:leading-5"
            >© 2025 Flipture. All rights reserved.</span
          >
        </div>
      </div>
    </VueBitsSilk>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
