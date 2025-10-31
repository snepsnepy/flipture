<template>
  <Listbox
    v-slot="{ open }"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="relative">
      <ListboxButton
        class="btn bg-primary text-base-100 rounded-2xl border-none hover:bg-base-content/50 font-poppins text-base md:text-lg flex items-center justify-between w-full"
      >
        <span>Sort by: {{ currentSortLabel }}</span>
        <span class="pointer-events-none ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :class="[
              'h-5 w-5 transition-transform duration-200',
              { 'rotate-180': open },
            ]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
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
          class="bg-base-content text-base-100 rounded-2xl z-[999] min-w-[240px] mt-2 p-2 shadow-lg absolute focus:outline-none"
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
                'font-poppins text-base md:text-lg cursor-pointer p-2 rounded',
                active ? 'bg-base-200' : '',
                selected ? 'bg-base-200' : '',
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

export type SortOption =
  | "title-asc"
  | "title-desc"
  | "date-newest"
  | "date-oldest";

interface SortOptionConfig {
  value: SortOption;
  label: string;
}

const props = defineProps<{
  modelValue: SortOption;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: SortOption];
}>();

const sortOptions: SortOptionConfig[] = [
  { value: "title-asc", label: "Title: A to Z" },
  { value: "title-desc", label: "Title: Z to A" },
  { value: "date-newest", label: "Date Created: Newest First" },
  { value: "date-oldest", label: "Date Created: Oldest First" },
];

const currentSortLabel = computed(() => {
  const option = sortOptions.find((opt) => opt.value === props.modelValue);
  return option?.label || "Date Created: Newest First";
});
</script>
