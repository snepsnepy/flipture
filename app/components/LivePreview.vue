<template>
  <section
    class="container mx-auto"
    aria-labelledby="live-preview-heading"
    role="banner"
  >
    <div class="flex flex-col gap-y-6 md:gap-y-10 py-10">
      <div class="flex flex-col md:flex-row w-full gap-4 md:gap-0">
        <p class="whitespace-nowrap font-poppins font-medium text-neutral text-sm md:text-base">(See it in action)</p>

        <header class="flex flex-col gap-y-4 md:gap-y-6 items-start md:items-end justify-start md:justify-end w-full">
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
                ease: 'easeOut'
              }"
              class="inline-block mr-2"
            >
              {{ word }}
            </motion.span>
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
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from "motion-v"
import { useElementVisibility } from "@vueuse/core"

// Split the title into words for animation
const titleWords = ref([
  "See", "exactly", "what", "your", "readers", "will", "experience"
])

const titleRef = useTemplateRef('titleRef')

// Track if the title is visible in viewport
const elementIsVisible = useElementVisibility(titleRef)

// Track if animation has already been triggered (play only once)
const hasAnimated = ref(false)

// Compute animation state - only trigger once
const isInView = computed(() => {
  if (elementIsVisible.value && !hasAnimated.value) {
    hasAnimated.value = true
    return true
  }
  return hasAnimated.value
})
</script>
