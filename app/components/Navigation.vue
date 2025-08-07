<template>
  <section class="container mx-auto py-6">
    <div class="navbar p-0">
      <div class="navbar-start flex flex-row justify-between w-full">
        <a class="font-poppins font-bold text-5xl text-base-content"
          >Flipture.</a
        >
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost lg:hidden py-4 px-2 border border-base-content rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-lg dropdown-content bg-white border border-base-300 shadow-md rounded-box z-1 mt-2 w-52 p-2 drop-shadow-md font-poppins font-bold text-sm"
          >
            <li>
              <NuxtLink
                class="hover:text-primary hover:cursor-pointer text-base-content"
                to="/"
                >Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:text-primary hover:cursor-pointer text-base-content"
                >Features</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:text-primary hover:cursor-pointer text-base-content"
                >Pricing</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:text-primary hover:cursor-pointer text-base-content"
                >FAQs</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:text-primary hover:cursor-pointer text-base-content"
                >Contact</NuxtLink
              >
            </li>
            <li class="mt-4">
              <button
                class="w-full py-2 px-4 md:px-10 text-center justify-center items-center bg-primary rounded-full text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-bold text-sm md:text-lg"
              >
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 font-poppins font-bold text-base">
          <li>
            <NuxtLink
              class="hover:text-primary hover:cursor-pointer text-base-content hover:bg-transparent"
              to="/"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-primary hover:cursor-pointer text-base-content hover:bg-transparent"
              >Features</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-primary hover:cursor-pointer text-base-content hover:bg-transparent"
              >Pricing</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-primary hover:cursor-pointer text-base-content hover:bg-transparent"
              >FAQs</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-primary hover:cursor-pointer text-base-content hover:bg-transparent"
              >Contact</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div class="navbar-end hidden lg:flex">
        <button
          class="w-fit py-3 px-6 md:px-10 bg-primary rounded-full text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-bold text-sm md:text-lg"
        >
          Sign In
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup></script>
