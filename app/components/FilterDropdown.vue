<template>
  <Listbox
    v-slot="{ open }"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="relative w-full xl:w-fit">
      <ListboxButton
        :class="[
          buttonClass ||
            'btn w-full text-base-content bg-base-100 border-2 px-3 md:px-3 py-[22px] md:py-[26px] border-base-content rounded-2xl hover:bg-secondary font-poppins text-base md:text-lg flex items-center xl:w-fit whitespace-nowrap',
        ]"
      >
        <span v-if="buttonLabel">
          {{ buttonLabel }}
        </span>
        <span v-else>
          {{ selectedLabel }}
        </span>
        <span v-if="$slots.icon" class="pointer-events-none">
          <slot name="icon" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          :class="[
            dropdownClass ||
              'bg-base-100 border-2 border-base-content rounded-2xl z-[999] w-full md:min-w-[240px] mt-1 p-2 shadow-lg absolute left-0 md:right-0 md:left-auto focus:outline-none text-base-content',
          ]"
        >
          <ListboxOption
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            v-slot="{ active, selected }"
            as="template"
          >
            <div
              :class="[
                'font-poppins text-base md:text-lg cursor-pointer p-2 rounded-xl transition-colors',
                active ? 'bg-primary text-primary-content' : '',
                selected ? 'font-semibold' : '',
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

interface OptionConfig {
  value: string;
  label: string;
}

interface Props {
  modelValue: string;
  options: OptionConfig[];
  buttonLabel?: string;
  buttonClass?: string;
  dropdownClass?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const selectedLabel = computed(() => {
  const selected = props.options.find((opt) => opt.value === props.modelValue);
  return selected ? selected.label : "";
});
</script>
