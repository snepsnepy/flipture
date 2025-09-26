<template>
  <section>
    <div class="container mx-auto flex flex-col gap-y-8">
      <!-- Header -->
      <header class="flex flex-col gap-y-6 items-center text-center">
        <h2
          class="font-poppins font-bold text-3xl md:text-5xl text-base-content"
        >
          Frequently Asked Questions
        </h2>
        <p
          class="text-base-content text-sm md:text-base text-center font-poppins max-w-[600px] font-medium"
        >
          Still unsure? Here are quick answers to common questions about
          uploading, sharing, subscriptions, and more — so you know exactly what
          to expect.
        </p>
      </header>

      <!-- Content -->
      <section class="flex flex-col gap-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          :data-hovered="hoveredIndex === index"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
          class="collapse border-2 rounded-3xl px-4 py-5 md:py-8 transition-all duration-300 cursor-pointer"
          :class="[
            hoveredIndex === index
              ? 'bg-base-content text-primary-content border-primary-content'
              : 'bg-primary-content text-base-content border',
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
              class="font-semibold font-poppins text-xl leading-5 md:text-4xl md:leading-[104%]"
            >
              {{ faq.question }}
            </p>
            <div
              class="w-8 h-8 min-w-8 rounded-full transition-all duration-300 flex items-center justify-center"
              :class="
                hoveredIndex === index
                  ? 'bg-primary-content'
                  : 'bg-base-content'
              "
            >
              <svg
                :class="[
                  'w-4 h-4 transition-transform duration-300',
                  activeIndex === index ? 'rotate-180' : 'rotate-0',
                  hoveredIndex === index
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
              </svg>
            </div>
          </div>
          <div
            class="collapse-content font-poppins text-base leading-4 md:text-lg font-medium md:leading-5"
          >
            {{ faq.answer }}
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const hoveredIndex = ref<number | null>(null);
const activeIndex = ref<number | null>(null);

const toggleAccordion = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const faqs = [
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you are free to cancel your subscription at any time directly from your account dashboard. Once canceled, your plan will remain active until the end of your current billing cycle, and you won’t be charged again. There are no cancellation fees or hidden terms — we believe in full transparency and flexibility.",
  },
  {
    question: "Are my flipbooks private?",
    answer:
      "Yes, your flipbooks are private by default. Each one is hosted securely and can only be accessed through a unique, unlisted link. This means only people you share the link with will be able to view the content. We never display your flipbooks publicly or index them in search engines unless you explicitly choose to share them in that way.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "We currently support PDF uploads up to 50MB in size, which is more than sufficient for most magazines, brochures, and catalogs. If your file exceeds this limit, we recommend compressing your PDF using free tools before uploading. Larger file support is planned in future updates.",
  },
  {
    question: "Can I embed flipbooks on my site?",
    answer:
      "Yes. Every flipbook you create comes with a ready-to-use embed code. You can place it on any website, landing page, or blog, and the flipbook will display seamlessly with full interactivity. It's a great way to showcase content professionally without redirecting your visitors elsewhere.",
  },
];
</script>
