<template>
  <!-- User Details Section -->
  <section
    class="border-2 w-full xl:!w-1/2 h-full border-base-content rounded-3xl bg-base-200 p-4 md:p-8 flex flex-col gap-4 md:gap-6"
  >
    <!-- Header -->
    <header class="flex flex-row items-center justify-between">
      <div class="items-center">
        <h2
          class="text-neutral text-left text-base md:text-base leading-4 font-poppins flex flex-col gap-1"
        >
          <span
            class="text-neutral text-sm leading-[14px] md:text-base md:leading-4"
            >Welcome back,
          </span>
          <span
            class="text-primary text-3xl leading-6 md:text-4xl md:leading-8 font-delight font-semibold"
            >{{ userFullName }}
          </span>
        </h2>
      </div>

      <ActionButton @click="navigateToSettings">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="#000" fill-rule="evenodd" clip-rule="evenodd">
              <path
                d="M12 8.25a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5M9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0"
              />
              <path
                d="M11.975 1.25c-.445 0-.816 0-1.12.02a2.8 2.8 0 0 0-.907.19a2.75 2.75 0 0 0-1.489 1.488c-.145.35-.184.72-.2 1.122a.87.87 0 0 1-.415.731a.87.87 0 0 1-.841-.005c-.356-.188-.696-.339-1.072-.389a2.75 2.75 0 0 0-2.033.545a2.8 2.8 0 0 0-.617.691c-.17.254-.356.575-.578.96l-.025.044c-.223.385-.408.706-.542.98c-.14.286-.25.568-.29.88a2.75 2.75 0 0 0 .544 2.033c.231.301.532.52.872.734a.87.87 0 0 1 .426.726a.87.87 0 0 1-.426.726c-.34.214-.64.433-.872.734a2.75 2.75 0 0 0-.545 2.033c.041.312.15.594.29.88c.135.274.32.595.543.98l.025.044c.222.385.408.706.578.96c.177.263.367.5.617.69a2.75 2.75 0 0 0 2.033.546c.376-.05.716-.2 1.072-.389a.87.87 0 0 1 .84-.005a.86.86 0 0 1 .417.731c.015.402.054.772.2 1.122a2.75 2.75 0 0 0 1.488 1.489c.29.12.59.167.907.188c.304.021.675.021 1.12.021h.05c.445 0 .816 0 1.12-.02c.318-.022.617-.069.907-.19a2.75 2.75 0 0 0 1.489-1.488c.145-.35.184-.72.2-1.122a.87.87 0 0 1 .415-.732a.87.87 0 0 1 .841.006c.356.188.696.339 1.072.388a2.75 2.75 0 0 0 2.033-.544c.25-.192.44-.428.617-.691c.17-.254.356-.575.578-.96l.025-.044c.223-.385.408-.706.542-.98c.14-.286.25-.569.29-.88a2.75 2.75 0 0 0-.544-2.033c-.231-.301-.532-.52-.872-.734a.87.87 0 0 1-.426-.726c0-.278.152-.554.426-.726c.34-.214.64-.433.872-.734a2.75 2.75 0 0 0 .545-2.033a2.8 2.8 0 0 0-.29-.88a18 18 0 0 0-.543-.98l-.025-.044a18 18 0 0 0-.578-.96a2.8 2.8 0 0 0-.617-.69a2.75 2.75 0 0 0-2.033-.546c-.376.05-.716.2-1.072.389a.87.87 0 0 1-.84.005a.87.87 0 0 1-.417-.731c-.015-.402-.054-.772-.2-1.122a2.75 2.75 0 0 0-1.488-1.489c-.29-.12-.59-.167-.907-.188c-.304-.021-.675-.021-1.12-.021zm-1.453 1.595c.077-.032.194-.061.435-.078c.247-.017.567-.017 1.043-.017s.796 0 1.043.017c.241.017.358.046.435.078c.307.127.55.37.677.677c.04.096.073.247.086.604c.03.792.439 1.555 1.165 1.974s1.591.392 2.292.022c.316-.167.463-.214.567-.227a1.25 1.25 0 0 1 .924.247c.066.051.15.138.285.338c.139.206.299.483.537.895s.397.69.506.912c.107.217.14.333.15.416a1.25 1.25 0 0 1-.247.924c-.064.083-.178.187-.48.377c-.672.422-1.128 1.158-1.128 1.996s.456 1.574 1.128 1.996c.302.19.416.294.48.377c.202.263.29.595.247.924c-.01.083-.044.2-.15.416c-.109.223-.268.5-.506.912s-.399.689-.537.895c-.135.2-.219.287-.285.338a1.25 1.25 0 0 1-.924.247c-.104-.013-.25-.06-.567-.227c-.7-.37-1.566-.398-2.292.021s-1.135 1.183-1.165 1.975c-.013.357-.046.508-.086.604a1.25 1.25 0 0 1-.677.677c-.077.032-.194.061-.435.078c-.247.017-.567.017-1.043.017s-.796 0-1.043-.017c-.241-.017-.358-.046-.435-.078a1.25 1.25 0 0 1-.677-.677c-.04-.096-.073-.247-.086-.604c-.03-.792-.439-1.555-1.165-1.974s-1.591-.392-2.292-.022c-.316.167-.463.214-.567.227a1.25 1.25 0 0 1-.924-.247c-.066-.051-.15-.138-.285-.338a17 17 0 0 1-.537-.895c-.238-.412-.397-.69-.506-.912c-.107-.217-.14-.333-.15-.416a1.25 1.25 0 0 1 .247-.924c.064-.083.178-.187.48-.377c.672-.422 1.128-1.158 1.128-1.996s-.456-1.574-1.128-1.996c-.302-.19-.416-.294-.48-.377a1.25 1.25 0 0 1-.247-.924c.01-.083.044-.2.15-.416c.109-.223.268-.5.506-.912s.399-.689.537-.895c.135-.2.219-.287.285-.338a1.25 1.25 0 0 1 .924-.247c.104.013.25.06.567.227c.7.37 1.566.398 2.292-.022c.726-.419 1.135-1.182 1.165-1.974c.013-.357.046-.508.086-.604c.127-.307.37-.55.677-.677"
              />
            </g>
          </svg>
        </template>
      </ActionButton>
    </header>

    <HorizontalDivider />

    <!-- Stats -->
    <div class="flex flex-col gap-3 md:gap-4">
      <h4 class="text-base md:text-lg leading-4 font-poppins font-semibold">
        Published Content
      </h4>
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
        <div
          class="bg-base-100 w-full flex flex-col font-poppins p-3 md:p-4 rounded-2xl gap-6 shadow-md"
        >
          <div class="flex flex-row justify-between items-center">
            <h4
              class="text-base-content text-sm whitespace-nowrap leading-[14px] font-semibold"
            >
              Views
            </h4>
            <div>
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
                    d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19s-7.764-4.013-9.257-5.962a1.69 1.69 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5s7.764 4.013 9.257 5.962"
                  />
                  <circle cx="12" cy="12" r="3" />
                </g>
              </svg>
            </div>
          </div>
          <p class="text-sm text-base-content leading-3 font-poppins">
            <span class="font-bold text-primary text-3xl leading-[30px]"
              >100</span
            >
            views
          </p>
        </div>
        <div
          class="bg-base-100 w-full flex flex-col font-poppins p-3 md:p-4 rounded-2xl gap-6 shadow-md"
        >
          <div class="flex flex-row justify-between items-center">
            <h4
              class="text-base-content text-sm whitespace-nowrap leading-[14px] font-semibold"
            >
              Activity
            </h4>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0 1 16 16v288a16 16 0 0 1-16 16c-128 0-177.45 25.81-208 64c-30.37-38-80-64-208-64c-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0 1 16-16c131.57.59 192 32.84 208 96m0 0v288"
                />
              </svg>
            </div>
          </div>
          <p class="text-sm text-base-content leading-3 font-poppins">
            <span class="font-bold text-primary text-3xl leading-[30px]">{{
              flipbooksLength
            }}</span>
            {{ flipbooksLength > 1 ? "flipbooks" : "flipbook" }}
          </p>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Toast } from "~/types";

defineProps<{
  hasFlipbooks: boolean;
  flipbooksLength: number;
}>();

const user = useSupabaseUser();
const { showToast } = useToast();

const userFullName = computed(() => {
  const appMetadata = user.value?.app_metadata;
  const userMetadata = user.value?.user_metadata;

  if (appMetadata?.provider === "google") {
    return userMetadata?.full_name;
  } else {
    return `${userMetadata?.firstName} ${userMetadata?.lastName}`;
  }
});

const navigateToSettings = () => {
  return navigateTo({ name: "settings" });
};
</script>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-8%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
