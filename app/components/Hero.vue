<template>
  <section class="container mx-auto px-0 md:px-24">
    <section class="flex flex-col xl:flex-row py-10 md:py-20 gap-10 items-center overflow-x-clip xl:pr-10 lg:rounded-r-3xl">
      <div class="flex flex-col w-full gap-4">
        <!-- Content container with higher z-index to appear above the image -->
        <header class="flex flex-col gap-4 md:gap-6 lg:gap-8 relative z-10 text-center xl:text-left">
            <h1
              id="hero-heading"
              class="font-poppins text-base-content text-5xl md:text-7xl lg:text-[115px] font-semibold leading-[110%]"
            >
              <span class="text-base-content/60">A better way <br />
              to</span> present, <br /> share <br />
              and impress.
            </h1>

            <p class="font-poppins text-base-content/60 text-base px-2 md:px-0 sm:text-lg md:text-xl lg:text-2xl leading-relaxed lg:leading-10">Premium design, effortless publishing — upload a PDF and share a beautiful flipbook in minutes.</p>
        </header>
    </div>

      <div class="flex flex-col relative z-0 shrink-0 ml-auto mr-8 xl:ml-0 xl:mr-0">
        <!-- Extra large yellow circle background - hidden on mobile, visible on lg -->
        <div class="absolute border-2 border-secondary/50 inset-0 -inset-x-32 -inset-y-32 -top-48 -left-48 lg:-inset-x-72 lg:-inset-y-72 lg:-top-86 lg:-left-86 bg-secondary/50 rounded-full"></div>
        <!-- Large yellow circle background -->
        <div class="absolute border-2 border-secondary/50 inset-0 -inset-x-16 -inset-y-16 -left-20 -top-20 lg:inset-5 lg:-inset-x-24 lg:-inset-y-24 lg:-left-40 lg:-top-40 bg-secondary/75 rounded-full"></div>
        
        <button 
          ref="buttonRef"
          class="flex flex-row items-center bg-secondary hover:bg-base-100 text-base-content transition-all duration-300 hover:cursor-pointer h-fit rounded-full py-16 px-6 sm:py-24 sm:px-8 lg:py-36 lg:px-10 whitespace-nowrap font-poppins font-normal text-xl sm:text-2xl lg:text-4xl border-2 border-base-content overflow-hidden relative z-10"
        >
          Get Started
          <div class="relative w-8 h-16 sm:w-10 sm:h-14 lg:w-14 lg:h-14 flex items-center justify-center">
            <ArrowIcon 
              :animate="isHovered ? {
                x: [0, 10, -10, 0],
                y: [0, -10, 10, 0],
                opacity: [1, 0, 0, 1],
              } : { x: 0, y: 0, opacity: 1 }"
              :transition="{ duration: 0.4 }"
            />
          </div>
        </button> 
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { motion } from "motion-v"
import { useElementHover } from "@vueuse/core"
import { useTemplateRef } from "vue"
import ArrowDiagonal from "./ArrowDiagonal.vue"

const ArrowIcon = motion.create(ArrowDiagonal)

const buttonRef = useTemplateRef('buttonRef')
const isHovered = useElementHover(buttonRef)
</script>
