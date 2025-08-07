<template>
  <section>
    <div class="navbar p-0">
      <div class="navbar-start flex flex-row gap-x-2">
        <div class="dropdown">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost lg:hidden py-4 px-2 border border-black rounded-full"
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
            class="menu menu-lg dropdown-content bg-white border rounded-box z-1 mt-2 w-52 p-2 drop-shadow-2xl font-poppins font-bold text-sm"
          >
            <li>
              <NuxtLink
                class="hover:text-[#0046FF] hover:cursor-pointer text-black"
                to="/"
                >Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:text-[#0046FF] hover:cursor-pointer text-black"
                >Features</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:text-[#0046FF] hover:cursor-pointer text-black"
                >Pricing</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:text-[#0046FF] hover:cursor-pointer text-black"
                >FAQs</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="hover:text-[#0046FF] hover:cursor-pointer text-black"
                >Contact</NuxtLink
              >
            </li>
          </ul>
        </div>
        <a class="font-poppins font-bold text-5xl text-black">Flipture.</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 font-poppins font-bold text-base">
          <li>
            <NuxtLink
              class="hover:text-[#0046FF] hover:cursor-pointer text-black"
              to="/"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-[#0046FF] hover:cursor-pointer text-black"
              >Features</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-[#0046FF] hover:cursor-pointer text-black"
              >Pricing</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-[#0046FF] hover:cursor-pointer text-black"
              >FAQs</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-[#0046FF] hover:cursor-pointer text-black"
              >Contact</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <button
          class="w-fit py-3 px-6 md:px-10 bg-[#0046FF] rounded-full text-white hover:cursor-pointer hover:bg-white hover:border hover:border-black hover:text-black font-poppins font-bold text-sm md:text-lg"
        >
          Sign In
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup></script>
