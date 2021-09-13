<template>
  <!-- the long stripe -->
  <svg id="gallery-svg" width="100%" height="5000px" class="hidden sm:block absolute top-0 left-0">
    <path fill="none" stroke="#EEAF0C" stroke-width="23" :d="d"/>
  </svg>

  <header class="w-full h-[calc(100vh-50px)] max-h-[1000px] overflow-hidden relative shadow-2xl border-b relative border-gray-400">

    <div class="absolute overflow-hidden inset-0">
      <img src="/bds2.png" class="max-w-none absolute right-0 h-[480px] md:h-[640px] xl:h-[920px] top-[calc(44%+60px)] sm:top-[calc(44%+50px)] md:top-[calc(44%+20px)] lg:top-[calc(44%-150px)] xl:top-[calc(44%-270px)] 2xl:top-[calc(44%-360px)]">
    </div>

    <div class="absolute font-pacifico text-2xl sm:text-3xl xl:text-4xl rotate-[-31deg] text-white
                top-[calc(44%+200px)] right-[0px]
                sm:top-[calc(44%+260px)] sm:right-[80px]
                md:top-[calc(44%+270px)] md:right-[130px]
                lg:top-[calc(44%+180px)] lg:right-[160px]
                xl:top-[calc(44%+170px)] xl:right-[200px]
                2xl:top-[calc(44%+130px)] 2xl:right-[280px]">
      Your go-to place to shop for stripes
    </div>

    <main class="max-w-screen-xl h-full mx-auto relative flex flex-col">
      <nav class="absolute w-full right-0 grid grid-cols-2 p-10 sm:p-16 z-10">
        <section class="sm:pl-12 lg:pl-24 flex flex-col justify-center items-start">
          <a class="hidden sm:inline uppercase">catalogue</a>
          <a class="hidden sm:inline uppercase">about</a>
          <a class="hidden sm:inline uppercase">third one</a>
          <button class="sm:hidden text-sm">
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-11 lg:w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <div class="pt-2">menu</div>
          </button>
        </section>
        <section class="space-x-7 text-right">
          <button class="lg:p-2 text-sm lg:text-base hidden sm:inline">
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-11 lg:w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div class="pt-2">search</div>
          </button>
          <button class="lg:p-2 text-sm lg:text-base hidden sm:inline">
            <div class="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-11 lg:w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>            </div>
            <div class="pt-2">log in</div>
          </button>
          <button class="lg:p-2 text-sm lg:text-base">
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-11 lg:w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="pt-2">0 items</div>
          </button>
        </section>
      </nav>

      <!-- logo -->
      <div class="flex-grow relative">
        <div class="text-left absolute left-[50%] translate-x-[-50%] lg:left-0 lg:translate-x-0 lg:ml-[151px] translate-y-[-50%] top-[44%] w-max">
          <div class="font-pacifico text-2xl sm:text-[30px] mb-1">Welcome to the</div>
          <div class="leading-[64px] sm:leading-[88px]">
            <div class="font-sigmar text-6xl sm:text-[78px] tracking-[0.185em]">
              STR
              <span class="inline-block mx-[-0.4em] text-transparent relative">
                <div class="absolute bg-orange w-[22px] sm:w-[26px] h-[500px] bottom-[5px] left-[3px] sm:left-[5px]">
                </div>
                <div class="absolute rotate-45 bg-white w-[26px] h-[26px] bottom-[-14px] left-[1px] sm:left-[5px]"></div>
                I
              </span>
              PE
            </div>
            <div class="font-sigmar text-[90px] sm:text-[118px] tracking-[0.075em] relative z-20">SH<span class="">O</span>P</div>
          </div>
        </div>
      </div>
    </main>
  </header>


  <section class="grid overflow-hidden pb-10 sm:pb-0 shadow-2xl sm:shadow-none sm:mx-6 sm:h-[460px] grid-cols-ohoho lg:grid-cols-muahaha">
    <div class="hidden lg:flex flex-row-reverse flex-wrap justify-start">
      <img src="/tapered.svg" class="ml-3 mr-auto mb-96 translate-y-[-0px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/twisted.svg" class="mx-3 translate-y-[-100px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/holey2.svg" class="mr-3 ml-6 translate-y-[-666px] object-none object-bottom w-[fit-content] h-[fit-content]">
      
      <img src="/wiggly90.svg" class="mr-auto translate-y-[-125px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/wiggly45.svg" class="ml-6 mr-6 translate-y-[-500px] object-none object-bottom w-[fit-content] h-[fit-content]">
      
      <img src="/tie.svg" class="mr-auto translate-y-[-0px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/notch.svg" class="mr-6 ml-auto translate-y-[-50px] object-none object-bottom w-[fit-content] h-[fit-content]">
    </div>

    <div class="col-start-1 lg:col-start-2 text-left flex-shrink-0 pt-8 sm:pt-16 mx-8 lg:mx-16 relative">
      <div class="w-max mx-auto">
        <div class="font-pacifico text-3xl xl:text-4xl mb-3 xl:mb-4">Only 100%</div>
        <div class="font-pressstart text-3xl xl:text-4xl mb-2 xl:mb-3">digital</div>
        <div class="font-pacifico text-3xl xl:text-4xl">stripes!</div>

        <ul class="text-lg xl:text-xl mt-6 xl:mt-8 list-disc ml-4">
          <li>pure vector <b>.SVG</b></li>
          <li>delivered by email</li>
          <li>in a .zip archive</li>
          <li><b>seconds</b> after the purchase</li>
        </ul>
      </div>
    </div>

    <div class="hidden sm:flex col-start-2 lg:col-start-3 justify-start flex-wrap">
      <!-- dummy element so that the next one is able to wrap -->
      <div class="w-0 h-full mb-96"></div> 
      <img src="/holey.svg" class="ml-auto mr-6 mb-96 translate-y-[-140px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/zebra.svg" class="mr-6 mb-96 translate-y-[-300px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/braid.svg" class="mr-6 mb-96 translate-y-[-250px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <div class="hidden sm:block h-32 min-w-[23px] mr-6">
        <div class="beacon-0 w-[0px] mx-auto"></div>
      </div>
      
      <img src="/curvy2.svg" class="ml-auto mr-6 hidden xl:block mb-96 translate-y-[-30px] object-none object-bottom w-[fit-content] h-[fit-content]">

      <img src="/zigzaggy.svg" class="ml-auto mr-6 mb-96 translate-y-[-300px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/dashed.svg" class="mr-6 mb-96 translate-y-[-250px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/wiggly1.svg" class="mr-auto mb-96 translate-y-[-200px] object-none object-bottom w-[fit-content] h-[fit-content]">
    </div>
  </section>






  <section class="sm:hidden w-full overflow-hidden overflow-x-auto h-[450px]">
    <div class="flex translate-y-[-50px]">
      <img src="/notch.svg" class="mr-6 ml-6 translate-y-[-50px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/tie.svg" class="mr-auto translate-y-[-0px] object-none object-bottom w-[fit-content] h-[fit-content]">
      
      <img src="/wiggly45.svg" class="ml-6 mr-6 translate-y-[-500px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/wiggly90.svg" class="mr-auto translate-y-[-125px] object-none object-bottom w-[fit-content] h-[fit-content]">
      
      <img src="/holey2.svg" class="mr-3 ml-6 translate-y-[-666px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/twisted.svg" class="mx-3 translate-y-[-100px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/tapered.svg" class="ml-3 mr-6 translate-y-[-0px] object-none object-bottom w-[fit-content] h-[fit-content]">

      <img src="/holey.svg" class="ml-auto mr-6 translate-y-[-140px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/zebra.svg" class="mr-6 translate-y-[-300px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/braid.svg" class="mr-6 translate-y-[-250px] object-none object-bottom w-[fit-content] h-[fit-content]">
      
      <img src="/curvy2.svg" class="ml-auto mr-6 hidden xl:block translate-y-[-30px] object-none object-bottom w-[fit-content] h-[fit-content]">

      <img src="/zigzaggy.svg" class="ml-auto mr-6 translate-y-[-300px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/dashed.svg" class="mr-6 translate-y-[-250px] object-none object-bottom w-[fit-content] h-[fit-content]">
      <img src="/wiggly1.svg" class="pr-6 translate-y-[-200px] object-none object-bottom w-[fit-content] h-[fit-content]">
    </div>
  </section>





  <section class="w-full mt-32 2xl:mt-44 relative">
    <GalleryCarousel class="h-[200px] 2xl:h-[256px] w-full">
        <div class="h-full flex-shrink-0 w-[calc(50%-130px)]"></div>
        
        <div class="mr-8 flex-shrink-0 text-3xl sm:text-3xl 2xl:text-4xl font-sigmar text-right flex justify-center items-center">
          <div>
            <div class="leading-[1] mb-6">unlimited <br> utility</div>
            <div class="leading-[1]">countless <br> applications</div>
          </div>
        </div>

        
        <div class="hidden sm:block min-w-[26px] xl:mx-2 h-full relative">
          <div class="beacon-1 svg-beacon absolute top-0 left-1/2 h-0 w-0 bg-red-600"></div>
          <div class="beacon-2 svg-beacon absolute bottom-0 left-1/2 h-0 w-0 bg-red-600"></div>
        </div>

        <div class="gallery-tile">
          <img src="/shirt.png" class="h-full">
        </div>

        <div class="gallery-tile">
          <img src="socks.png" class="h-full">
        </div>

        <div class="gallery-tile">
          <img src="/walker.png" class="h-full">
        </div>
        
        <div class="gallery-tile">
          <img src="https://images.unsplash.com/photo-1549383706-08b6a04ac16b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80" class="h-full">
        </div>


        
        <div class="gallery-tile">
          <img src="https://cdn.pixabay.com/photo/2016/12/14/11/34/socks-1906060_960_720.jpg" class="h-full">
        </div>
        
        <div class="gallery-tile">
          <img src="https://images.unsplash.com/photo-1585499583264-491df5142e83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="/fence.png" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="https://images.pexels.com/photos/1098764/pexels-photo-1098764.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="https://images.pexels.com/photos/1591930/pexels-photo-1591930.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="https://images.unsplash.com/photo-1586574208875-cd77c2bfb851?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="/long_long_fence.png" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="/house.png" class="h-full">
        </div>
        <div class="flex-shrink-0 invisible h-full w-8"></div>
    </GalleryCarousel>

    <GalleryCarousel class="h-[333px] 2xl:h-[378px] w-full">
      <div class="flex-shrink-0 xl:w-32"></div>
      <div class="gallery-tile relative">
        <img src="/rainbow.png" class="">
        <div class="absolute bottom-0 w-full h-16 mb-16 font-pacifico text-3xl flex items-center justify-start ml-8 text-white">
          in<br> weather
        </div>
      </div>

      <div class="gallery-tile">
        <img src="https://images.unsplash.com/photo-1513171920216-2640b288471b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="h-full">
      </div>

      <div class="hidden sm:block min-w-[26px] xl:mx-2 h-full relative">
        <div class="beacon-3 svg-beacon absolute top-0 left-1/2 h-0 w-0 bg-red-600"></div>
        <div class="beacon-4 svg-beacon absolute bottom-0 left-1/2 h-0 w-0 bg-red-600"></div>
      </div>

      <div class="gallery-tile relative">
        <img src="https://images.unsplash.com/photo-1577186488794-143f76e79f57?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" class="h-full">
        <div class="absolute top-0 w-full h-16 mt-10 font-pacifico text-3xl flex items-center justify-center">
          in navigation
        </div>
      </div>

      <div class="gallery-tile relative">
        <img src="https://images.pexels.com/photos/3876417/pexels-photo-3876417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" class="h-full">
        <div class="absolute w-full pb-6 h-24 font-pacifico text-white bottom-10 text-3xl flex items-center justify-center">
          in<br> agriculture
        </div>
      </div>

      <div class="gallery-tile relative">
        <img src="https://images.unsplash.com/photo-1517336985-b7c900b80702?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="h-full">
        <div class="absolute bottom-0 w-full h-16 mb-16 font-pacifico text-3xl flex items-center justify-end text-white text-center pr-10">
          in <br>
          fashion
        </div>
      </div>

      <div class="gallery-tile">
        <img src="/muzhik.png" class="h-full">
      </div>
      
      <div class="gallery-tile">
        <img src="https://images.pexels.com/photos/2820587/pexels-photo-2820587.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" class="h-full">
      </div>


      <div class="flex-shrink-0 text-2xl md:text-3xl px-8 md:px-10 2xl:px-20 font-pacifico flex justify-center items-center">
        thousands<br>
        of species<br>
        trust us<br>
        with their<br>
        camouflage
      </div>

      <div class="gallery-tile">
        <img src="https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=835&q=80" class="h-full">
      </div>
      <div class="gallery-tile">
        <img src="/fish.png" class="h-full">
      </div>
      <div class="gallery-tile">
        <img src="/zebras2.png" class="h-full">
      </div>
      <div class="gallery-tile">
        <img src="lemur.png" class="h-full">
      </div>
      <div class="gallery-tile py-20">
        <img src="bees.png" class="h-full">
      </div>
      <div class="flex-shrink-0 text-2xl md:text-3xl px-2 md:px-10 font-pacifico flex justify-center items-center w-min">
        ...in bugs
      </div>
      <div class="hidden gallery-tile py-32">
        <img src="/zhuchok2.png" class="h-full">
      </div>
      <div class="flex-shrink-0 invisible h-full w-8"></div>
    </GalleryCarousel>

    <GalleryCarousel class="h-[220px] 2xl:h-[256px] w-full">

      <div class="flex-shrink-0 xl:w-80"></div>

      <div class="gallery-tile">
        <img src="/test.png" class="h-full">
      </div>


      <div class="gallery-tile relative">
        <img src="https://cdn.pixabay.com/photo/2016/11/23/15/36/close-up-1853572_960_720.jpg" class="h-full">
        <div class="absolute bottom-0 w-full h-16 mb-16 font-pacifico text-3xl flex items-center justify-start ml-8 text-white">
          in<br> music
        </div>
      </div>

      <div class="min-w-[26px] xl:mx-2 h-full relative">
        <div class="beacon-5 svg-beacon absolute top-0 left-1/2 h-0 w-0 bg-red-600"></div>
        <div class="beacon-6 svg-beacon absolute bottom-0 left-1/2 h-0 w-0 bg-red-600"></div>
      </div>

      <div class="gallery-tile">
        <img src="/road.png" class="h-full">
      </div>

      <div class="gallery-tile relative">
        <img src="https://images.pexels.com/photos/728824/pexels-photo-728824.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" class="h-full">
        <div class="absolute bottom-[55%] left-[10%] font-pacifico text-3xl flex items-center justify-center text-white rotate-[-30deg]">
          in<br> transport
      </div>
        </div>

      <div class="gallery-tile">
        <img src="https://images.unsplash.com/photo-1543839482-a95d35fc5a77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=675&q=80" class="h-full">
      </div>


      <div class="gallery-tile">
        <img src="https://images.unsplash.com/photo-1530127676576-acdb8fbb5690?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80" class="h-full">
      </div>

      <div class="gallery-tile">
        <img src="https://images.pexels.com/photos/1436697/pexels-photo-1436697.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" class="h-full">
      </div>
      <div class="gallery-tile">
        <img src="/motorcycle.png" class="h-full">
      </div>
      <div class="gallery-tile">
        <img src="https://images.pexels.com/photos/1571134/pexels-photo-1571134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" class="h-full">
      </div>
      <div class="sm:hidden font-pacifico text-2xl leading-[1.7em] mx-10 min-w-max">
        Your<br>
        imagination<br>
        is the limit!
      </div>
      <div class="flex-shrink-0 invisible h-full w-8"></div>
    </GalleryCarousel>

    <div class="hidden sm:flex max-w-[320px] min-h-[400px] mx-auto relative flex items-center h-[600px]">
      <div class="beacon-7 absolute bottom-[380px] w-3 h-3 bg-red-300"></div>
      <div class="font-pacifico text-3xl leading-[1.7em] ml-20 -mt-10">
        Your<br>
        imagination<br>
        is the limit!
      </div>
    </div>
  </section>







  <section class="sm:hidden mt-32 relative">

    <div class="font-pacifico text-3xl mt-16 text-center">
      All sorts, <span class="font-sigmar text-4xl inline-block rotate-6">any</span> kind
    </div>

    <div class="relative mt-8 w-[1920px] scale-90 origin-top-left translate-x-[-40px] translate-y-[-60px]">
      <!-- <img src="/squarebeads.svg"  class="absolute "> -->
      <img src="/stripy.svg" class="absolute rotate-[-5deg] translate-y-[30px]">
      <!-- <img src="/thicktwisted2.svg" class="absolute scale-[0.5] rotate-[6.7deg] translate-x-[-30%] translate-y-[95px] rotate-[2deg]"> -->
      <img src="/rough.svg" class="absolute rotate-[3deg] translate-y-[44px]">
      <img src="/bricky2.svg" class="absolute translate-y-[180px] rotate-6">
      <img src="/squarebeads2.svg"  class="absolute translate-y-[245px] scale-y-[-1]">
      <!-- <img src="/thickbraid.svg" class="absolute translate-y-[180px] -rotate-3"> -->
    </div>
    
    <div class="font-pacifico text-3xl text-center mt-[300px]">
      for <span class="font-sigmar text-4xl inline-block -rotate-6">any</span> kind of cause <span class="font-sigmar text-4xl rotate-6 inline-block">!</span>
    </div>

    <div class="relative w-[1920px] scale-[0.85] origin-top-left h-[400px] mt-8">
      <img src="/barky.svg" class="scale-[0.6] absolute translate-x-[-40%] rotate-[2deg]">
      <img src="/monobraid.svg" class="absolute scale-[0.45] translate-x-[-30%] translate-y-[50px] rotate-2">
      <!-- <img src="/rough.svg" class="absolute rotate-[2deg] translate-y-[45px] translate-x-[-20px]"> -->
      <img src="/kurva.svg" class="absolute scale-[0.6] scale-x-[-0.6] rotate-[0deg] translate-x-[-30%] translate-y-[57px] rotate-[2deg]">
      <!-- <img src="/thicktwisted2.svg" class="absolute scale-[0.5] scale-x-[-0.5] rotate-[-1deg] translate-x-[-20%] translate-y-[162px] rotate-[2deg]"> -->
      <img src="/thickbraid.svg" class="absolute scale-x-[-1] translate-x-[10%] translate-y-[135px] rotate-[10deg]">
    </div>
  </section>







  <section class="hidden sm:block h-[506px] relative mt-14">

    <div class="relative left-1/2 h-0 w-[1920px] -rotate-1 scale-[0.8] translate-x-[-130px]
                lg:translate-x-[-200px]
                2xl:scale-[1] 2xl:translate-x-[-30px] 2xl:translate-y-[10px]">
      <img src="/thicktwisted2.svg" class="absolute -rotate-1 scale-[0.55] scale-y-[-0.55] left-[-86%] translate-y-[-130px]">
      <img src="/rough.svg" class="absolute rotate-1 translate-y-[-117px] translate-x-[-140%]">
      <img src="/stripy.svg" class="absolute rotate-[-5deg] translate-x-[-130%] translate-y-[-15px]">
      <img src="/squarebeads3.svg"  class="absolute rotate-2 scale-[0.8] translate-x-[-99%] translate-y-[85px]">
      <img src="/thickbraid4.svg" class="absolute rotate-3 scale-[0.6] translate-x-[-88%] translate-y-[100px]">
      <!-- <img src="/holey3.svg" class="absolute rotate-[1deg] scale-[0.5] translate-x-[-93%] translate-y-[110px]"> -->
      <!-- <img src="/bricky2.svg" class="absolute rotate-[-4deg] translate-x-[-132%] translate-y-[180px]"> -->
    </div>
    
     <div class="relative h-0 left-1/2 w-[1920px] scale-[0.8] translate-x-[-80px] translate-y-[-10px]
                 lg:translate-x-[-20px]
                 2xl:scale-[1] 2xl:translate-x-[200px]">
      <div class="absolute h-3 w-3 bg-red-600 left-[30px] top-[350px] beacon-b"></div>
      <img src="/thickbraid5.svg" class="absolute rotate-[-0deg] scale-[0.5] left-[-22%] top-[-505px]">
      <img src="/monobraid3.svg" class="absolute scale-[0.5] left-[-26%] top-[-155px]">
      <img src="/bricky6.svg" class="absolute scale-[0.6] -rotate-2 left-[-16%] top-[55px]">
      <img src="/kurva3.svg" class="absolute scale-[0.4] rotate-[-3deg] top-[-10px] left-[-24%]
                                    lg:left-[-25%]
                                    2xl:rotate-[0.6deg] 2xl:left-[-25%] 2xl:top-[25px]">
    </div>

    <div class="font-pacifico md:leading-normal sm:leading-normal lg:leading-normal xl:leading-normal text-3xl lg:text-4xl text-center pt-6 lg:pt-2 2xl:pt-8">
      All sorts, any kind,<br>
      for any kind of cause!
    </div>
  </section>







  <section class="relative">
    <div class="hidden sm:block w-0 mx-auto mt-72">
      <svg id="svg2" xmlns="http://www.w3.org/2000/svg" fill="none" width="1304" height="3131" viewBox="0 0 1304 3131" 
           class="absolute translate-x-[-26%] translate-y-[-720px]">
        <path id="zhopka" :d="d3" stroke="#eeaf0c" stroke-width="23"/>

        <path stroke="#eeaf0c" stroke-width="23" :d="d2"/>

        <text style="fill: currentColor;" class="font-pacifico text-4xl translate-y-[-35px]">
          <textPath href="#zhopka" startOffset="7%">
            See what our
          </textPath>
        </text>
        <text style="fill: currentColor;" class="font-pacifico text-4xl translate-y-[60px]">
          <textPath href="#zhopka" startOffset="14%">
            customers have to say!
          </textPath>
        </text>
      </svg>
    </div>

    <div class="sm:hidden font-pacifico text-3xl mt-16 mb-12 mx-auto w-max">
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
      <div class="flex items-center mb-4">
        <div class="rounded-full bg-gray-400 w-12 h-12 mr-8"></div>
        <div class="text-xl font-sigmar">John Knopkins</div>
      </div>
      <div class="text-base sm:text-base text-justif">
        Uh... I'm really confused as to the purpose of this place. Do they sell... what? Digital images of stripes? Like, one stripe per image? I don't get it. Why the hell would you want to buy one of those? Are they supposed to be useful somehow? I dunno... This is really confusing.
      </div>
    </div>

    <div class="max-w-[530px] p-4 sm:px-0 mx-auto">
      <div class="flex items-center mb-4">
        <div class="rounded-full bg-gray-400 w-12 h-12 mr-8"></div>
        <div class="text-xl font-sigmar">Zoey</div>
      </div>
      <div class="text-base sm:text-base text-justif">
        Okay, so I actually went and bought one of the stripes. Arrived shortly, as promised. Feels oddly satisfying to have bought one, haha :D What the hell do I do with it now, though?
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
      <div class="flex items-center mb-4">
        <div class="rounded-full bg-gray-400 w-12 h-12 mr-8"></div>
        <div class="text-xl font-sigmar">Aristarkh Borodulko</div>
      </div>
      <div class="text-base sm:text-base text-justif">
        Dude... I mean, can you imagine spending the effort to make something as useless as this thing... and to such level of polish? Don't you have anything better to do with your life? I guess I'll go buy something... out of pity.
      </div>
    </div>

    <div class="max-w-[530px] p-4 sm:px-0 mx-auto">
      <div class="flex items-center mb-4">
        <div class="rounded-full bg-gray-400 w-12 h-12 mr-8"></div>
        <div class="text-xl font-sigmar">Petunya</div>
      </div>
      <div class="text-base sm:text-base text-justif">
        Finally, a shop for an avid stripe lover such as myself! I used to buy stripy patterns from stocks and then meticulously extract individual stripes out of them... such an arduous task, I'll tell ya! Now I can buy stripes separately, no longer overpaying for the ones I don't need!
      </div>
    </div>
  </section>






  <section class="mx-auto max-w-screen-xl mt-[135px] md:mt-48">
    <h1 class="flex justify-center">
      <div class="w-max ml-[-10%]">
        <div class="font-pacifico text-4xl">Also,</div>
        <div class="font-sigmar text-6xl sm:text-7xl origin-left rotate-[-17deg] ml-12 mt-5">
          SA<span class="text-orange">L</span>E!
        </div>
        <div class="beacon-a ml-28"></div>
      </div>
    </h1>

    <h2 class="text-4xl mt-16 md:mt-8 m-6 mb-2 font-sigmar -rotate-6 origin-left">-50%</h2>
    <Carousel class=""/>

    <h2 class="text-4xl m-6 mt-16 mb-2 font-sigmar -rotate-6 origin-left">-25%</h2>
    <Carousel class=""/>

    <h2 class="text-3xl m-6 mt-16 mb-2 font-sigmar -rotate-6 origin-left">Limited offer!</h2>
    <Carousel class=""/>
  </section>







  <section class="flex justify-center">
    <div class="my-40">
      <div class="font-sigmar text-xl sm:text-2xl">our motto</div>
      <div class="font-pacifico text-xl sm:text-2xl">&mdash; Are you gonna buy something?</div>
      <div class="font-pacifico text-xl sm:text-2xl">&mdash; Nah, I'm just browsing</div>
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

