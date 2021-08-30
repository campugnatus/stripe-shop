<template>
  <!-- <div class="w-[425px] bg-gray-100 opacity-90 left-1/2 -translate-x-1/2 absolute h-[10000px] z-[-1]"></div> -->
  <!-- <div class="w-[320px] bg-white left-1/2 -translate-x-1/2 absolute h-[10000px] z-[-1]"></div> -->

  <svg id="gallery-svg" width="100%" height="5000px" class="absolute top-0 left-0">
    <path fill="none" stroke="orange" stroke-width="26" :d="d"/>
  </svg>

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
      <!-- <svg class="hidden md:block absolute bottom-[-2676px] left-[-612px]" width="1378" height="3822" viewBox="0 0 1378 3822" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 3770C299.527 3784.61 804.418 3806.83 991.627 3808C1108.63 3809.46 1107.37 3713.5 1112.74 3475C1120.79 3117.16 1112.74 2757.99 1112.74 2399.99H1364.96V1680.5H990.735V0" stroke="#EEAF0C" stroke-width="26"/>
      </svg> -->

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
        <div class="flex-grow"></div>
        <img src="/wiggly45.svg" class="ml-4 translate-y-[-500px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/wiggly90.svg" class="ml-4 translate-y-[-125px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/holey2.svg" class="ml-4 translate-y-[-550px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <img src="/twisted.svg" class="ml-4 translate-y-[-80px] object-none object-bottom w-[fit-content] h-[fit-content]">
        <div class="flex-grow"></div>
      </div>
   
      <div id="beacon-0" class="left-0 top-0 h-3 w-3 bg-red-500"></div>
      <div class="text-left flex-shrink-0 md:w-[384px] p-16 relative">
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
    <img src="/twisted.svg" class="mb-96 translate-y-[-180px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/holey2.svg" class="mb-96 translate-y-[-650px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/wiggly90.svg" class="mb-96 translate-y-[-225px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/wiggly45.svg" class="mb-96 translate-y-[-600px] object-none object-bottom w-[fit-content] h-[fit-content]">

    <img src="/wiggly1.svg" class="mr-auto mb-96 translate-y-[-250px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/dashed.svg" class="mb-96 translate-y-[-350px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/zigzaggy.svg" class="ml-auto mb-96 ml-0 translate-y-[-400px] object-none object-bottom w-[fit-content] h-[fit-content]">
        
    <img src="/curvy2.svg" class="hidden sm:block mr-auto mb-[500px] translate-y-[-80px] object-none object-bottom w-[fit-content] h-[fit-content]">
    <img src="/tie.svg" class="opacity-0 mr-auto mb-96 translate-y-[-20px] object-none object-bottom w-[fit-content] h-[fit-content]">

  </section>






  <section class="w-full mt-32 relative">
    <GalleryCarousel :initial="-2331" :height="250">
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
        <img src="/road.png" class="h-full py-10">
        <img src="/motorcycle.png" class="h-full py-10">
        <div class="flex-shrink-0  text-[32px] font-sigmar text-right flex justify-center items-center">
          <div>
            <div class="leading-[1] mb-6">unlimited <br> utility</div>
            <div class="leading-[1]">countless <br> applications</div>
          </div>
        </div>
        <div class="w-[26px] h-full relative">
          <div id="beacon-1" class="svg-beacon absolute top-0 left-1/2 h-0 w-0 bg-red-600"></div>
          <div id="beacon-2" class="svg-beacon absolute bottom-0 left-1/2 h-0 w-0 bg-red-600"></div>
        </div>
        <div class="hidden flex-shrink-0 text-2xl md:text-3xl px-2 md:px-10 font-pacifico flex justify-center items-center w-min">
          in construction
        </div>
        <img src="/house.png" class="h-full py-10">
        <img src="/shirt.png" class="h-full py-10">
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
        <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
    </GalleryCarousel>

    <GalleryCarousel :initial="-2718" :height="400">
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-red-200"></div>
      <img src="/test.png" class="h-full py-10">
      <img src="/rainbow.png" class="h-full py-10">
      <div class="w-[26px] h-full relative">
        <div id="beacon-3" class="svg-beacon absolute top-0 left-1/2 h-0 w-0 bg-red-600"></div>
        <div id="beacon-4" class="svg-beacon absolute bottom-0 left-1/2 h-0 w-0 bg-red-600"></div>
      </div>
      <div class="flex-shrink-0 text-2xl md:text-3xl px-8 md:px-10 font-pacifico flex justify-center items-center">
        thousands<br>
        of species<br>
        trust us<br>
        with their<br>
        camouflage
      </div>
      <img src="/fish.png" class="h-full py-10">
      <div class="hidden flex-shrink-0 text-2xl md:text-3xl px-2 md:px-10 font-pacifico flex justify-center items-center w-min">
        in music
      </div>
      <img src="/zebras.png" class="h-full py-10">
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] opacity-0 w-56 bg-blue-200"></div>
    </GalleryCarousel>

    <GalleryCarousel :initial="-1544" :height="300">
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-red-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-red-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-red-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-red-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-red-200"></div>
      <div class="flex-shrink-0 text-right text-2xl md:text-3xl px-2 md:px-10 font-pacifico flex justify-center items-center">
        most<br>
        countries<br>
        of the world<br>
        use our stripes<br>
        in their identics
      </div>
      <div class="w-[26px] h-full relative">
        <div id="beacon-5" class="svg-beacon absolute top-0 left-1/2 h-0 w-0 bg-red-600"></div>
        <div id="beacon-6" class="svg-beacon absolute bottom-0 left-1/2 h-0 w-0 bg-red-600"></div>
      </div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-blue-200"></div>
      <div class="flex-shrink-0 h-[calc(100%-5em)] w-56 bg-blue-200"></div>
    </GalleryCarousel>

    <div class="max-w-[320px] min-h-[400px] mx-auto relative flex items-center h-[400px]">
      <div id="beacon-7" class="absolute bottom-[380px] w-3 h-3 bg-red-300"></div>
      <div class="font-pacifico text-3xl leading-[1.7em] ml-20 -mt-10">
        Your<br>
        imagination<br>
        is the limit!
      </div>
    </div>
  </section>







  <section class="sm:hidden relative">

    <div class="font-pacifico text-3xl mt-16 text-center">
      All sorts, <span class="font-sigmar text-4xl inline-block rotate-6">any</span> kind
    </div>

    <div class="relative mt-10 w-[1920px] scale-90 origin-top-left h-[340px] translate-x-[-40px]">
      <img src="/squarebeads.svg"  class="absolute ">
      <img src="/stripy.svg" class="absolute -rotate-3 translate-y-[40px]">
      <img src="/rough.svg" class="absolute rotate-[3deg] translate-y-[60px]">
      <img src="/bricky2.svg" class="absolute translate-y-[203px] rotate-6">
      <img src="/thickbraid.svg" class="absolute translate-y-[210px] -rotate-3">
    </div>
    
    <div class="font-pacifico text-3xl text-center mt-">
      for <span class="font-sigmar text-4xl inline-block -rotate-6">any</span> kind of cause <span class="font-sigmar text-4xl rotate-6 inline-block">!</span>
    </div>

    <div class="relative w-[1920px] scale-[0.85] origin-top-left h-[400px] mt-10">
      <img src="/barky.svg" class="scale-[0.6] absolute translate-x-[-40%] rotate-[2deg]">
      <img src="/monobraid.svg" class="absolute scale-[0.45] translate-x-[-30%] translate-y-[60px] rotate-3">
      <img src="/kurva.svg" class="absolute scale-[0.6] rotate-[0deg] translate-x-[-30%] translate-y-[70px] rotate-[2deg]">
      <img src="/thickbraid.svg" class="absolute scale-x-[-1] translate-x-[10%] translate-y-[155px] rotate-[10deg]">
    </div>
  </section>







  <section class="hidden sm:block h-[746px] relative mt-32">

    <div class="font-pacifico text-3xl md:text-4xl lg:text-[42px] text-center">
      All sorts, any kind
    </div>

    <div class="relative left-1/2 top-[-30px] w-[1920px] scale-90 lg:scale-100 md:translate-x-[-20px] lg:translate-x-[30px] xl:translate-x-0">
      <img src="/rough.svg" class="absolute rotate-[3deg] translate-y-[-200px] translate-x-[-130%]">
      <img src="/thicktwisted.svg" class="absolute translate-x-[-170%] translate-y-[-40px] xl:translate-x-[-210%] xl:translate-y-[-60px]">
      <img src="/squarebeads.svg"  class="absolute translate-x-[-137%] translate-y-[30px]">
      <img src="/stripy.svg" class="absolute -rotate-3 translate-x-[-103%] translate-y-[80px]">
      <img src="/thickbraid.svg" class="absolute translate-x-[-120%] translate-y-[110px]">
      <img src="/bricky2.svg" class="absolute translate-x-[-127%] xl:translate-x-[-140%] translate-y-[180px] ">
    </div>
    
    <div class="font-pacifico text-3xl md:text-4xl lg:text-[42px] text-center mt-4 ml-4">
      for any kind of cause
    </div>

    <div class="relative left-1/2 top-[-90px] w-[1920px] scale-90 lg:scale-100 translate-y-[10px] lg:translate-y-0 translate-x-[-200px] lg:translate-x-[-30px] xl:translate-x-0">
      <img src="/thickbraid.svg" class="hidden md:block absolute scale-x-[-1] translate-x-[50%] lg:translate-x-[40%] translate-y-[130px] rotate-[5deg]">
      <img src="/kurva.svg" class="absolute scale-[0.6] rotate-0 translate-x-[-5%] translate-y-[5px]">
      <img src="/monobraid.svg" class="absolute scale-[0.45] translate-x-[-8%] translate-y-[-10px] rotate-3">
      <img src="/barky.svg" class="scale-[0.6] absolute translate-x-[-15%] translate-y-[-70px] rotate-[7deg]">
      <img src="/brushy.svg" class="absolute scale-[0.5] translate-x-[-10%] translate-y-[-230px] rotate-[16deg]">
    </div>
  </section>







  <section class="z-10 relative">
    <div class="hidden sm:block w-3 h-3 mx-auto">
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="1331" height="2173" viewBox="0 0 1331 2173" class="absolute translate-x-[-25%] translate-y-[-580px]">
        <path id="zhopka" stroke="#EEAF0C" stroke-width="26" d="m 429.5,2111.5 c 6,-9.5 40.5,-44 -173.5,35.5 C 42,2226.5 45.3142,1904.49 28.4988,1675.5 15.7841,1483 2.4906,792.561 28.4991,610.706 60.1535,389.374 805.998,509.706 574.999,126.206 496.2,-4.6125 1152.44,13.6705 1367.5,15"/>

        <text style="fill: currentColor;" class="font-pacifico text-4xl lg:text-[42px] translate-y-[-35px]">
            <textPath href="#zhopka" startOffset="55%" text-anchor="">
              See what our
            </textPath>
          </text>
        <text style="fill: currentColor;" class="font-pacifico text-4xl lg:text-[42px] translate-y-[50px] translate-x-[40px]">
            <textPath href="#zhopka" startOffset="59%" text-anchor="">
              customers have to say!
            </textPath>
        </text>
      </svg>
    </div>

    <div class="sm:hidden font-pacifico text-3xl mt-16 mb-16 mx-auto w-max">
      <div class="ml-6 rotate-3">
        See what <span class="inline-block rotate-[-9deg]">our</span>
      </div>
      <div class="font-sigmar text-center text-5xl -rotate-6">
        customers
      </div>
      <div class="text-right mr-6 -rotate-6">
        have to say!
      </div>      
    </div>

    <div class="max-w-[530px] p-4 sm:px-0 mx-auto">
      <div class="flex items-center gap-7 mb-4">
        <div class="rounded-full bg-gray-400 w-12 h-12"></div>
        <div class="text-xl font-sigmar">John Knopkins</div>
      </div>
      <div class="text-base sm:text-base text-justif">
        Uh... I'm really confused as to the purpose of this place? Do they sell... what? Digital images of stripes? Like, one stripe per image? I don't get it. Why the hell would you want to buy one of those? Are they supposed to be useful somehow? I dunno... This is really confusing.
      </div>
    </div>

    <div class="max-w-[530px] p-4 sm:px-0 mx-auto">
      <div class="flex items-center gap-7 mb-4">
        <div class="rounded-full bg-gray-400 w-12 h-12"></div>
        <div class="text-xl font-sigmar">Zoey</div>
      </div>
      <div class="text-base sm:text-base text-justif">
        Okay, so I actually went and bought one of the stripes. Arrived shortly, as promised. Feels oddly satisfying to have bought it, haha :D What the hell do I do with it now, though?
      </div>
    </div>

    <div class="h-[450px] max-w-screen-xl my-6 md:my-10 md:my-10 mx-auto">
      <div class="grid grid-cols-8 h-full relative">
        <img src="/wavy.svg" class="min-w-max scale-[0.75] md:scale-110 col-start-7 md:col-start-5 absolute left-[-50px] top-[250px] md:left-[-650px] md:top-[20px] rotate-[355deg] md:rotate-0">
        <img src="/ring_top.svg" class="min-w-max scale-[0.85] md:scale-100 col-start-5 absolute left-[-403px] top-[289px]">
        <img src="/ring_bottom.svg" class="min-w-max scale-[0.85] md:scale-100 col-start-5 absolute top-[282px] left-[-410px] z-[-10]">
        <img src="/infinite.svg" class="min-w-max scale-[0.85] md:scale-95 rotate-[-14deg] md:rotate-[-15deg] col-start-5 absolute top-[-20px] left-[-320px] md:left-[-310px] md:top-[0px]">
        <img src="/ribbon.svg" class="min-w-max scale-[0.85] md:scale-110 col-start-5 absolute left-[-135px] top-[95px] md:left-[-140px] md:top-[200px] rotate-[48deg] md:rotate-0">
        <img src="/littlespiral.svg" class="min-w-max scale-[0.75] md:scale-100 col-start-6 absolute -rotate-6 top-[-48px] left-[-90px] rotate-[-10deg] md:rotate-0">
        <img src="/knot.svg" class="min-w-max scale-[0.9] md:scale-100 col-start-6 md:col-start-6 absolute left-[-330px] top-[190px] md:left-[-10px] md:top-[280px] rotate-[-14deg] rotate-[-9deg]">
        <img src="/longspiral.svg" class="min-w-max scale-[0.75] md:scale-110 col-start-7 md:col-start-6 absolute left-[18px] top-[-220px] md:left-[167px] md:top-[-390px] rotate-6">
        <img src="/spiral.svg" class="min-w-max scale-[0.75] md:scale-110 col-start-6 md:col-start-7 absolute left-[-113px] top-[225px] md:left-[80px] md:top-[200px]">
      </div>
    </div>

    <div class="max-w-[530px] p-4 sm:px-0 mx-auto">
      <div class="flex items-center gap-7 mb-4">
        <div class="rounded-full bg-gray-400 w-12 h-12"></div>
        <div class="text-xl font-sigmar">Aristarkh Borodulko</div>
      </div>
      <div class="text-base sm:text-base text-justif">
        Can you imagine spending the effort to make something as useless at this thing... and to such level of polish? I mean, don't you have anything better to do with your life? I guess I'll go buy something... out of pity.
      </div>
    </div>

    <div class="max-w-[530px] p-4 sm:px-0 mx-auto">
      <div class="flex items-center gap-7 mb-4">
        <div class="rounded-full bg-gray-400 w-12 h-12"></div>
        <div class="text-xl font-sigmar">Petunya</div>
      </div>
      <div class="text-base sm:text-base text-justif">
        Finally, a shop for an avid stripe lover such as myself! I used to buy stripy patterns from stocks and then meticulously extract individual stripes from there... such an arduous task, I'll tell ya! Now I can buy stripes separately, no more overpaying for the ones I don't need!
      </div>
    </div>
  </section>






  <section class="mx-auto max-w-screen-xl ">
    <h1 class="pl-8 sm:pl-16 mt-[185px] max-w-[530px] mx-auto">
      <div class="font-pacifico text-5xl">Also,</div>
      <div class="font-sigmar text-[77px] origin-left rotate-[-10deg] md:rotate-[-16deg] ml-9 mt-2">SA<span class="text-orange">L</span>E!</div>
    </h1>

    <h2 class="text-4xl mt-8 m-6 mb-2 font-sigmar -rotate-6 origin-left">-50%</h2>
    <Carousel class=""/>

    <h2 class="text-4xl m-6 mt-24 mb-2 font-sigmar -rotate-6 origin-left">-25%</h2>
    <Carousel class=""/>

    <h2 class="text-4xl m-6 mt-24 mb-2 font-sigmar -rotate-6 origin-left">Limited offer!</h2>
    <Carousel class=""/>
  </section>







  <section class="flex justify-center">
    <div class="my-40">
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
import GalleryCarousel from './components/GalleryCarousel.vue'

import {ref, onMounted, computed} from 'vue';

var beacons = ref(0);

// SVG path's d attribute value
var d = ref("M0 0");

onMounted(() => {
  animateSVG();
})


function animateSVG() {
  let gallerySVG = document.getElementById("gallery-svg");
  let rectSVG = gallerySVG.getBoundingClientRect();

  beacons.value = [0, 1, 2, 3, 4, 5, 6, 7]
    .map(i => "beacon-"+i)
    .map(id => document.getElementById(id))
    .map(el => el.getBoundingClientRect())
    .map(rect => {
      return {
        x: rect.x - rectSVG.x,
        y: rect.y - rectSVG.y
      }
    });
  
  let p = beacons.value; // just for shortness
  d.value = `M${p[0].x} ${p[0].y} V${p[1].y} H${p[1].x} L${p[2].x} ${p[2].y} H${p[3].x} V${p[4].y} H${p[5].x} V${p[6].y} H${p[7].x} V${p[7].y} 
c1.109,59.37,1.048,0.46,0,47c3.417,253.24,-4.107,334.46,-121.108,333c-187.208,-1.17,-692.09969,-23.39,-990.627,-38`;

  window.requestAnimationFrame(animateSVG); // loopь
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
