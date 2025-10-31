<template>
  <section
    class="flex flex-col gap-2 md:gap-6 items-center justify-center border-2 border-base-content rounded-3xl pb-12 px-6 md:px-8 shadow-md"
  >
    <header class="flex flex-col items-center">
      <img
        src="@/assets/img/not-found.svg"
        alt="No Flipbooks"
        class="w-50 h-50 md:w-full md:h-full"
      />
    </header>

    <div class="flex flex-col gap-2 items-center">
      <h4
        class="font-poppins font-bold text-lg leading-4 md:text-2xl md:leading-6"
      >
        No Flipbooks
      </h4>

      <p
        class="text-base-content text-sm leading-6 md:text-base md:leading-4 font-poppins text-center"
      >
        You don't have any flipbooks yet. <br />
        <span class="text-neutral text-sm leading-3"
          >Press the Create New button to get started.
        </span>
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup></script>
