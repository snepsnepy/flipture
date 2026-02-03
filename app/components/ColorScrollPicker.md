# ColorScrollPicker Component

A beautiful scrollable color/gradient picker with animated scroll progress indicator, built with `motion-v` and styled with Tailwind CSS.

## Features

- ✨ Smooth horizontal scrolling with animated fade masks at edges
- 📊 Circular scroll progress indicator
- 🎨 Support for gradients and solid colors
- 🔒 Premium/locked state support for upselling
- 📱 Fully responsive
- ⌨️ Keyboard accessible
- 🎯 v-model support for two-way binding

## Installation

This component uses `motion-v` which is already installed in your project. No additional packages needed!

## Usage

### Basic Usage with Gradients

```vue
<template>
  <div>
    <ColorScrollPicker
      v-model="selectedGradient"
      :gradients="backgroundGradients"
      @gradient-selected="handleSelection"
    />
  </div>
</template>

<script setup lang="ts">
const selectedGradient = ref('deep-white')

const backgroundGradients = [
  {
    id: 'deep-white',
    name: 'Deep White',
    gradient: 'bg-gradient-to-br from-[#FFFFFF] to-[#F0F0F0]',
    isPremium: false,
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    gradient: 'bg-gradient-to-br from-[#091E3A] via-[#2F80ED] to-[#2D9EE0]',
    isPremium: true,
  },
  // ... more gradients
]

const handleSelection = (gradientId: string) => {
  console.log('Selected:', gradientId)
}
</script>
```

### With Premium/Free Plan Support

```vue
<template>
  <ColorScrollPicker
    v-model="selectedGradient"
    :gradients="backgroundGradients"
    :is-free-plan="userStore.isFreePlan"
    @gradient-selected="handleSelection"
  />
</template>
```

When `isFreePlan` is `true`, gradients marked as `isPremium: true` will be:
- Locked with a padlock icon
- Semi-transparent (60% opacity)
- Non-clickable

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gradients` | `GradientOption[]` | required | Array of gradient/color options |
| `modelValue` | `string` | `''` | Currently selected gradient ID (v-model) |
| `isFreePlan` | `boolean` | `false` | Whether user is on free plan (locks premium gradients) |

### GradientOption Type

```typescript
interface GradientOption {
  id: string           // Unique identifier
  name: string         // Display name (for accessibility)
  gradient: string     // Tailwind gradient classes
  isPremium: boolean   // Whether this is a premium option
}
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when gradient is selected (v-model) |
| `gradientSelected` | `string` | Emitted when gradient is selected (alternative to v-model) |

## Styling

The component uses:
- **Tailwind CSS** for styling
- **DaisyUI** color variables (`oklch(var(--p))` for primary color)
- Custom scrollbar styling with smooth animations
- Responsive sizing

### Customization

You can customize the appearance by:

1. **Adjusting gradient sizes**: Change `w-24 h-20` in the `<li>` element
2. **Modifying scroll height**: Change `h-32` in the `<motion.ul>` element
3. **Customizing progress indicator**: Modify the SVG position and size
4. **Changing mask animation**: Adjust values in `useScrollOverflowMask` function

## Example: Custom Solid Colors

```vue
<template>
  <ColorScrollPicker
    v-model="selectedColor"
    :gradients="solidColors"
  />
</template>

<script setup lang="ts">
const solidColors = [
  { id: 'red', name: 'Red', gradient: 'bg-red-500', isPremium: false },
  { id: 'blue', name: 'Blue', gradient: 'bg-blue-500', isPremium: false },
  { id: 'green', name: 'Green', gradient: 'bg-green-500', isPremium: true },
  { id: 'purple', name: 'Purple', gradient: 'bg-purple-500', isPremium: true },
]
</script>
```

## Accessibility

- Uses semantic HTML (`<ul>` and `<li>`)
- Screen reader text for each gradient name
- Keyboard accessible (scrollable with arrow keys)
- Clear visual states (selected, hover, locked)

## Browser Support

Works in all modern browsers that support:
- CSS Grid
- CSS Flexbox
- CSS Custom Properties
- Scroll behavior
- Intersection Observer (for motion-v)

## Implementation in DesignOptionsStep

Currently integrated into `@app/components/CreateFlipbookModal/steps/DesignOptionsStep.vue`:

```vue
<ColorScrollPicker
  v-model="localFormData.backgroundGradient!"
  :gradients="backgroundGradients"
  :is-free-plan="userStore.isFreePlan && !userStore.isLoadingProfile"
  @gradient-selected="handleGradientSelection"
/>
```
