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
      <div class="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        <footer class="flex flex-col gap-10 md:gap-20 lg:gap-30 items-start py-10 md:py-16 lg:py-20">
          <!-- CTA Message -->
          <section>
            <p class="font-poppins text-primary-content/80 text-sm md:text-base leading-6">Get in touch</p>
            <h4 class="font-poppins text-primary-content text-2xl md:text-3xl lg:text-4xl leading-tight md:leading-10 -tracking-[0.5px] md:-tracking-[1px]">Interested in creating stunning flipbooks, <br class="hidden md:block"/><span class="text-primary-content/85">upgrading your content presentation, <br class="hidden md:block"/>or simply learning more?</span></h4>
          </section>

          <!-- Contact Us At -->
          <section class="flex flex-col md:flex-row justify-between w-full items-start md:items-end gap-6 md:gap-4">
            <div>
              <p class="font-poppins text-primary-content/80 text-sm md:text-base leading-6">Contact Flipture at:</p>
              <a href="mailto:contact@flipture.io" class="font-poppins text-primary-content text-lg md:text-xl leading-[30px] font-medium underline">contact@flipture.io</a>
            </div>

            <section class="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
              <a href="#" class="font-poppins text-primary-content text-base md:text-xl leading-[30px] font-medium hover:underline">Pricing</a>
              <a href="#" class="font-poppins text-primary-content text-base md:text-xl leading-[30px] font-medium hover:underline">FAQs</a>
              <a href="#" class="font-poppins text-primary-content text-base md:text-xl leading-[30px] font-medium hover:underline">Terms of Service</a>
              <a href="#" class="font-poppins text-primary-content text-base md:text-xl leading-[30px] font-medium hover:underline">Privacy Policy</a>
            </section>
          </section>

          <section class="w-full flex flex-col gap-6">
            <!-- Flipture Image -->
             <div class="w-full flex justify-center items-center">
              <img src="@/assets/img/flipture_light.svg" alt="Flipture" class="w-2/3">
             </div>

            <!-- Copyright and Social Media Links -->
            <section class="flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-0">
              <span
                class="font-poppins text-primary-content/80 text-sm md:text-base leading-6 md:leading-10"
                >© 2025 Flipture. All rights reserved.</span
              >

              <div class="flex flex-row gap-4">
                <a href="https://ro.linkedin.com/in/savulescumihnea" target="_blank"
                  class="font-poppins text-primary-content/80 text-sm md:text-base leading-6 md:leading-10 hover:text-primary-content"
                  >LinkedIn</a
                >
                <a href="https://ro.linkedin.com/in/savulescumihnea" target="_blank"
                  class="font-poppins text-primary-content/80 text-sm md:text-base leading-6 md:leading-10 hover:text-primary-content"
                  >Instagram</a
                >
              </div>
            </section>
          </section>
        </footer>
      </div>
    </VueBitsSilk>
  </div>
</template>

<script lang="ts" setup></script>
