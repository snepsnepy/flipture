<template>
  <section
    class="relative flex flex-row gap-x-10 bg-[#0046FF] rounded-[24px] py-10 md:py-40 px-5 md:px-14 overflow-hidden"
  >
    <!-- Large background image positioned behind the blue container -->
    <img
      src="@/assets/img/hero-img.png"
      alt="HeroImg"
      class="absolute right-0 bottom-0 md:top-0 translate-x-1/4 translate-y-[60%] md:translate-y-[10%] lg:translate-y-0 object-cover z-0 w-[120%] md:w-full"
    />

    <!-- Content container with higher z-index to appear above the image -->
    <div class="relative z-10 flex flex-col gap-y-6 md:gap-y-8 md:w-2/3">
      <div class="space-y-4 md:space-y-6">
        <h1
          class="font-inter text-white text-4xl md:text-[80px] font-bold leading-[102%]"
        >
          A better way to present, share, <br />
          and impress.
        </h1>
        <p class="font-poppins text-white font-medium text-sm md:text-base">
          Upload your PDF and instantly transform it into a sleek, interactive
          3D flipbook — ready to share with a simple link. No technical skills,
          no watermarks, no surprises. Just clean design, smooth performance,
          and a flat €6/month.
        </p>
      </div>
      <button
        class="w-fit py-2 md:py-4 px-6 md:px-10 bg-white rounded-full text-[#0046FF] font-inter font-bold text-sm md:text-lg tracking-tight"
      >
        See it in action
      </button>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
