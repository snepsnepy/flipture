<template>
  <section class="container mx-auto">
    <VueBitsScrollVelocity
      :texts="['One Plan • 3D Flipbook • Full Access • Instant Upload •']"
      :velocity="50"
      :damping="30"
      :stiffness="50"
      :velocity-mapping="{ input: [0, 1000], output: [0, 5] }"
      class-name="text-base-content font-poppins"
      parallax-class-name="custom-parallax"
      scroller-class-name="custom-scroller"
    />
  </section>
</template>

<script setup lang="ts"></script>
