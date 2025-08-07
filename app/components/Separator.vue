<template>
  <section class="container mx-auto">
    <VueBitsScrollVelocity
      :texts="['Instant Upload • 3D Flipbook • €6/month Flat •']"
      :velocity="50"
      :damping="30"
      :stiffness="50"
      :velocity-mapping="{ input: [0, 1000], output: [0, 5] }"
      :class="'text-base-content'"
      parallax-class-name="custom-parallax"
      scroller-class-name="custom-scroller"
    />
  </section>
</template>

<script setup lang="ts"></script>
