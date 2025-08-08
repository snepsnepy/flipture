<template>
  <div class="container mx-auto py-0">
    <section
      class="relative flex flex-row gap-x-10 bg-primary rounded-3xl py-10 md:py-40 px-5 md:px-14 overflow-hidden"
      aria-labelledby="hero-heading"
      role="banner"
    >
      <!-- Large background image positioned behind the blue container -->
      <img
        src="@/assets/img/hero-img.png"
        alt="Decorative hero background illustration"
        class="absolute right-0 bottom-0 md:top-0 translate-x-1/4 translate-y-[60%] md:translate-y-[10%] lg:translate-y-0 object-cover z-0 w-[120%] md:w-full"
        aria-hidden="true"
      />

      <!-- Content container with higher z-index to appear above the image -->
      <div class="relative z-10 flex flex-col gap-y-14 md:gap-y-8 md:w-2/3">
        <header class="space-y-4 md:space-y-6">
          <h1
            id="hero-heading"
            class="font-inter text-primary-content text-4xl md:text-[80px] font-bold leading-[102%]"
          >
            A better way <br />
            to present, share <br />
            and impress.
          </h1>
          <p
            class="font-poppins text-primary-content font-medium text-sm md:text-base max-w-[600px]"
          >
            Upload your PDF and instantly transform it into a sleek, interactive
            3D flipbook — ready to share with a simple link. No technical
            skills, no watermarks, no surprises. Just clean design, smooth
            performance, and a flat
            <strong class="text-secondary text-lg">€6/month</strong>.
          </p>
        </header>
        <button
          class="flex flex-row items-center w-fit gap-x-1 py-2 md:py-4 px-6 md:px-10 border border-primary-content rounded-full text-primary-content hover:cursor-pointer hover:bg-primary-content hover:text-primary font-inter font-bold text-sm md:text-lg tracking-tight"
          aria-label="See the flipbook in action"
        >
          <span>See it in action</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="arrow-icon"
            aria-hidden="true"
            role="img"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path
                stroke-dasharray="20"
                stroke-dashoffset="20"
                d="M12 3l0 17.5"
              >
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
                d="M12 21l7 -7M12 21l-7 -7"
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
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
button:hover .arrow-icon g {
  stroke: var(--color-primary) !important;
}
</style>
