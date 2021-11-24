<template>
  <header class="hidden lg:flex px-6 lg:px-8 container max-w-screen-xl mx-auto mt-14 items-center">
    <!-- logo -->
    <router-link to="/" class="font-sigmar">
      <div class="text-4xl tracking-[6px] mb-[-4px]">
        STRIPE
      </div>
      <div class="text-5xl tracking-[10px]">
        SHOP
      </div>
    </router-link>

    <div class="flex flex-col justify-between ml-10 xl:ml-20 flex-shrink-0 font-roboto">
      <a class="" href="#">shipping</a>
      <a class="" href="#">about</a>
      <a class="" href="#">third one</a>
    </div>

    <div class="mx-16 xl:mx-32 flex-grow flex items-center">
      <div class="relative w-full">
        <input type="text" name="search" placeholder="Search for stripes" class="text-lg border border-gray-300 rounded-full p-2 pl-5 pr-14 w-full focus:outline-none focus:border-gray-600">
        <div class="absolute right-0 inset-y-0 mr-4 h-full flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="scale-x-[-1] text-gray-400 h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="space-x-7 flex flex-shrink-0">
      <button class="lg:p-2 text-sm lg:text-base hidden sm:inline">
        <div class="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-11 lg:w-11 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>            </div>
        <div class="pt-2">Log in</div>
      </button>
      <router-link class="lg:p-2 text-sm lg:text-base" to="/cart">
        <div class="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-11 lg:w-11 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div class="pt-2">0 items</div>
      </router-link>
    </div>
  </header>

  <header class="lg:hidden px-4 sm:px-6 max-w-screen-lg mx-auto mt-6">
    <div class="flex justify-between items-center">
      <router-link to="/" class="font-sigmar">
        <div class="text-3xl tracking-[5px] mb-[-8px]">
          STRIPE
        </div>
        <div class="text-4xl tracking-[10px]">
          SHOP
        </div>
      </router-link>

      <div class="flex">
        <button class="text-sm mr-5">
          <div class="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-11 lg:w-11 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>            </div>
          <div class="pt-2">Log in</div>
        </button>
        <router-link class="text-sm" to="/cart">
          <div class="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-11 lg:w-11 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="pt-2">0 items</div>
        </router-link>
      </div>

      <div class="hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
    </div>
    <div class="mt-3 space-x-7">
      <a class="font-roboto leading-snug text-" href="#">shipping </a>
      <a class="font-roboto leading-snug text-" href="#">about </a>
      <a class="font-roboto leading-snug text-" href="#">third one</a>
    </div>
    <div class="w-full mt-4">
      <div class="relative w-full">
        <input type="text" name="search" placeholder="Search for stripes" class="border border-gray-300 rounded-full p-2 pl-5 pr-14 w-full focus:outline-none focus:border-gray-600">
        <div class="absolute right-0 inset-y-0 mr-4 h-full flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="scale-x-[-1] text-gray-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style>
</style>