<template>
  <section
    class="container mx-auto"
    aria-labelledby="live-preview-heading"
    role="banner"
  >
    <div class="flex flex-col gap-y-6 md:gap-y-10 py-10">
      <div class="flex flex-col md:flex-row w-full gap-4 md:gap-0">
        <p class="whitespace-nowrap font-poppins font-medium text-base-content/60 text-sm md:text-base">(See it in action)</p>

        <header class="flex flex-col gap-y-4 md:gap-y-6 items-start md:items-end justify-start md:justify-end w-full">
          <h2
            class="font-poppins font-medium text-3xl md:text-5xl lg:text-6xl md:leading-tight lg:leading-16 text-base-content max-w-full md:max-w-[750px] text-left md:text-right"
          >
            See exactly what your readers will experience
          </h2>
          <p
            class="text-base-content text-sm md:text-base font-poppins max-w-full md:max-w-[650px] text-left md:text-right"
          >
            This is a live example of a 3D flipbook created with just one PDF
            upload. Flip through the pages, interact with the layout, and
            imagine your own content presented this beautifully —
            <b class="text-primary font-medium">
              instantly shareable, fully responsive, and ad-free.</b
            >
          </p>
        </header>
      </div>
      

      <div class="bg-base-content/50 h-[500px] md:h-[800px] rounded-3xl">
        <iframe
          class="rounded-3xl"
          src="https://flipture-view.netlify.app/?id=c01cea85-f49c-456a-ada2-30111e867ff0&preview=true"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
