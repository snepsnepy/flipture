<template>
  <section class="container mx-auto pt-20 md:py-30">
    <div class="flex flex-col gap-y-6 md:gap-y-40 py-10">
      <!-- Header Section -->
      <section class="flex flex-col w-full gap-4 md:gap-8 ">
        <p class="whitespace-nowrap font-poppins font-medium text-neutral text-sm md:text-base">(See it in action)</p>

        <header class="flex flex-col gap-y-4 md:gap-y-6 items-start justify-start w-full">
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
            class="text-base-content text-sm md:text-base font-poppins max-w-full md:max-w-[650px] text-left"
          >
            Flipture is a simple way to present documents beautifully. We transform static PDFs into responsive flipbooks with <span class="text-primary font-medium">fast load times, modern styling, and analytics</span> that help you understand what’s working.
          </p>
        </header>
      </section>
      
      <!-- Content Section -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-8">
        <div 
          v-for="(pillar, index) in pillars" 
          :key="index"
          class="flex flex-col gap-y-6 min-h-[200px] md:min-h-[400px] justify-between border-b-2 last:border-b-0 border-base-300 md:border-b-0 md:border-r-2 md:last:border-r-0 pb-6 md:pr-6 lg:pr-8"
        >
          <!-- Icon -->
           <div class="p-3 bg-secondary/10 w-fit rounded-2xl border border-base-content/10">
            <Icon :name="pillar.icon" :size="isMobile ? 48 : 92" class="w-full h-full text-secondary" />
          </div>
          
          <div class="flex flex-col gap-2 md:gap-4">
            <!-- Title -->
            <h3 class="font-poppins font-semibold text-xl md:text-3xl leading-6 text-base-content">
              {{ pillar.title }}
            </h3>
            
            <!-- Description -->
            <p class="text-neutral text-sm md:text-base leading-6 font-poppins">
              {{ pillar.description }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { motion } from "motion-v"
import { useElementVisibility } from "@vueuse/core"

const isMobile = useIsMobile();
// Split the title into words for animation
const titleWords = ref([
  "How", "Flipture", "works"
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

const pillars = [
    {
      title: "Premium Look",
      description: "Present PDFs as a polished, interactive flipbook experience.",
      icon: "mdi:palette-outline"
    },
    {
      title: "Fast Publishing",
      description: "Upload once and share instantly—no design or setup required.",
      icon: "mdi:rocket-launch-outline"
    },
    {
      title: "Smart Insights",
      description: "Track views and engagement to understand what performs.",
      icon: "mdi:chart-line"
    }
  ]
</script>