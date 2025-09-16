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
        <div class="flex flex-col gap-2 items-start">
          <h1
            class="font-poppins text-center font-bold text-xl leading-5 tracking-tighter text-primary-content"
          >
            Flipture.
          </h1>
          <span
            class="font-poppins text-center font-semibold text-primary-content text-sm leading-4"
            >© 2025 Flipture. All rights reserved.</span
          >
        </div>
      </div>
    </VueBitsSilk>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
