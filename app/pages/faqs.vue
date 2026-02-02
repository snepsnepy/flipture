<template>
  <section class="container mx-auto flex flex-col gap-y-6 md:gap-y-10">
    <div class="flex flex-row items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#0046ff"
          fill-rule="evenodd"
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-.47-13.53a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72H16a.75.75 0 0 0 0-1.5H9.81l1.72-1.72a.75.75 0 0 0 0-1.06"
          clip-rule="evenodd"
        />
      </svg>
      <button
        @click="navigateToIndex"
        class="text-base-content text-sm md:text-base leading-4 font-poppins font-medium hover:cursor-pointer hover:text-primary"
      >
        Back
      </button>
    </div>

    <h2
      ref="titleRef"
      class="font-poppins font-medium text-3xl md:text-5xl lg:text-6xl md:leading-tight lg:leading-16 text-base-content overflow-hidden"
    >
      <motion.span
        v-for="(word, index) in titleWords"
        :key="index"
        :initial="{ opacity: 0, y: 20 }"
        :animate="isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }"
        :transition="{ 
          duration: 0.5, 
          delay: index * 0.1,
          ease: 'easeOut'
        }"
        class="inline-block mr-2"
      >
        {{ word }}
      </motion.span>
    </h2>
    
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
          backgroundColor: hoveredIndex === index || activeIndex === index 
            ? 'var(--color-base-content)' 
            : 'var(--color-primary-content)',
          borderColor: hoveredIndex === index || activeIndex === index 
            ? 'var(--color-base-content)' 
            : 'var(--color-base-content)',
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
          class="collapse-title p-2 lg:p-4 flex flex-row gap-2 justify-between items-center"
        >
          <p
            class="font-medium font-poppins text-xl leading-5 md:text-4xl md:leading-[104%]"
          >
            {{ faq.question }}
          </p>
          <motion.div
            :animate="{ 
              scale: activeIndex === index ? 1.2 : 1,
            }"
            :transition="{ type: 'spring', stiffness: 300, damping: 25 }"
            class="w-8 h-8 min-w-8 rounded-full transition-all duration-300 flex items-center justify-center"
            :class="
              hoveredIndex === index || activeIndex === index
                ? 'bg-primary-content'
                : 'bg-base-content'
            "
          >
            <motion.svg
              :animate="{ 
                rotate: activeIndex === index ? 180 : 0,
                scale: activeIndex === index ? 1.2 : 1,
              }"
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
          </motion.div>
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
            y: { type: 'spring', stiffness: 300, damping: 30 }
          }"
          class="collapse-content p-2 lg:p-4 pt-4 lg:pt-0 font-poppins text-primary-content text-base leading-4 md:text-lg md:leading-5 overflow-hidden"
        >
          {{ faq.answer }}
        </motion.div>
      </motion.div>
    </section>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "base",
})

import { motion } from "motion-v";
import { useTemplateRef } from "vue";
import { useElementVisibility } from "@vueuse/core";

const titleRef = useTemplateRef('titleRef')
const elementIsVisible = useElementVisibility(titleRef)
const hasAnimated = ref(false)

const isInView = computed(() => {
  if (elementIsVisible.value && !hasAnimated.value) {
    hasAnimated.value = true
    return true
  }
  return hasAnimated.value
})

const titleWords = ref([
  "Frequently", "Asked", "Questions"
])

const hoveredIndex = ref<number | null>(null);
const activeIndex = ref<number | null>(null);
const faqsContainer = useTemplateRef("faqsContainer")

onClickOutside(faqsContainer, () => {
  if (activeIndex.value !== null) {
    activeIndex.value = null;
  }
});

const toggleAccordion = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const navigateToIndex = () => {
  return navigateTo({ name: "index" });
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
  {
    question: "What information is required to create a flipbook?",
    answer:
      "You’ll need a PDF and a title to create a flipbook. You can edit the title later, and company name/description are optional and editable from your dashboard.",
  },
  {
    question: "Can I customize the look of my flipbook?",
    answer:
      "Yes. Flipture includes design options such as cover choices and background styling. Some customization options are available only on Standard and Premium plans.",
  },
  {
    question: "How do I share a flipbook?",
    answer:
      "Each flipbook has a unique link that you can copy and share. Anyone with the link can view it, so treat the link like a private share link.",
  },
  {
    question: "Are my flipbooks public?",
    answer:
      "Flipbooks are not publicly listed inside Flipture. By default they’re accessible via their unique share link, which means people can view them only if you share the link.",
  },
  {
    question: "Do free plan flipbooks include a watermark?",
    answer:
      "Yes. The Free plan includes a Flipture watermark on new flipbooks. Standard and Premium remove the watermark.",
  },
  {
    question: "Do flipbooks expire on the Free plan?",
    answer:
      "To keep the Free plan sustainable, inactive flipbooks on the Free plan may be automatically removed after 30 days without visits. Standard and Premium do not include this inactivity cleanup.",
  },
  {
    question: "Do you provide analytics?",
    answer:
      "Analytics are available on Standard and Premium plans. You can track total views, unique visitors, and geographic breakdowns, plus see trends over time in the Analytics dashboard.",
  },
  {
    question: "How does billing work?",
    answer:
      "Payments are processed securely through Stripe. Standard is billed monthly and Premium is billed annually. Flipture does not store your card details.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel from the subscription portal in your account. Your plan stays active until the end of the current billing period, and you won’t be charged again unless you reactivate.",
  },
  {
    question: "Where can I find invoices and receipts?",
    answer:
      "Invoices and receipts are available in the Stripe customer portal (accessible from your account when you have an active subscription).",
  },
  {
    question: "What happens if a payment fails?",
    answer:
      "If a payment fails, Stripe will notify you and we’ll also send an email. If the subscription can’t be successfully renewed, your account will revert to the Free plan.",
  },
];
</script>