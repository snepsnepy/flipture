<template>
  <Listbox
    v-slot="{ open }"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="relative">
      <ListboxButton
        class="btn text-base-content bg-base-100 border-2 px-3 md:px-4 py-[22px] md:py-[26px] border-base-content rounded-2xl hover:bg-secondary font-poppins text-base md:text-lg flex items-center w-fit"
      >
        <span v-if="!isMobile">Sort by</span>
        <span class="pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
          >
            <path
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="m25 14l-9-9l-9 9m8.992 17V5M42 34l-9 9l-9-9m8.992-17v26"
            />
          </svg>
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="bg-base-100 border-2 border-base-content rounded-2xl z-[999] min-w-[240px] mt-2 p-2 shadow-lg absolute right-0 focus:outline-none text-base-content"
        >
          <ListboxOption
            v-for="option in sortOptions"
            :key="option.value"
            :value="option.value"
            v-slot="{ active, selected }"
            as="template"
          >
            <div
              :class="[
                'font-poppins text-base md:text-lg cursor-pointer p-2 rounded-xl hover:text-primary-content',
                active ? 'bg-primary text-primary-content' : '',
                selected ? 'bg-base-100' : '',
              ]"
            >
              {{ option.label }}
            </div>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import type { SortOption, SortOptionConfig } from "~/types";
import { useIsMobile } from "~/composables/useIsMobile";

defineProps<{
  modelValue: SortOption;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: SortOption];
}>();

const { isMobile } = useIsMobile();

const sortOptions: SortOptionConfig[] = [
  { value: "title-asc", label: "Title: A to Z" },
  { value: "title-desc", label: "Title: Z to A" },
  { value: "date-newest", label: "Date: Newest First" },
  { value: "date-oldest", label: "Date: Oldest First" },
];
</script>
