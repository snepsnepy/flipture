<template>
  <section
    class="border-2 border-base-content flex flex-row gap-x-10 bg-base-200 p-4 rounded-3xl overflow-hidden !h-full"
  >
    <section class="relative z-10 w-full flex flex-col gap-4">
      <div
        class="flex flex-col-reverse md:flex-row w-full items-start rounded-2xl gap-4"
      >
        <!-- Thumbnail -->
        <div class="w-full bg-base-300 rounded-2xl shadow-md">
          <PDFThumbnail :pdf-url="flipbook.pdf_file_url!" />
        </div>

        <!-- Details -->
        <header
          class="flex flex-col gap-4 p-4 w-full bg-base-100 rounded-2xl h-full shadow-md justify-between"
        >
          <div class="space-y-4 w-full text-center">
            <h3
              class="font-oswald font-extrabold text-2xl leading-6 md:text-4xl md:leading-8"
            >
              {{ flipbook.title }}
            </h3>

            <p
              class="font-poppins text-sm leading-3 md:text-base md:leading-4 text-base-content/80"
            >
              {{ flipbook.description }}
            </p>
          </div>

          <p class="font-poppins text-xs leading-3 text-neutral">
            Created by
            <span class="font-semibold text-primary">{{
              flipbook.company_name
            }}</span>
            on
            <span class="font-semibold text-base-content">
              {{ dayjs(flipbook.created_at).format("DD-MM-YYYY") }}
            </span>
          </p>
        </header>
      </div>

      <!-- Actions -->
      <footer class="flex flex-col md:flex-row w-full justify-between gap-y-2">
        <div class="flex flex-row gap-2 w-full justify-between md:w-fit">
          <ActionButton type="error">
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
                />
              </svg>
            </template>
          </ActionButton>
          <ActionButton text="Edit" type="secondary">
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path
                    d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  />
                  <path
                    d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
                  />
                </g>
              </svg>
            </template>
          </ActionButton>
        </div>

        <ActionButton text="Share Link" type="primary">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="#000"
                d="M768 256H353.6a32 32 0 1 1 0-64H800a32 32 0 0 1 32 32v448a32 32 0 0 1-64 0z"
              />
              <path
                fill="#000"
                d="M777.344 201.344a32 32 0 0 1 45.312 45.312l-544 544a32 32 0 0 1-45.312-45.312z"
              />
            </svg>
          </template>
        </ActionButton>
      </footer>
    </section>
  </section>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import type { Flipbook } from "~/types";

defineProps<{
  flipbook: Flipbook;
}>();
</script>
