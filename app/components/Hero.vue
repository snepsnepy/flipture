<template>
  <section
    class="relative flex flex-row bg-[#500073] items-end rounded-3xl py-[136px] hero-shape"
  >
    <div class="pl-10 flex flex-col gap-y-6 w-full">
      <span class="font-inter text-white text-2xl italic"
        >Aliquam faucibus.</span
      >
      <h1 class="text-white leading-[112%] text-[120px] font-anton z-10">
        Bring Your Ideas <br />
        To Life With 3D!
      </h1>
      <p class="text-white text-xl max-w-[591px]">
        Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo
        eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet,
        felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.
      </p>
    </div>

    <img
      src="@/assets/img/reading-hero.png"
      alt="Hero Image"
      class="w-1/2 h-fit absolute right-0 bottom-0"
    />
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.hero-shape {
  clip-path: path(
    "M 20,80 L 900,80 A 56,56 0,0,0  940,60 L 960,20 A 56,56 0,0,1 1000,0 L 1320,0 L 1360,20 L 1360,885 L 1320,905 L 20,905 L 0,885 L 0,100 A 24,24 0,0,1 20,80 Z"
  );
}
</style>
