<template>
  <div class="color-scroll-picker w-full">
    <motion.ul 
      ref="containerRef" 
      :style="{ maskImage }"
      class="flex list-none h-[180px] sm:h-[200px] md:h-[220px] overflow-x-auto overflow-y-hidden p-3 sm:p-4 md:p-5 w-full md:max-w-[450px] xl:max-w-[600px] mx-auto gap-3 sm:gap-4 md:gap-5 cursor-grab scroll-smooth"
      @mousedown="handleMouseDown"
      @mouseleave="handleMouseLeave"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
    >
      <motion.li 
        v-for="gradient in gradients"
        :key="gradient.id"
        :class="[
          gradient.gradient,
          'shrink-0 w-[150px] sm:w-[180px] md:w-[200px] rounded-2xl border-2 transition-all duration-200 relative',
          modelValue === gradient.id 
            ? 'border-primary ring-2 ring-primary ring-offset-2' 
            : gradient.isPremium && isFreePlan
            ? 'border-base-content/20 opacity-60'
            : 'border-base-content/20 hover:border-base-content/40 hover:cursor-pointer'
        ]"
        :whileHover="
          !(gradient.isPremium && isFreePlan) && modelValue !== gradient.id
            ? { scale: 1.05 }
            : {}
        "
        :animate="
          modelValue === gradient.id
            ? { scale: 1.05 }
            : { scale: 1 }
        "
        :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
        @click="handleGradientClick(gradient)"
      >
        <!-- Lock Icon for Premium Gradients -->
        <div
          v-if="gradient.isPremium && isFreePlan"
          class="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-base-content/40 rounded-2xl backdrop-blur-sm"
        >
          <Icon name="octicon:lock-16" style="color: white" :size="48" />
          <span 
            class="text-[10px] bg-primary-content/50 text-base-content px-1.5 py-0.5 rounded-full font-semibold"
          >
            PRO
          </span>
        </div>
        <span class="sr-only">{{ gradient.name }}</span>
      </motion.li>
    </motion.ul>
  </div>
</template>

<script setup lang="ts">
import { motion, useScroll, useMotionValue, useMotionValueEvent, useDomRef, animate, MotionValue } from 'motion-v'

// ============== Types ==============
interface GradientOption {
  id: string
  name: string
  gradient: string
  isPremium: boolean
}

interface Props {
  gradients: GradientOption[]
  modelValue?: string
  isFreePlan?: boolean
}

// ============== Props & Emits ==============
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  isFreePlan: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'gradientSelected', value: string): void
}>()

// ============== Scroll & Mask Animation ==============
const containerRef = useDomRef()
const { scrollXProgress } = useScroll({ 
  container: containerRef,
  axis: 'x'
})

// Gradient mask animation
function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
  const left = '0%'
  const right = '100%'
  const leftInset = '20%'
  const rightInset = '80%'
  const transparent = '#0000'
  const opaque = '#000'

  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  )

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      )
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      )
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      )
    }
  })

  return maskImage
}

const maskImage = useScrollOverflowMask(scrollXProgress)

// ============== Gradient Selection ==============
const handleGradientClick = (gradient: GradientOption) => {
  if (gradient.isPremium && props.isFreePlan) {
    return
  }
  
  emit('update:modelValue', gradient.id)
  emit('gradientSelected', gradient.id)
}

// ============== Smooth Scroll with Spring Physics ==============
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const velocityX = ref(0)
const lastX = ref(0)
const lastTime = ref(0)

const handleMouseDown = (e: MouseEvent) => {
  const container = containerRef.value
  if (!container) return
  
  isDragging.value = true
  startX.value = e.pageX
  scrollLeft.value = container.scrollLeft
  lastX.value = e.pageX
  lastTime.value = Date.now()
  velocityX.value = 0
  
  container.style.cursor = 'grabbing'
  container.style.userSelect = 'none'
}

const handleMouseLeave = () => {
  if (isDragging.value) {
    applyMomentum()
    const container = containerRef.value
    if (container) {
      container.style.cursor = 'grab'
    }
    isDragging.value = false
  }
}

const handleMouseUp = () => {
  if (isDragging.value) {
    applyMomentum()
    const container = containerRef.value
    if (container) {
      container.style.cursor = 'grab'
      container.style.userSelect = 'auto'
    }
    isDragging.value = false
  }
}

const applyMomentum = () => {
  const container = containerRef.value
  if (!container || Math.abs(velocityX.value) < 0.5) return
  
  // Calculate target position with momentum
  const momentum = velocityX.value * 200 // Amplify velocity for momentum effect
  const targetScroll = container.scrollLeft - momentum
  
  // Animate to target with spring physics
  animate(
    container.scrollLeft,
    targetScroll,
    {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 1,
      onUpdate: (latest) => {
        container.scrollLeft = latest
      }
    }
  )
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  
  e.preventDefault()
  const container = containerRef.value
  if (!container) return
  
  // Calculate velocity
  const now = Date.now()
  const dt = now - lastTime.value
  const dx = e.pageX - lastX.value
  
  if (dt > 0) {
    velocityX.value = dx / dt
  }
  
  lastX.value = e.pageX
  lastTime.value = now
  
  // Apply drag movement
  const delta = e.pageX - startX.value
  container.scrollLeft = scrollLeft.value - delta
}

// Styles are now handled by Tailwind classes in the template
</script>

<style scoped>
.color-scroll-picker :deep(ul) {
  /* Prevent text selection while dragging */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* Native smooth scrolling */
  scroll-behavior: smooth;
  /* iOS momentum scrolling */
  -webkit-overflow-scrolling: touch;
}

/* Custom scrollbar styling (if visible) */
.color-scroll-picker :deep(ul::-webkit-scrollbar) {
  height: 5px;
  width: 5px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1ex;
}

.color-scroll-picker :deep(ul::-webkit-scrollbar-thumb) {
  background: oklch(var(--p));
  border-radius: 1ex;
}

.color-scroll-picker :deep(ul::-webkit-scrollbar-corner) {
  background: rgba(255, 255, 255, 0.2);
}
</style>
