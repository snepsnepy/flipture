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
            class="textarea h-24 p-2 w-full font-poppins rounded-2xl text-xl leading-4 placeholder:text-xl !border-2 border-base-content focus:outline-none focus:border-none"
            placeholder="Bio"
          ></textarea>
          <div class="label text-secondary font-poppins">Optional</div>
        </fieldset>
      </div>
    </div>
    <FileInput />
  </section>
</template>

<script setup lang="ts"></script>
