<template>
  <div class="absolute left-0 top-0 text-lg font-bold">
    <span></span>
  </div>

  <header class="w-full h-screen max-h-[1000px] relative shadow-2xl border-b relative border-gray-400">
    <!-- background image -->
    <div class="absolute overflow-hidden inset-0">
      <img src="/bds2.png" class="max-w-none absolute right-0 h-4/5 top-[40%] lg:top-[20%] lg:h-full 2xl:h-[120%] 2xl:top-0">
    </div>

    <div class="absolute font-pacifico text-4xl rotate-[-31deg] text-white top-[400px] right-[50px] xl:top-[480px] xl:right-[250px]">
      Your go-to place to shop for stripes
    </div>

    <main class="max-w-screen-xl h-full mx-auto relative">
      <!-- the long stripe -->
      <svg class="hidden md:block absolute bottom-[-2676px] left-[-612px]" width="1378" height="3822" viewBox="0 0 1378 3822" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 3770C299.527 3784.61 804.418 3806.83 991.627 3808C1108.63 3809.46 1107.37 3713.5 1112.74 3475C1120.79 3117.16 1112.74 2757.99 1112.74 2399.99H1364.96V1680.5H990.735V0" stroke="#EEAF0C" stroke-width="26"/>
      </svg>

      <nav class="flex justify-between p-16">
        <section class="">
          
        </section>
        <section class="space-x-7">
          <button class="p-2">
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div class="pt-2">search</div>
          </button>
          <button class="p-2">
            <div class="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>            </div>
            <div class="pt-2">log in</div>
          </button>
          <button class="p-2">
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="pt-2">0 items</div>
          </button>
        </section>
      </nav>

      <!-- logo -->
      <div class="text-left mx-auto md:ml-[151px] mt-6 relative z-0 w-[400px]">
        <div class="font-pacifico text-[28px] mb-1">Welcome to the</div>
        <div class="leading-[78px]">
          <div class="font-sigmar text-[72px] tracking-[0.185em]">
            STR
            <span class="inline-block mx-[-0.4em] md:opacity-0">
              I
            </span>
            PE
          </div>
          <div class="font-sigmar text-[108px] tracking-[0.075em] relative z-20">SH<span class="">O</span>P</div>
        </div>
      </div>
    </main>
  </header>







  <section class="grid h-[434px] md:h-[534px] overflow-hidden justify-center shadow-xl md:shadow-none" style="grid-template-columns: 1fr minmax(0, 1280px) 1fr;">
    <aside class="hidden 2xl:flex col-start-1 flex-grow justify-center gap-5">
        <img src="/notch.svg" class="translate-y-[-50px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/tie.svg" class="translate-y-[-0px] object-none object-bottom w-[fit-content] h-[fit-content]">
    </aside>

    <main class="flex w-full col-start-2 justify-around md:justify-start xl:w-[1280px] --gap-10 md:--gap-7">
      <div class="hidden md:flex h-[533px] overflow-hidden flex-shrink-0 md:w-[384px] justify-center gap-3">
        <img src="/wiggly45.svg" class="ml-4 translate-y-[-500px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/wiggly90.svg" class="ml-4 translate-y-[-125px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/holey2.svg" class="ml-4 translate-y-[-550px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/twisted.svg" class="ml-4 translate-y-[-80px] object-none object-bottom w-[fit-content] h-[fit-content]">
      </div>
   
      <div class="text-left flex-shrink-0 md:w-[384px] p-16">
        <div class="w-max mx-auto">
          <div class="font-pacifico text-4xl mb-4">Only 100%</div>
          <div class="font-pressstart text-4xl mb-3">digital</div>
          <div class="font-pacifico text-4xl">stripes!</div>

          <ul class="text-xl mt-8 list-disc ml-4">
            <li>pure vector <b>.SVG</b></li>
            <li>delivered by email</li>
            <li>in a .zip <a href="#">archive</a></li>
            <li><b>seconds</b> after the purchase</li>
          </ul>
        </div>
      </div>

      <div class="flex -translate-y-32 md:translate-y-0 md:ml-12 md:flex gap-3 flex-wrap overflow-hidden justify-between md:justify-start">
        <!-- dummy element so that the next one is able to wrap -->
        <div class="w-0 h-full mb-[800px]"></div> 

        <img src="/holey.svg" class="mb-[500px] mr-4 translate-y-[-100px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/tapered.svg" class="mb-[500px] mr-4 translate-y-[-0px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/zebra.svg" class="mb-[500px] mr-4 translate-y-[-300px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/braid.svg" class="mb-[500px] mr-4 translate-y-[-200px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/curvy2.svg" class="hidden md:block mb-[500px] mr-4 ml-16 translate-y-[-30px] object-none object-bottom w-[fit-content] h-[fit-content]">
      </div>
    </main>

    <aside class="hidden 2xl:flex col-start-3 flex-grow justify-center gap-5">
        <img src="/zigzaggy.svg" class="translate-y-[-300px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/dashed.svg" class="translate-y-[-250px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/wiggly1.svg" class="translate-y-[-200px] object-none object-bottom w-[fit-content] h-[fit-content]">
    </aside>
  </section>

  <section class="flex flex-row-reverse px-6 md:hidden overflow-hidden justify-around sm:justify-start gap-6 flex-wrap h-[450px]">
    <!-- <img src="/notch.svg" class="mx-2 mb-[500px] translate-y-[-50px] object-none object-bottom w-[fit-content] h-[fit-content]"> -->
    <img src="/twisted.svg" class="mb-96 translate-y-[-80px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/holey2.svg" class="mb-96 translate-y-[-550px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/wiggly90.svg" class="mb-96 translate-y-[-125px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/wiggly45.svg" class="mb-96 translate-y-[-500px] object-none object-bottom w-[fit-content] h-[fit-content]">

    <img src="/wiggly1.svg" class="mr-auto mb-96 translate-y-[-200px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/dashed.svg" class="mb-96 translate-y-[-250px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/zigzaggy.svg" class="ml-auto mb-96 ml-0 translate-y-[-300px] object-none object-bottom w-[fit-content] h-[fit-content]">
        
    <img src="/curvy2.svg" class="hidden sm:block mr-auto mb-[500px] translate-y-[-30px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/tie.svg" class="mr-auto mb-96 translate-y-[-20px] object-none object-bottom w-[fit-content] h-[fit-content]">

  </section>







  <section class="max-w-screen-xl h-[2140px] mx-auto relative">
    <div class="grid" style="grid-template-columns: repeat(4, 256px);
                             grid-template-rows: repeat(4, 360px);
                             grid-auto-columns: auto;">
      <div class="row-start-1 col-start-2 col-end-4 text-[36px] font-sigmar text-right mt-4 flex justify-center items-center">
        <div>
          <div class="leading-[1] mb-6">unlimited <br> utility</div>
          <div class="leading-[1]">countless <br> applications</div>
        </div>
      </div>
      <img class="hidden lg:block p-10 xl:pr-0 row-start-1 row-span-1 col-start-4 col-span-1 h-full" src="/motorcycle.png">
      <img class="p-10 lg:pl-32 lg:pt-0 row-start-2 col-start-2 lg:col-start-1 col-span-2 lg:col-span-3 h-full w-full object-cover" src="/shirt.png">
      <img class="p-10 row-start-3 lg:row-start-2 col-start-3 lg:col-start-4 col-span-2 h-full object-cover object-right" src="/zebras.png">
      <img class="p-10 row-start-3 col-start-1 lg:col-start-3 col-span-2 object-cover object-bottom h-full w-full" src="/house.png">
      <img class="col-start-1 lg:row-start-4 lg:col-start-4 p-10 xl:row-start-3 xl:col-start-5 col-span-1 object-cover object-bottom h-full w-full" src="/road.png">
      <img class="p-10 pr-0 row-start-4 col-start-3 col-span-1 object-cover h-full w-full" src="/test.png">
      <img class="p-10 row-start-2 col-span-1 lg:pb-24 lg:ml-auto lg:row-start-3 col-start-1 lg:col-span-2 lg:w-2/3 object-cover h-full" src="/rainbow.png">
      <img class="p-10 pt-0 row-start-4 row-end-6 col-start-1 col-span-2 object-cover h-full w-full" src="/fish.png">
      <div class="p-10 text-left row-start-6 row-span-1 font-pacifico text-[36px] col-start-3">
        Your <br>
        imaginatioin <br>
        is the limit!
      </div>
    </div>
  </section>







  <section class="h-[746px] relative">
    <div class="relative left-1/2 top-0 bg-red-200 w-[1920px]">
      <div class="absolute h-3 w-3 top-0 left-0 rounded-full bg-red-400"></div>

      <img src="/rough.svg" class="absolute rotate-[3deg] translate-y-[-195px] translate-x-[-130%]">
      <img src="/thicktwisted.svg" class="absolute translate-x-[-210%] translate-y-[-60px]">
      <img src="/squarebeads.svg"  class="absolute translate-x-[-130%] translate-y-[30px]">
      <img src="/stripy.svg" class="absolute translate-x-[-103%] translate-y-[90px]">
      <img src="/thickbraid.svg" class="absolute translate-x-[-120%] translate-y-[110px]">
      <img src="/bricky2.svg" class="absolute translate-x-[-140%] translate-y-[180px] ">

      <img src="/thickbraid.svg" class="absolute scale-x-[-1] translate-x-[40%] translate-y-[130px] rotate-[5deg]">
      <img src="/kurva.svg" class="absolute translate-x-[-5%] translate-y-[5px] scale-[0.6]">
      <img src="/monobraid.svg" class="absolute translate-x-[-8%] translate-y-[-10px] scale-[0.45] rotate-3">
      <img src="/barky.svg" class="absolute translate-x-[-15%] translate-y-[-70px] scale-[0.6] rotate-[7deg]">
      <img src="/brushy.svg" class="absolute translate-x-[-10%] translate-y-[-230px] scale-[0.5] rotate-[16deg]">
    </div>

    <div class="font-pacifico text-[42px] mt-28 text-center">
      All sorts, any kind, <br>
      for any kind of cause
    </div>
  </section>







  <section class=" h-[1400px] z-10 relative">
    <div class="absolute w-3 h-3 top-0 left-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" width="1368" height="2118" fill="none" class="translate-x-[-25%] translate-y-[-620px]">
        <path id="zhopka" d="M248.428 2115.09c-31-182.5-203.6861-211-220.5015-440-12.7147-192.5-26.0082-882.938.0003-1064.792 31.6545-221.332 777.4992-101.001 546.4992-484.5C495.628-5.0209 1151.87 13.2621 1366.93 14.5915" stroke="#EEAF0C" stroke-width="26"/>

        <text style="fill: currentColor;" class="font-pacifico text-[42px] translate-y-[-35px]">
            <textPath href="#zhopka" startOffset="51%" text-anchor="">
              See what our
            </textPath>
          </text>
        <text style="fill: currentColor;" class="font-pacifico text-[42px] translate-y-[50px] translate-x-[40px]">
            <textPath href="#zhopka" startOffset="54%" text-anchor="">
              customers have to say!
            </textPath>
        </text>
      </svg>
    </div>

    <div class="w-[530px]  mx-auto mb-8 mt-8">
      <div class="flex items-center gap-6">
        <div class="rounded-full bg-gray-400 w-12 h-12"></div>
        <div class="text-xl">John Knopkins</div>
      </div>
      <div class="ml-[73px] text-left">
        This is not a bad stripe per se, just not really my cup of tea. Too plain for my taste. I hoped it would give it this solid serious kinda look, but in the hindsight I can say that it needs something else to play off of. Bit boring on it own, if I’m honest.
      </div>
    </div>    
    <div class="w-[530px]  mx-auto mb-8 mt-8">
      <div class="flex items-center gap-6">
        <div class="rounded-full bg-gray-400 w-12 h-12"></div>
        <div class="text-xl">John Knopkins</div>
      </div>
      <div class="ml-[73px] text-left">
        This is not a bad stripe per se, just not really my cup of tea. Too plain for my taste. I hoped it would give it this solid serious kinda look, but in the hindsight I can say that it needs something else to play off of. Bit boring on it own, if I’m honest.
      </div>
    </div> 

    <div class="h-[450px] max-w-screen-xl  mx-auto">
      <div class="grid grid-cols-8 h-full relative">
        <img src="/wavy.svg" class="col-start-5 absolute left-[-660px] top-[70px]">
        <img src="/ring_top.svg" class="col-start-5 absolute top-[289px] left-[-403px]">
        <img src="/ring_bottom.svg" class="col-start-5 absolute top-[282px] left-[-410px] z-[-1]">
        <img src="/infinite.svg" class="col-start-5 absolute top-[] left-[-300px]">
        <img src="/ribbon.svg" class="col-start-5 absolute left-[-140px] top-[200px]">
        <img src="/littlespiral.svg" class="col-start-6 absolute -rotate-6 top-[] left-[-60px]">
        <img src="/knot.svg" class="col-start-6 absolute top-[280px] left-[5px] -rotate-6">
        <img src="/longspiral.svg" class="col-start-6 absolute left-[177px] top-[-330px]">
        <img src="/spiral.svg" class="col-start-7 absolute left-[100px] top-[230px]">
      </div>
    </div>

    <div class="w-[530px]  mx-auto mb-8 mt-8">
      <div class="flex items-center gap-6">
        <div class="rounded-full bg-gray-400 w-12 h-12"></div>
        <div class="text-xl">John Knopkins</div>
      </div>
      <div class="ml-[73px] text-left">
        This is not a bad stripe per se, just not really my cup of tea. Too plain for my taste. I hoped it would give it this solid serious kinda look, but in the hindsight I can say that it needs something else to play off of. Bit boring on it own, if I’m honest.
      </div>
    </div>   
    <div class="w-[530px]  mx-auto mb-8 mt-8">
      <div class="flex items-center gap-6">
        <div class="rounded-full bg-gray-400 w-12 h-12"></div>
        <div class="text-xl">John Knopkins</div>
      </div>
      <div class="ml-[73px] text-left">
        This is not a bad stripe per se, just not really my cup of tea. Too plain for my taste. I hoped it would give it this solid serious kinda look, but in the hindsight I can say that it needs something else to play off of. Bit boring on it own, if I’m honest.
      </div>
    </div>
  </section>






  <section class="mx-auto max-w-screen-xl ">
    <h1 class="ml-[calc(50%-271px)] mt-[10px]">
      <div class="font-pacifico text-5xl">Also,</div>
      <div class="font-sigmar text-[77px] origin-left rotate-[-10deg] ml-9 mt-2">SA<span class="text-orange">L</span>E!</div>
    </h1>

    <h2 class="text-4xl m-6 font-sigmar -rotate-6 origin-left">-50% off</h2>
    <Carousel class=""/>

    <h2 class="text-4xl m-6 mt-24 font-sigmar -rotate-6 origin-left">-25% off</h2>
    <Carousel class=""/>

    <h2 class="text-4xl m-6 mt-24 font-sigmar -rotate-6 origin-left">Limited offer!</h2>
    <Carousel class=""/>
  </section>







  <section class="flex justify-center">
    <div class="m-40">
      <div class="font-sigmar text-2xl">our motto</div>
      <div class="font-pacifico text-2xl">&mdash; Are you gonna buy something?</div>
      <div class="font-pacifico text-2xl">&mdash; Nah, I'm just browsing</div>
    </div>
  </section>





  <footer class="bg-gray-50 h-[700px] relative">
    <button class="w-24 h-24 rounded-full border-4 border-white flex justify-center items-center absolute right-1/4 -top-12 bg-gray-100 hover:bg-gray-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </footer>

</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import WareCard from './components/WareCard.vue'
import Carousel from './components/Carousel.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md

function zhopa () {
  window.alert('zhopa')
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}

.multiline-ellipsis {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