// SVG path's d attribute value
var d = ref("M0 0");

onMounted(() => {
  animateSVG();
  animateSVG2();
  animateSVG3();
})

function getBeaconById(id) {
  let beacons = document.getElementsByClassName("beacon-"+id);
  beacons = Array.from(beacons).filter(el => window.getComputedStyle(el, null).display !== "none");

  if (beacons.length > 1)
    console.error(`Multiple beacons of the same id are visible at the same time (id=${id})! I'll take the first one id=`);

  if (beacons.length < 1)
    console.error(`Couldn't find beacon-${id}`);

  return beacons[0];
}

function animateSVG() {
  window.requestAnimationFrame(animateSVG); // loopь

  let gallerySVG = document.getElementById("gallery-svg");
  let rectSVG = gallerySVG.getBoundingClientRect();

  let beacons = [0, 1, 2, 3, 4, 5, 6, 7]
    .map(getBeaconById)
    .map(el => el.getBoundingClientRect())
    .map(rect => {
      return {
        x: rect.x - rectSVG.x,
        y: rect.y - rectSVG.y
      }
    });
  
  let p = beacons; // for brevity
  d.value = `
    M${p[0].x} ${p[0].y}

    V${p[1].y - 138}

    c0,26.5,36,35,0,66s87.002,72,0,72

    H${p[1].x}

    V${p[1].y}
    H${p[1].x}
    L${p[2].x} ${p[2].y}
    H${p[3].x}
    V${p[4].y}
    H${p[5].x}
    V${p[6].y}
    H${p[7].x}
    V${p[7].y}
    v35
    c-5.37,238.5,-7.5,319.04,-121.109,333
    c-193.03,23.73,-696.1274,-4.36, -990.626,0`;
}


