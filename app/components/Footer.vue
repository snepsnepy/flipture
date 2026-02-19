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
        <footer
          class="flex flex-col gap-10 md:gap-20 lg:gap-30 items-start py-10 md:py-16 lg:py-20"
        >
          <!-- CTA Message -->
          <section>
            <p
              class="font-poppins text-primary-content/80 text-sm md:text-base leading-6"
            >
              Get in touch
            </p>
            <h4
              ref="titleRef"
              class="font-poppins text-primary-content text-2xl md:text-3xl lg:text-4xl leading-tight md:leading-12 -tracking-[0.5px] md:-tracking-[1px] overflow-hidden"
            >
              <motion.span
                v-for="(word, index) in titleWordsLine1"
                :key="index"
                :initial="{ opacity: 0, y: 20 }"
                :animate="
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                "
                :transition="{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }"
                class="inline-block mr-2"
              >
                {{ word }}
              </motion.span>
              <br class="hidden md:block" />
              <span class="text-primary-content/85">
                <motion.span
                  v-for="(word, index) in titleWordsLine2"
                  :key="'line2-' + index"
                  :initial="{ opacity: 0, y: 20 }"
                  :animate="
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  "
                  :transition="{
                    duration: 0.5,
                    delay: (titleWordsLine1.length + index) * 0.1,
                    ease: 'easeOut',
                  }"
                  class="inline-block mr-2"
                >
                  {{ word }}
                </motion.span>
                <br class="hidden md:block" />
                <motion.span
                  v-for="(word, index) in titleWordsLine3"
                  :key="'line3-' + index"
                  :initial="{ opacity: 0, y: 20 }"
                  :animate="
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  "
                  :transition="{
                    duration: 0.5,
                    delay:
                      (titleWordsLine1.length +
                        titleWordsLine2.length +
                        index) *
                      0.1,
                    ease: 'easeOut',
                  }"
                  class="inline-block mr-2"
                >
                  {{ word }}
                </motion.span>
              </span>
            </h4>
          </section>

          <!-- Contact Us At -->
          <section
            class="flex flex-col md:flex-row justify-between w-full items-start md:items-end gap-6 md:gap-4"
          >
            <div>
              <p
                class="font-poppins text-primary-content/80 text-sm md:text-base leading-6"
              >
                Contact Flipture at:
              </p>
              <a
                href="mailto:contact@flipture.io"
                class="font-poppins text-primary-content text-lg md:text-xl leading-[30px] font-medium underline"
                >contact@flipture.io</a
              >
            </div>

            <section
              class="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto"
            >
              <UnderlineLink
                @click="navigateToPage('pricing')"
                class="font-poppins text-primary-content text-base md:text-xl leading-[30px] font-medium"
                >Pricing</UnderlineLink
              >
              <UnderlineLink
                @click="navigateToPage('faqs')"
                class="font-poppins text-primary-content text-base md:text-xl leading-[30px] font-medium"
                >FAQs</UnderlineLink
              >
              <UnderlineLink
                @click="navigateToPage('terms')"
                class="font-poppins text-primary-content text-base md:text-xl leading-[30px] font-medium"
                >Terms of Service</UnderlineLink
              >
              <UnderlineLink
                @click="navigateToPage('privacy-policy')"
                class="font-poppins text-primary-content text-base md:text-xl leading-[30px] font-medium"
                >Privacy Policy</UnderlineLink
              >
            </section>
          </section>

          <section class="w-full flex flex-col gap-6">
            <!-- Flipture Image -->
            <div class="w-full flex justify-center items-center">
              <img
                src="@/assets/img/flipture_light.svg"
                alt="Flipture"
                class="w-2/3"
              />
            </div>

            <!-- Copyright and Social Media Links -->
            <section
              class="flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-0"
            >
              <span
                class="font-poppins text-primary-content/80 text-sm md:text-base leading-6 md:leading-10"
                >© 2025 Flipture. All rights reserved.</span
              >

              <div class="flex flex-row gap-4">
                <a
                  href="https://ro.linkedin.com/in/savulescumihnea"
                  target="_blank"
                  class="font-poppins text-primary-content/80 text-sm md:text-base leading-6 md:leading-10 hover:text-primary-content"
                  >LinkedIn</a
                >
                <a
                  href="https://ro.linkedin.com/in/savulescumihnea"
                  target="_blank"
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

<script lang="ts" setup>
import { motion } from "motion-v";
import { useElementVisibility } from "@vueuse/core";

// Split the title into words for animation (3 lines)
const titleWordsLine1 = ref([
  "Interested",
  "in",
  "creating",
  "stunning",
  "flipbooks,",
]);
const titleWordsLine2 = ref(["upgrading", "your", "content", "presentation,"]);
const titleWordsLine3 = ref(["or", "simply", "learning", "more?"]);

const titleRef = useTemplateRef("titleRef");

// Track if the title is visible in viewport
const elementIsVisible = useElementVisibility(titleRef);

// Track if animation has already been triggered (play only once)
const hasAnimated = ref(false);

// Compute animation state - only trigger once
const isInView = computed(() => {
  if (elementIsVisible.value && !hasAnimated.value) {
    hasAnimated.value = true;
    return true;
  }
  return hasAnimated.value;
});

const navigateToPage = (route: string) => {
  return navigateTo({ name: route });
};
</script>
