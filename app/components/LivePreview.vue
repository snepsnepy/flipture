<template>
  <section
    class="container mx-auto"
    aria-labelledby="live-preview-heading"
    role="banner"
  >
    <div class="flex flex-col gap-y-10">
      <div class="flex flex-col gap-y-8">
        <header class="flex flex-col gap-y-6 items-center text-center">
          <h2
            class="font-poppins font-bold text-3xl md:text-5xl text-base-content"
          >
            See exactly what your readers <br />will experience
          </h2>
          <p
            class="text-base-content text-sm md:text-base text-center font-poppins max-w-[650px] font-medium"
          >
            This is a live example of a 3D flipbook created with just one PDF
            upload. Flip through the pages, interact with the layout, and
            imagine your own content presented this beautifully —
            <b class="text-primary">
              instantly shareable, fully responsive, and ad-free.</b
            >
          </p>
        </header>

        <div class="bg-base-content/50 h-[500px] md:h-[800px] rounded-3xl">
          <iframe
            class="rounded-3xl"
            src="https://flipture-view.netlify.app/?id=c01cea85-f49c-456a-ada2-30111e867ff0"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>

      <Features />
    </div>
  </section>
</template>

<script setup lang="ts"></script>