var d2 = ref("M0,0");

function animateSVG2() {
  window.requestAnimationFrame(animateSVG2); // loopь
  
  let svg2 = document.getElementById("svg2");
  let rectSVG = svg2.getBoundingClientRect();
  let a = getBeaconById("a").getBoundingClientRect();
  a = {
    x: a.x - rectSVG.x,
    y: a.y - rectSVG.y
  };

  d2.value = `
    M19.8606,730.7157
    C19.4529,733.8801,19.1466,737.3917,19,740.708
    C10.0253,943.946,12.9999,1556,19,1805.5
    C25,2055, ${a.x-214},${a.y+79}, ${a.x},${a.y}
    c214,-79.5,179.5,-52,173.5,-38.5`;
  
}


var d3 = ref("M0,0");

function animateSVG3() {
  window.requestAnimationFrame(animateSVG3); // loopь

  let svg2 = document.getElementById("svg2");
  let rectSVG = svg2.getBoundingClientRect();
  let b = getBeaconById("b").getBoundingClientRect();
  b = {
    x: b.x - rectSVG.x,
    y: b.y - rectSVG.y
  };


  d3.value = `
    M19.8334,730.988
    C44.4087,540.225,536.34,621.7449,617,515.999
    C698.998,408.5, ${b.x+13.917},${b.y+57}, ${b.x},${b.y}
    c-47,-192.5,569.941,-183.329,785.001,-120`;
    //C505.499,3.4997, 1122.44,12.6712, 1337.5,14.0006`;
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.multiline-ellipsis {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.gallery-tile {
  @apply py-3 xl:py-6 h-full flex-shrink-0
}

.gallery-tile + .gallery-tile {
  @apply ml-6 xl:ml-8
}

.gallery-tile img {
  @apply border-8 border-gray-700 h-full
}
</style>
