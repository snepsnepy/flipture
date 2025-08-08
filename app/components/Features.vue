<template>
  <section>
    <div
      class="feature-item flex flex-row justify-between items-center py-5 border-t-2 border-base-content px-4 ease-out duration-500 transition-all relative overflow-hidden"
      :class="{
        'pointer-events-none': isMobile,
      }"
    >
      <div
        class="flex flex-col md:flex-row items-left md:items-center gap-x-20 gap-y-1 w-3/4 justify-between"
      >
        <h4 class="text-poppins font-bold text-5xl">3D Flip Animation</h4>
        <span class="text-poppins text-base font-medium"
          >Realistic page-turning with smooth transitions.</span
        >
      </div>
      <div class="w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="currentColor" stroke-width="1.5">
            <path
              d="M10.55 2.876L4.595 6.182a2.98 2.98 0 0 0-1.529 2.611v6.414a2.98 2.98 0 0 0 1.529 2.61l5.957 3.307a2.98 2.98 0 0 0 2.898 0l5.957-3.306a2.98 2.98 0 0 0 1.529-2.611V8.793a2.98 2.98 0 0 0-1.529-2.61L13.45 2.876a2.98 2.98 0 0 0-2.898 0Z"
            />
            <path d="M20.33 6.996L12 12L3.67 6.996M12 21.49V12" />
          </g>
        </svg>
      </div>
    </div>
    <div
      class="feature-item flex flex-row justify-between items-center py-5 border-t-2 border-base-content px-4 ease-out duration-500 transition-all relative overflow-hidden"
      :class="{
        'pointer-events-none': isMobile,
      }"
    >
      <div
        class="flex flex-col md:flex-row items-left md:items-center gap-x-20 gap-y-1 w-3/4 justify-between"
      >
        <h4 class="text-poppins font-bold text-5xl">Shareable Links</h4>
        <span class="text-poppins text-base font-medium"
          >One-click link to share with anyone, anywhere.</span
        >
      </div>
      <div class="w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="m17.657 12l-1.414-1.414l2.121-2.122a2 2 0 1 0-2.828-2.828l-4.243 4.243a2 2 0 0 0 0 2.828l-1.414 1.414a4 4 0 0 1 0-5.657l4.242-4.242a4 4 0 0 1 5.657 5.657zM6.343 12l1.414 1.414l-2.121 2.122a2 2 0 1 0 2.828 2.828l4.243-4.243a2 2 0 0 0 0-2.828l1.414-1.414a4 4 0 0 1 0 5.657L9.88 19.778a4 4 0 1 1-5.657-5.657z"
          />
        </svg>
      </div>
    </div>
    <div
      class="feature-item flex flex-row justify-between items-center py-5 border-t-2 border-base-content px-4 ease-out duration-500 transition-all relative overflow-hidden"
      :class="{
        'pointer-events-none': isMobile,
      }"
    >
      <div
        class="flex flex-col md:flex-row items-left md:items-center gap-x-20 gap-y-1 w-3/4 justify-between"
      >
        <h4 class="text-poppins font-bold text-5xl">Mobile Friendly</h4>
        <span class="text-poppins text-base font-medium"
          >Works perfectly on all devices and screen sizes.</span
        >
      </div>
      <div class="w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 6v10h5v-4a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v4h2V6zM0 20v-2h4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h4v2h-6a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2zm11.5 0a.5.5 0 0 0-.5.5a.5.5 0 0 0 .5.5a.5.5 0 0 0 .5-.5a.5.5 0 0 0-.5-.5m4 0a.5.5 0 0 0-.5.5a.5.5 0 0 0 .5.5a.5.5 0 0 0 .5-.5a.5.5 0 0 0-.5-.5M13 20v1h1v-1zm-2-8v7h5v-7z"
          />
        </svg>
      </div>
    </div>
    <div
      class="feature-item flex flex-row justify-between items-center py-5 border-y-2 border-base-content px-4 ease-out duration-500 transition-all relative overflow-hidden"
      :class="{
        'pointer-events-none': isMobile,
      }"
    >
      <div
        class="flex flex-col md:flex-row items-left md:items-center gap-x-20 gap-y-1 w-3/4 justify-between"
      >
        <h4 class="text-poppins font-bold text-5xl">Ad-Free Viewing</h4>
        <span class="text-poppins text-base font-medium"
          >No branding, no ads — just your content.</span
        >
      </div>
      <div class="w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12.2 9l-2-2H13c1.1 0 2 .9 2 2v2.8l-2-2V9zM23 9V7h-4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v2h-2.8l2 2h.8c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-2V9zm-.9 12.5l-1.3 1.3l-6.4-6.4c-.3.3-.8.6-1.4.6H9v-6.1l-2-2V17H5v-4H3v4H1V9c0-1.1.9-2 2-2h2.1l-4-4l1.3-1.3zM5 9H3v2h2zm8 5.9l-2-2V15h2z"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useIsMobile } from "~/composables/useIsMobile";

const { isMobile } = useIsMobile();
</script>

<style scoped>
.feature-item {
  background: linear-gradient(135deg, transparent 0%, transparent 100%);
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.feature-item::before {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: -1;
  opacity: 0;
}

.feature-item:hover {
  color: white;
  transform: translateX(0px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.feature-item:hover::before {
  top: 0;
  opacity: 1;
}

.feature-item:hover h4,
.feature-item:hover span {
  color: white;
  transform: translateZ(0);
}

.feature-item:hover svg {
  filter: brightness(0) invert(1);
}
</style>
