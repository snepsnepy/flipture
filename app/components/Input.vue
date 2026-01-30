<template>
  <fieldset class="fieldset p-0" :class="fieldsetClass">
    <legend
      class="fieldset-legend gap-1 pb-2.5 md:pb-4 pt-0! font-medium font-poppins text-sm md:text-base leading-4 text-base-content"
    >
      <p>{{ label }}</p>
      <span v-if="required" class="text-error">*</span>
    </legend>
    <label
      class="input validator border-2 bg-base-100 h-12 md:h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content"
      :class="labelClass"
    >
      <!-- Icon slot -->
      <slot name="icon" v-if="$slots.icon" />

      <input
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :class="[
          'font-poppins text-base leading-4 md:text-xl placeholder:text-base md:placeholder:text-lg',
          $slots.icon ? 'w-full' : 'w-full',
          inputClass,
        ]"
        v-model="modelValue"
        v-bind="$attrs"
      />
    </label>
    <span class="text-error text-xs leading-3 font-poppins" v-if="errorMessage">
      {{ errorMessage }}
    </span>
  </fieldset>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
  fieldsetClass?: string;
  labelClass?: string;
  inputClass?: string;
}

withDefaults(defineProps<Props>(), {
  required: false,
  type: "text",
  placeholder: "",
  fieldsetClass: "",
  labelClass: "",
  inputClass: "",
});

const modelValue = defineModel<string>("modelValue");

// Allow all attributes to be passed through to the input
defineOptions({
  inheritAttrs: false,
});
</script>
