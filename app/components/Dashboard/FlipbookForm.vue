<template>
  <section class="flex flex-col gap-6 md:gap-10">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <!-- First Name and Last Name -->
        <div class="flex flex-col md:flex-row gap-4 w-full">
          <!-- Fisrt Name -->
          <fieldset class="fieldset p-0 w-full">
            <legend class="fieldset-legend pb-2 !pt-0 font-poppins">
              First Name
            </legend>
            <label
              class="input validator bg-base-300/20 border-neutral rounded-lg h-10 !outline-none !shadow-none w-full"
            >
              <input
                name="firstName"
                type="text"
                placeholder="Type your first name"
                class="w-full font-poppins text-base leading-4 placeholder:text-sm"
              />
            </label>
          </fieldset>

          <!-- LastName -->
          <fieldset class="fieldset p-0 w-full">
            <legend class="fieldset-legend pb-2 !pt-0 font-poppins">
              Last Name
            </legend>
            <label
              class="input validator bg-base-300/20 border-neutral rounded-lg h-10 !outline-none !shadow-none w-full"
            >
              <input
                name="lastName"
                type="text"
                placeholder="Type your last name"
                class="font-poppins text-base leading-4 placeholder:text-sm"
              />
            </label>
          </fieldset>
        </div>

        <fieldset class="fieldset p-0">
          <legend class="fieldset-legend pb-2 !pt-0 font-poppins">Email</legend>
          <label
            class="input validator bg-base-300/20 border-neutral rounded-lg h-10 !outline-none !shadow-none w-full"
          >
            <svg
              class="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              name="email"
              type="email"
              placeholder="Type your email"
              class="w-full font-poppins text-base leading-4 placeholder:text-sm"
            />
          </label>
        </fieldset>

        <fieldset class="fieldset p-0">
          <legend class="fieldset-legend pb-2 !pt-0 font-poppins">
            Password
          </legend>
          <label
            class="input validator bg-base-300/20 border-neutral rounded-lg h-10 !outline-none !shadow-none w-full"
          >
            <svg
              class="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                ></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              name="password"
              type="password"
              placeholder="Password"
              class="font-poppins text-base leading-4 placeholder:text-sm"
            />
          </label>
        </fieldset>

        <fieldset class="fieldset p-0">
          <legend class="fieldset-legend pb-2 !pt-0 font-poppins">
            Confirm Password
          </legend>
          <label
            class="input validator bg-base-300/20 border-neutral rounded-lg h-10 !outline-none !shadow-none w-full"
          >
            <svg
              class="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                ></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              class="font-poppins text-base leading-4 placeholder:text-sm"
            />
          </label>
        </fieldset>
      </div>
    </div>
    <FileInput />
  </section>
</template>

<script setup lang="ts"></script>
