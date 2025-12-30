<template>
  <div class="container mx-auto py-0">
    <!-- Loading Spinner -->
    <div
      v-if="isLoading"
      class="flex justify-center flex-col items-center min-h-[calc(100vh-300px)]"
    >
      <LoadingSpinner />
    </div>

    <!-- Main Content -->
    <section v-else class="flex flex-col gap-8">
      <!-- Header -->
      <header class="flex flex-col gap-8">
        <div class="flex flex-row items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0046ff"
              fill-rule="evenodd"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-.47-13.53a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72H16a.75.75 0 0 0 0-1.5H9.81l1.72-1.72a.75.75 0 0 0 0-1.06"
              clip-rule="evenodd"
            />
          </svg>
          <button
            @click="navigateToDashboard"
            class="text-base-content text-sm md:text-base leading-4 font-poppins font-medium hover:cursor-pointer hover:text-primary"
          >
            Back
          </button>
        </div>

        <div
          class="flex flex-col md:flex-row w-full justify-between gap-4 md:items-end border-b border-base-300 pb-4"
        >
          <h1
            class="font-delight font-bold text-4xl leading-6 w-full text-base-content"
          >
            SETTINGS
          </h1>
          <p
            class="text-base-content text-base md:text-lg leading-4 font-poppins whitespace-nowrap"
          >
            Manage your account settings
          </p>
          <div class="border-t border-base-300"></div>
        </div>
      </header>

      <!-- Subscription & Plan Details -->
      <section
        class="bg-base-200 rounded-3xl p-6 md:p-8 border-2 border-base-content shadow-lg flex flex-col gap-6"
      >
        <header class="flex flex-col md:flex-row gap-2 justify-between">
          <section class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="text-primary"
            >
              <path
                fill="#000"
                d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m0 14H4v-6h16zm0-10H4V6h16z"
              />
            </svg>
            <h2 class="font-poppins font-bold text-xl text-base-content">
              Subscription & Plan
            </h2>
          </section>

          <!-- Plan Badge & Status -->
          <div class="flex flex-wrap items-center gap-2">
            <div
              :class="[
                'px-4 py-2 rounded-full font-poppins font-bold text-xs md:text-sm flex items-center gap-2',
                currentPlan === 'free'
                  ? 'bg-base-content text-base-100'
                  : currentPlan === 'premium'
                  ? 'bg-primary text-primary-content'
                  : 'bg-secondary text-base-content',
              ]"
            >
              {{ planName }} Plan
            </div>
            <div
              :class="[
                'px-4 py-2 rounded-full text-xs md:text-sm font-semibold font-poppins',
                subscriptionStatus === 'active'
                  ? 'bg-green-500/20 text-green-700'
                  : 'bg-gray-500/20 text-gray-700',
              ]"
            >
              {{ subscriptionStatus === "active" ? "Active" : "Free Tier" }}
            </div>
          </div>
        </header>

        <!-- Plan Overview -->
        <div class="flex flex-col xl:flex-row gap-6 w-full">
          <section class="w-full flex flex-col gap-4">
            <!-- Flipbooks Usage -->
            <div
              class="bg-base-100 rounded-2xl p-4 border-2 border-base-content"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-semibold text-base-content"
                  >Flipbooks</span
                >
                <span class="text-sm text-base-content"
                  >{{ flipbooksCount }}/{{ maxFlipbooks }}</span
                >
              </div>
              <div class="w-full bg-base-300 rounded-full h-2">
                <div
                  :class="[
                    'h-2 rounded-full transition-all',
                    flipbooksUsagePercent >= 90
                      ? 'bg-red-500'
                      : flipbooksUsagePercent >= 70
                      ? 'bg-yellow-500'
                      : 'bg-primary',
                  ]"
                  :style="{ width: `${flipbooksUsagePercent}%` }"
                ></div>
              </div>
            </div>

            <!-- Plan Features -->
            <div
              class="bg-base-100 rounded-2xl p-4 border-2 border-base-content"
            >
              <h3
                class="font-poppins font-semibold text-sm mb-3 text-base-content"
              >
                Your Plan Includes:
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div
                  v-for="feature in currentPlanFeatures"
                  :key="feature"
                  class="flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    class="text-green-600 shrink-0 mt-0.5"
                  >
                    <path
                      fill="currentColor"
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                    />
                  </svg>
                  <span class="text-xs text-base-content/80">{{
                    feature
                  }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Billing & Actions -->
          <div class="w-full flex flex-col justify-between gap-4">
            <!-- Billing Info -->
            <div
              class="bg-base-100 rounded-2xl p-4 border-2 border-base-content space-y-3"
            >
              <h3 class="font-poppins font-semibold text-sm text-base-content">
                Billing Details
              </h3>

              <!-- Free Plan Message -->
              <div
                v-if="currentPlan === 'free'"
                class="flex items-start gap-2 text-base-content/80 text-xs"
              >
                <svg
                  class="pt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#000000"
                    d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
                  />
                </svg>
                <span
                  >You're currently on the free plan. Upgrade to access billing
                  features and premium benefits.</span
                >
              </div>

              <!-- Paid Plan Details -->
              <div v-else class="space-y-2">
                <div class="flex justify-between text-xs">
                  <span class="text-base-content/80">Amount:</span>
                  <span class="font-semibold text-base-content">{{
                    billingAmount
                  }}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-base-content/80">Cycle:</span>
                  <span class="font-semibold text-base-content">{{
                    billingCycle
                  }}</span>
                </div>
                <div
                  v-if="nextBillingDate"
                  class="flex justify-between text-xs"
                >
                  <span class="text-base-content/80">Next Billing:</span>
                  <span class="font-semibold text-base-content">{{
                    nextBillingDate
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <footer
              class="flex flex-col md:flex-row gap-2 justify-end items-end"
            >
              <!-- Manage Subscription (for paid users) -->
              <ActionButton
                v-if="subscriptionStatus === 'active' && currentPlan !== 'free'"
                type="secondary"
                text="Manage Subscription"
                @click="handleManageSubscription"
                :disabled="portalLoading"
                class="w-full xl:w-fit"
              >
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

              <!-- Upgrade Button (for free/standard users) -->
              <ActionButton
                v-if="currentPlan !== 'premium'"
                type="primary"
                :text="
                  currentPlan === 'free'
                    ? 'Upgrade to Standard'
                    : 'Upgrade to Premium'
                "
                @click="navigateToPricing"
                class="w-full xl:w-fit"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#000"
                      d="M21 24H11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2m0 4H11v-2h10zm7.707-13.707l-12-12a1 1 0 0 0-1.414 0l-12 12A1 1 0 0 0 4 16h5v4a2 2 0 0 0 2 2h10a2.003 2.003 0 0 0 2-2v-4h5a1 1 0 0 0 .707-1.707M21 14v6H11v-6H6.414L16 4.414L25.586 14z"
                    />
                  </svg>
                </template>
              </ActionButton>
            </footer>
          </div>
        </div>
      </section>

      <!-- Settings Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Profile Information -->
        <section
          class="bg-base-200 rounded-3xl p-6 md:p-8 border-2 border-base-content shadow-lg flex flex-col justify-between gap-y-6"
        >
          <section class="flex flex-col gap-6">
            <header class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="text-primary"
              >
                <g fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </g>
              </svg>
              <h2 class="font-poppins font-bold text-xl text-base-content">
                Profile Information
              </h2>
            </header>

            <div class="flex flex-col gap-4">
              <!-- Full Name -->
              <div class="flex flex-col gap-4">
                <fieldset class="fieldset p-0">
                  <legend
                    class="fieldset-legend pb-2 md:pb-4 !pt-0 font-poppins text-sm md:text-base md:leading-4 text-base-content"
                  >
                    <p>First Name</p>
                  </legend>
                  <label
                    class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content"
                  >
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
                      v-model="firstName"
                    />
                  </label>
                </fieldset>

                <fieldset class="fieldset p-0">
                  <legend
                    class="fieldset-legend pb-2 md:pb-4 !pt-0 font-poppins text-sm md:text-base md:leading-4 text-base-content"
                  >
                    <p>Last Name</p>
                  </legend>
                  <label
                    class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content"
                  >
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
                      v-model="lastName"
                    />
                  </label>
                </fieldset>
              </div>

              <!-- Email -->
              <div class="flex flex-col gap-2">
                <fieldset class="fieldset p-0">
                  <legend
                    class="fieldset-legend pb-2 md:pb-4 !pt-0 font-poppins text-sm md:text-base md:leading-4 text-base-content"
                  >
                    <p>Email</p>
                  </legend>
                  <label
                    class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content pointer-events-none cursor-not-allowed opacity-50"
                  >
                    <input
                      name="email"
                      type="text"
                      placeholder="Email"
                      class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
                      v-model="email"
                    />
                  </label>
                </fieldset>
                <p class="text-xs text-primary">Email cannot be changed</p>
              </div>

              <!-- Account Info -->
              <div class="bg-base-100 rounded-2xl p-4 space-y-2">
                <div class="flex justify-between">
                  <span class="text-xs text-base-content/80"
                    >Account Type:</span
                  >
                  <span class="text-xs font-semibold text-base-content">
                    {{
                      userProvider === "google"
                        ? "Google Account"
                        : "Email Account"
                    }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-xs text-base-content/80"
                    >Member Since:</span
                  >
                  <span class="text-xs font-semibold text-base-content">
                    {{ formatDate(userCreatedAt) }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- Save Button -->
          <ActionButton
            type="primary"
            :text="isUpdating ? 'Saving...' : 'Save Changes'"
            class="w-full md:w-1/2"
            @click="updateProfile"
            :disabled="!canSaveProfile || isUpdating"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z"
                />
              </svg> </template
          ></ActionButton>
        </section>

        <!-- Security -->
        <section
          class="bg-base-200 rounded-3xl p-6 md:p-8 border-2 border-base-content shadow-lg"
        >
          <header class="flex items-center gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="text-primary"
            >
              <g fill="none" stroke="currentColor" stroke-width="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </g>
            </svg>
            <h2 class="font-poppins font-bold text-xl text-base-content">
              Security
            </h2>
          </header>

          <div class="space-y-6">
            <!-- Password Change -->
            <div class="space-y-10">
              <div class="flex flex-col gap-4">
                <Input
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  placeholder="Current Password"
                  v-model:model-value="currentPassword"
                  :error-message="currentPasswordErrors"
                >
                  <template #icon>
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
                        <circle
                          cx="16.5"
                          cy="7.5"
                          r=".5"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </template>
                </Input>

                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                  placeholder="New Password"
                  v-model:model-value="newPassword"
                  :error-message="newPasswordErrors"
                >
                  <template #icon>
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
                        <circle
                          cx="16.5"
                          cy="7.5"
                          r=".5"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </template>
                </Input>

                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  v-model:model-value="confirmPassword"
                  :error-message="confirmPasswordErrors"
                >
                  <template #icon>
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
                        <circle
                          cx="16.5"
                          cy="7.5"
                          r=".5"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </template>
                </Input>
              </div>

              <ActionButton
                type="primary"
                :text="isChangingPassword ? 'Changing...' : 'Change Password'"
                @click="changePassword"
                class="w-full md:w-1/2"
                :disabled="!canChangePassword || isChangingPassword"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z"
                    />
                  </svg>
                </template>
              </ActionButton>
            </div>

            <div class="border-t border-base-300"></div>

            <!-- Sign Out -->
            <div class="flex flex-col gap-2">
              <h3 class="font-poppins font-semibold text-lg text-base-content">
                Account Actions
              </h3>

              <ActionButton
                type="confirmation"
                text="Sign Out"
                @click="signOut"
                class="w-full md:w-1/2"
                :disabled="isSigningOut"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      d="M4 12a1 1 0 0 0 1 1h7.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H5a1 1 0 0 0-1 1M17 2H7a3 3 0 0 0-3 3v3a1 1 0 0 0 2 0V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a1 1 0 0 0-2 0v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3"
                    />
                  </svg>
                </template>
              </ActionButton>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Toast } from "~/types";
import { createPasswordChangeSchema } from "~~/schema/form.schema";
import { useFlipbookStore } from "~/stores/useFlipbookStore";
import { useFileSize } from "~/composables/useFileSize";

definePageMeta({
  layout: "base",
  middleware: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const { showToast } = useToast();
const flipbookStore = useFlipbookStore();
const { formatFileSize, calculateTotalStorageSize } = useFileSize();
const { profile: userData } = useUserProfile();
const { redirectToCustomerPortal } = useStripe();

// Loading states
const isLoading = ref(true);
const isUpdating = ref(false);
const isChangingPassword = ref(false);
const isSigningOut = ref(false);
const portalLoading = ref(false);

// Statistics
const flipbooksCount = ref(0);
const totalViews = ref(100); // Placeholder
const storageUsed = ref("0 MB");
const totalStorageBytes = ref(0);

// Form data
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const createdAt = ref(""); // Store created_at separately since it's not in JWT

// Password change form validation
const validationSchema = createPasswordChangeSchema();
const { handleSubmit, errors, resetForm } = useForm({
  validationSchema,
});

const { value: currentPassword, errorMessage: currentPasswordErrors } =
  useField<string>("currentPassword");
const { value: newPassword, errorMessage: newPasswordErrors } =
  useField<string>("newPassword");
const { value: confirmPassword, errorMessage: confirmPasswordErrors } =
  useField<string>("confirmPassword");

// Computed properties
const userProvider = computed(
  () => user.value?.app_metadata?.provider || "email"
);
const userCreatedAt = computed(() => createdAt.value || "");

const canSaveProfile = computed(() => {
  return firstName.value.trim() && lastName.value.trim();
});

const canChangePassword = computed(() => {
  return (
    Object.keys(errors.value).length === 0 &&
    currentPassword.value &&
    newPassword.value &&
    confirmPassword.value
  );
});

// Subscription & Plan computed properties
const { currentPlan, subscriptionStatus, isFreePlan } = useSubscriptionPlan();

const planName = computed(() => {
  const plan = currentPlan.value;
  return plan.charAt(0).toUpperCase() + plan.slice(1);
});

const maxFlipbooks = computed(() => {
  if (currentPlan.value === "free") return 3;
  return 100; // Both standard and premium
});

const maxStorage = computed(() => {
  if (currentPlan.value === "free") return "5MB";
  if (currentPlan.value === "standard") return "30MB";
  return "50MB"; // Premium
});

const maxStorageBytes = computed(() => {
  if (currentPlan.value === "free") return 5 * 1024 * 1024; // 5MB
  if (currentPlan.value === "standard") return 30 * 1024 * 1024; // 30MB
  return 50 * 1024 * 1024; // 50MB
});

const flipbooksUsagePercent = computed(() => {
  const max = maxFlipbooks.value;
  return Math.min(Math.round((flipbooksCount.value / max) * 100), 100);
});

const storageUsagePercent = computed(() => {
  const max = maxStorageBytes.value;
  if (max === 0) return 0;
  return Math.min(Math.round((totalStorageBytes.value / max) * 100), 100);
});

const currentPlanFeatures = computed(() => {
  if (currentPlan.value === "free") {
    return [
      "Up to 3 flipbooks",
      "5MB per flipbook",
      "Watermark on flipbooks",
      "No analytics",
    ];
  }
  if (currentPlan.value === "standard") {
    return [
      "Up to 100 flipbooks",
      "30MB per flipbook",
      "No watermark",
      "Full analytics",
      "Full customization",
      "Cancel anytime",
    ];
  }
  return [
    "Up to 100 flipbooks",
    "50MB per flipbook",
    "No watermark",
    "Full analytics",
    "Annual billing discount",
    "Priority support",
  ];
});

const billingAmount = computed(() => {
  if (currentPlan.value === "standard") return "€5.99";
  if (currentPlan.value === "premium") return "€59.99";
  return "€0";
});

const billingCycle = computed(() => {
  if (currentPlan.value === "standard") return "Monthly";
  if (currentPlan.value === "premium") return "Yearly";
  return "Free";
});

const nextBillingDate = computed(() => {
  // This would come from Stripe subscription data in a real implementation
  // For now, returning placeholder
  if (currentPlan.value === "free") return null;
  const date = new Date();
  date.setMonth(date.getMonth() + (currentPlan.value === "premium" ? 12 : 1));
  return formatDate(date.toISOString());
});

// Methods
const formatDate = (dateString: string) => {
  if (!dateString) return "Unknown";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const loadUserData = async () => {
  try {
    isLoading.value = true;

    // Load full user data (including created_at which is not in JWT)
    const {
      data: { user: fullUser },
    } = await client.auth.getUser();

    // Load user profile data
    if (fullUser) {
      const userMetadata = fullUser.user_metadata;
      firstName.value = userMetadata?.firstName || "";
      lastName.value = userMetadata?.lastName || "";
      email.value = fullUser.email || "";
      createdAt.value = fullUser.created_at || "";
    }

    // Load flipbooks count
    const { data: flipbooksData } = await client
      .from("flipbooks")
      .select("id")
      .eq("user_id", user.value?.sub!);

    flipbooksCount.value = flipbooksData?.length || 0;

    // Calculate storage
    const { data: flipbooksWithSize } = await client
      .from("flipbooks")
      .select("pdf_file_size")
      .eq("user_id", user.value?.sub!);

    const totalSize = calculateTotalStorageSize(flipbooksWithSize || []);

    storageUsed.value = formatFileSize(totalSize);
    totalStorageBytes.value = totalSize;
  } catch (error) {
    console.error("Error loading user data:", error);
    showToast(Toast.ERROR, {
      toastTitle: "Error loading account data",
    });
  } finally {
    isLoading.value = false;
  }
};

const updateProfile = async () => {
  try {
    isUpdating.value = true;

    const { error } = await client.auth.updateUser({
      data: {
        firstName: firstName.value,
        lastName: lastName.value,
      },
    });

    if (error) {
      throw error;
    }

    // Refresh the user session to get updated metadata
    await client.auth.refreshSession();

    showToast(Toast.SUCCESS, {
      toastTitle: "Profile updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    showToast(Toast.ERROR, {
      toastTitle: "Failed to update profile",
      description: error.message,
    });
  } finally {
    isUpdating.value = false;
  }
};

const changePassword = handleSubmit(async () => {
  try {
    isChangingPassword.value = true;

    const { error } = await client.auth.updateUser({
      password: newPassword.value,
    });

    if (error) {
      throw error;
    }

    // Reset form with empty values to clear validation
    resetForm({
      values: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    });

    showToast(Toast.SUCCESS, {
      toastTitle: "Password changed successfully",
    });
  } catch (error: any) {
    console.error("Error changing password:", error);
    showToast(Toast.ERROR, {
      toastTitle: "Failed to change password",
      description: error.message,
    });
  } finally {
    isChangingPassword.value = false;
  }
});

const signOut = async () => {
  try {
    isSigningOut.value = true;
    flipbookStore.setSigningOut(true);

    const { error } = await client.auth.signOut();

    if (error) {
      throw error;
    }

    // Clear flipbook cache on logout
    flipbookStore.invalidateCache();

    await navigateTo({ name: "login" });
    // Keep isSigningOut true until navigation completes
  } catch (error: any) {
    console.error("Error signing out:", error);
    flipbookStore.setSigningOut(false);
    showToast(Toast.ERROR, {
      toastTitle: "Failed to sign out",
      description: error.message,
    });
  } finally {
    isSigningOut.value = false;
  }
};

const navigateToDashboard = () => {
  return navigateTo({ name: "dashboard" });
};

const navigateToPricing = () => {
  return navigateTo({ name: "pricing" });
};

const handleManageSubscription = async () => {
  if (!userData.value?.stripe_customer_id) {
    return;
  }

  portalLoading.value = true;

  try {
    await redirectToCustomerPortal(userData.value.stripe_customer_id);
  } catch (error: any) {
    console.error("Portal error:", error);
    showToast(Toast.ERROR, {
      toastTitle: "Failed to open subscription portal",
      description: error.message,
    });
    portalLoading.value = false;
  }
};

onMounted(async () => {
  await loadUserData();
});
</script>
