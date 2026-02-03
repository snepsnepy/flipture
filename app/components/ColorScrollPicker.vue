<template>
  <div class="color-scroll-picker" :style="containerStyle">
    <motion.ul 
      ref="containerRef" 
      :style="{ ...listStyle, maskImage }"
      @mousedown="handleMouseDown"
      @mouseleave="handleMouseLeave"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
    >
      <motion.li 
        v-for="gradient in gradients"
        :key="gradient.id"
        :style="listItemStyle"
        :class="[
          gradient.gradient,
          'rounded-2xl border-2 transition-all duration-200 relative',
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
          class="absolute inset-0 flex items-center justify-center bg-base-content/40 rounded-2xl backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <span class="sr-only">{{ gradient.name }}</span>
      </motion.li>
    </motion.ul>
  </div>
</template>

<script setup lang="ts">
import { motion, useScroll, useMotionValue, useMotionValueEvent, useDomRef, animate, MotionValue } from 'motion-v'
import type { CSSProperties } from 'vue'

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

// ============== Styles ==============
const containerStyle: CSSProperties = {
  width: '100%',
  position: 'relative',
}

const listStyle: CSSProperties = {
  display: 'flex',
  listStyle: 'none',
  height: '220px',
  overflowX: 'auto',
  overflowY: 'hidden',
  padding: '20px 12px',
  flex: '0 0 600px',
  margin: '0 auto',
  gap: '20px',
  cursor: 'grab',
  scrollBehavior: 'smooth',
}

const listItemStyle: CSSProperties = {
  flex: '0 0 200px',
}
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
