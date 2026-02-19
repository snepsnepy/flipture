<template>
  <section>
    <div class="container mx-auto flex flex-col gap-y-6 md:gap-y-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row w-full gap-4 md:gap-0">
        <p
          class="whitespace-nowrap font-poppins font-medium text-neutral text-sm md:text-base"
        >
          (Common questions)
        </p>

        <header
          class="flex flex-col gap-y-4 md:gap-y-6 items-start md:items-end justify-start md:justify-end w-full"
        >
          <h2
            ref="titleRef"
            class="font-poppins font-medium text-3xl md:text-5xl lg:text-6xl md:leading-tight lg:leading-16 text-base-content max-w-full md:max-w-[750px] text-left md:text-right overflow-hidden"
          >
            <motion.span
              v-for="(word, index) in titleWords"
              :key="index"
              :initial="{ opacity: 0, y: 20 }"
              :animate="isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }"
              :transition="{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }"
              class="inline-block mr-2"
            >
              {{ word }}
            </motion.span>
          </h2>
          <p
            class="text-base-content text-sm md:text-base font-poppins max-w-full md:max-w-[650px] text-left md:text-right"
          >
            Still unsure? Here are quick answers to common questions about
            uploading, sharing, subscriptions, and more — so you know exactly
            what to expect.
          </p>
        </header>
      </div>

      <!-- Content -->
      <section ref="faqsContainer" class="flex flex-col gap-4">
        <motion.div
          v-for="(faq, index) in faqs"
          :key="index"
          :data-hovered="hoveredIndex === index"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
          :animate="{
            scale: activeIndex === index ? 1.02 : 1,
            backgroundColor:
              hoveredIndex === index || activeIndex === index
                ? '#000000'
                : '#ffffff',
            borderColor: '#000000',
          }"
          :transition="{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            backgroundColor: { duration: 0.3 },
            borderColor: { duration: 0.3 },
          }"
          class="collapse border-2 rounded-3xl px-4 py-5 md:py-8 cursor-pointer"
          :class="[
            hoveredIndex === index || activeIndex === index
              ? 'text-primary-content'
              : 'text-base-content',
            activeIndex === index ? 'collapse-open' : 'collapse-close',
          ]"
          @click="toggleAccordion(index)"
        >
          <input
            type="checkbox"
            :checked="activeIndex === index"
            class="hidden"
          />
          <div
            class="collapse-title p-4 flex flex-row justify-between items-center"
          >
            <p
              class="font-medium font-poppins text-xl leading-5 md:text-4xl md:leading-[104%]"
            >
              {{ faq.question }}
            </p>
            <div
              class="w-8 h-8 min-w-8 rounded-full transition-all duration-300 flex items-center justify-center"
              :class="
                hoveredIndex === index || activeIndex === index
                  ? 'bg-primary-content'
                  : 'bg-base-content'
              "
            >
              <motion.svg
                :animate="{ rotate: activeIndex === index ? 180 : 0 }"
                :transition="{ type: 'spring', stiffness: 300, damping: 25 }"
                :class="[
                  'w-4 h-4',
                  hoveredIndex === index || activeIndex === index
                    ? 'text-base-content'
                    : 'text-primary-content',
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </div>
          </div>
          <motion.div
            v-if="activeIndex === index"
            :initial="{ opacity: 0, height: 0, y: -10 }"
            :animate="{ opacity: 1, height: 'auto', y: 0 }"
            :exit="{ opacity: 0, height: 0, y: -10 }"
            :transition="{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.3 },
              y: { type: 'spring', stiffness: 300, damping: 30 },
            }"
            class="collapse-content font-poppins text-primary-content text-base leading-4 md:text-lg md:leading-5 overflow-hidden"
          >
            {{ faq.answer }}
          </motion.div>
        </motion.div>
      </section>

      <!-- View All FAQs Button -->
      <div class="flex justify-center mt-4 md:mt-6">
        <motion.button
          type="button"
          @click="goToFaqsPage"
          :whileHover="{ scale: 1.05 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
          class="w-full md:w-auto shadow-lg py-3 px-6 md:px-10 rounded-full font-poppins font-medium text-sm md:text-lg min-h-[48px] md:min-h-[56px] text-base-content border-2 border-base-content hover:bg-base-300 hover:cursor-pointer"
        >
          View All FAQs
        </motion.button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { motion } from "motion-v";
import { onClickOutside, useElementVisibility } from "@vueuse/core";

// Split the title into words for animation
const titleWords = ref(["Frequently", "Asked", "Questions"]);

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

const hoveredIndex = ref<number | null>(null);
const activeIndex = ref<number | null>(null);
const faqsContainer = useTemplateRef("faqsContainer");

onClickOutside(faqsContainer, () => {
  if (activeIndex.value !== null) {
    activeIndex.value = null;
  }
});

const toggleAccordion = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const goToFaqsPage = () => {
  navigateTo({ name: "faqs" });
};

const faqs = [
  {
    question: "What is Flipture?",
    answer:
      "Flipture is a web app that turns your PDF into an interactive 3D flipbook you can manage from your dashboard and share with a simple link.",
  },
  {
    question: "What file types do you support?",
    answer:
      "Flipture currently supports PDF files only. If you upload a different file type, it will be rejected during validation.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "Yes — the maximum PDF size depends on your plan: Free (5MB), Standard (30MB), and Premium (50MB). If your file is larger, compress the PDF and try again.",
  },
  {
    question: "How many flipbooks can I create?",
    answer:
      "Plan limits apply: Free (up to 3 flipbooks), Standard (up to 100), Premium (up to 100). If you hit your limit, you can still manage existing flipbooks, but you’ll need to upgrade to create more.",
  },
];
</script>
