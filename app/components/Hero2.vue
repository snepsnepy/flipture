<template>
  <section class="container mx-auto py-10">
    <section class="flex flex-row gap-10 w-full items-center">
      <div class="flex flex-col w-full gap-4">
        <!-- Content container with higher z-index to appear above the image -->
        <header class="flex flex-col gap-8 relative z-10">
            <h1
              id="hero-heading"
              class="font-poppins text-base-content text-4xl md:text-[115px] font-bold leading-[110%]"
            >
              <span class="text-base-content/60">A better way <br />
              to</span> present, share <br />
              and impress.
            </h1>

            <p class="font-poppins text-base-content/60 text-2xl leading-10">Premium design, effortless publishing — upload a PDF and share a beautiful flipbook in minutes.</p>
        </header>
    </div>

      <div class="flex flex-col">
       
        <button 
          ref="buttonRef"
          class="flex flex-row items-center bg-secondary hover:bg-base-100 text-base-content transition-all duration-300 hover:cursor-pointer h-fit rounded-full py-36 px-10 whitespace-nowrap font-poppins font-bold text-4xl border-2 border-base-content overflow-hidden"
        >
          Get Started
          <div class="relative w-14 h-14 flex items-center justify-center">
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
