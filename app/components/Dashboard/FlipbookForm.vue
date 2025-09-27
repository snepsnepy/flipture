<template>
  <section class="flex flex-col gap-6 md:gap-10">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <!-- First Name and Last Name -->
        <div class="flex flex-col md:flex-row gap-4 w-full">
          <!-- Fisrt Name -->
          <fieldset class="fieldset p-0 w-full">
            <legend
              class="fieldset-legend pb-4 !pt-0 font-poppins text-base leading-4 text-primary-content"
            >
              Flipbook Title
            </legend>
            <label
              class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content"
            >
              <input
                name="firstName"
                type="text"
                placeholder="Flipbook Title"
                class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
              />
            </label>
          </fieldset>

          <!-- LastName -->
          <fieldset class="fieldset p-0 w-full">
            <legend
              class="fieldset-legend pb-4 !pt-0 font-poppins text-base leading-4 text-primary-content"
            >
              Company Name
            </legend>
            <label
              class="input validator border-2 bg-base-100 rounded-2xl h-14 !outline-none !shadow-none w-full border-base-content"
            >
              <input
                name="lastName"
                type="text"
                placeholder="Company Name"
                class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
              />
            </label>
            <div class="label text-secondary font-poppins">Optional</div>
          </fieldset>
        </div>

        <fieldset class="fieldset p-0">
          <legend
            class="fieldset-legend pb-4 !pt-0 font-poppins text-base leading-4 text-primary-content"
          >
            Description
          </legend>
          <textarea
            class="textarea px-4 h-24 w-full font-poppins rounded-2xl text-xl leading-4 placeholder:text-xl !border-2 border-base-content focus:outline-none focus:border-base-content"
            placeholder="Bio"
          ></textarea>
          <div class="label text-secondary font-poppins">Optional</div>
        </fieldset>
      </div>
    </div>
    <FileInput />

    <button
      type="button"
      :disabled="true"
      class="'w-full py-3 md:py-4 md:px-10 rounded-3xl font-poppins font-bold border-2 border-base-content text-base md:text-lg transition-all duration-300 bg-secondary text-base-content hover:cursor-pointer hover:bg-primary-content hover:border-2 hover:border-base-content hover:text-base-content disabled:pointer-events-none disabled:bg-secondary-content disabled:text-base-content/50"
    >
      Create Flipbook
      <!-- <span v-if="isLoading" class="loading loading-spinner loading-md"></span> -->
    </button>
  </section>
</template>

<script setup lang="ts"></script>
