<template>
  <!-- the long stripe -->
  <svg id="gallery-svg" width="100%" height="5000px" class="hidden sm:block absolute top-0 left-0 z-[-1] text-orange">
    <path fill="none" stroke-dashoffset="5000" stroke-dasharray="5000" stroke="currentColor" stroke-width="27" id="long1" ref="long1" :d="d"/>
  </svg>

<!--
  <header v-if="false" class="w-full h-[calc(100vh+1px)] relative max-h-[1000px] overflow-hidden shadow-2xl border-b border-gray-400 bg-white">
    <main class="max-w-screen-xl h-full mx-auto relative">
      <img src="/images/hero/telka-gory-bw.jpg" class="absolute h-full max-w-[100vw] translate-x-[-46%] left-[66%]"/>
      <img src="/images/logo/logo-front-stripeless.svg" class="absolute translate-y-[-50%] top-[47.2%] w-[391px] left-[11.2%]"/>
    </main>
  </header>
-->

  <header class="w-full h-[calc(100vh+1px)] max-h-[1000px] overflow-hidden relative shadow-2xl border-b relative border-gray-400 bg-white">

    <div class="absolute overflow-hidden inset-0">
      <img src="/images/hero/bds2.png" class="max-w-none absolute right-0 h-[480px] md:h-[640px] lg:h-[920px] top-[calc(50%+60px)] sm:top-[calc(44%+50px)] md:top-[calc(44%+20px)] lg:top-[calc(44%-150px)] xl:top-[calc(44%-270px)] 2xl:top-[calc(44%-360px)]">
    </div>

    <div class="absolute font-pacifico text-2xl sm:text-3xl xl:text-4xl rotate-[-31deg] text-white
                top-[calc(50%+200px)] right-[0px]
                sm:top-[calc(44%+260px)] sm:right-[80px]
                md:top-[calc(44%+270px)] md:right-[130px]
                lg:top-[calc(44%+230px)] lg:right-[160px]
                xl:top-[calc(44%+170px)] xl:right-[200px]
                2xl:top-[calc(44%+130px)] 2xl:right-[280px]">
      Your go-to place to shop for stripes
    </div>

    <main class="max-w-screen-xl h-full mx-auto relative flex flex-col">
      <nav class="absolute w-full right-0 flex items-start justify-between p-10 sm:p-16 z-10">
        <section
          class="sm:pl-12 lg:pl-24 flex flex-col justify-center items-start text-lg uppercase">
          <router-link to="/catalogue">catalogue</router-link>
          <router-link to="/about">about</router-link>
          <button @click="eventBus.emit('thurd')" class="text-lg uppercase">third one</button>
        </section>

        <section class="--space-x-4 md:space-x-7 flex flex-col-reverse sm:flex-row items-center">
          <UserButton/>
          <CartButton/>
        </section>
      </nav>

      <!-- logo -->
      <img src="/images/logo/logo-front-full.svg" class="absolute w-[466px] bottom-[40%] left-[50%] translate-x-[-50%] lg:left-0 lg:translate-x-0 p-6 lg:ml-32"/>
    </main>
  </header>











  <section class="flex overflow-scroll lg:justify-center scrollbar-off items-start">
    <div class="lg:w-[1700px] hidden lg:flex justify-end flex-shrink-0">
      <FromUnder class="origin-right lg:scale-[89%] lg:-translate-y-20 2xl:scale-100 2xl:-translate-y-16 2xl:-translate-x-2"/>
   </div>

    <div class="sm:ml-8">
      <div id="beacon-0" class="mx-auto"></div>
    </div>

    <div class="relative flex-shrink-0 pb-16 pt-14 mx-10 xs:mx-12 sm:pl-6 lg:pl-0 sm:mx-16 sm:pt-20 lg:pt-16 lg:mx-24 2xl:mx-32 2xl:py-28">
      <div class="w-max mx-auto" id="only-digital">
        <div class="font-pacifico text-3xl 2xl:text-4xl mb-3 xl:mb-4">Only 100%</div>
        <div class="font-pressstart text-3xl 2xl:text-4xl mb-2 xl:mb-3">digital</div>
        <div class="font-pacifico text-3xl 2xl:text-4xl">stripes!</div>

        <ul class="sm:text-lg xl:text-lg mt-6 xl:mt-8 list-disc ml-4">
          <li>pure vector <b>.SVG</b></li>
          <li>delivered by email</li>
          <li>in a .zip archive</li>
          <li><b id="seconds">seconds</b> after the purchase</li>
        </ul>

        <div id="beacon-babulka" class="absolute bg-red-400 left-0 bottom-0 mx-auto"></div>
      </div>
    </div>

    <div class="w-[1250px] md:w-[1400px] lg:w-[1700px] flex flex-shrink-0 overflow-hidden pr-8">
      <FromUnder class="origin-left -translate-y-28 md:-translate-y-24 lg:scale-[85%] lg:-translate-y-24 2xl:scale-100 2xl:-translate-y-28"/>
    </div>
  </section>













  <section id="galleries" class="w-full sm:mt-48 xl:mt-52 2xl:mt-96 relative">
    <GalleryCarousel id="gallery1" ref="gallery1" class="h-[200px] 2xl:h-[256px] w-full">
        <div class="h-full flex-shrink-0 w-[calc(50%-106px)] sm:w-[calc(50%-146px)]"></div>
        
        <div class="mr-8 flex-shrink-0 text-3xl sm:text-3xl 2xl:text-4xl font-sigmar text-right flex justify-center items-center">
          <div>
            <div class="leading-[1] mb-6">unlimited <br> utility</div>
            <div class="leading-[1]">countless <br> applications</div>
          </div>
        </div>

        
        <div class="hidden sm:block min-w-[26px] xl:mx-2 h-full relative">
          <div id="beacon-1" class="absolute -top-10 2xl:top-[-100px] left-1/2"></div>
          <div id="beacon-2" class="absolute bottom-0 left-1/2 h-0 w-0 bg-red-600"></div>
        </div>

        <div class="lg:ml-6 gallery-tile">
          <img src="/images/gallery/shirt.png" class="h-full">
        </div>

        <div class="gallery-tile">
          <img src="/images/gallery/socks.png" class="h-full">
        </div>

        <div class="gallery-tile">
          <img src="/images/gallery/walker.png" class="h-full">
        </div>
        
        <div class="gallery-tile">
          <img src="https://images.unsplash.com/photo-1549383706-08b6a04ac16b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80" class="h-full">
        </div>


        
        <div class="gallery-tile">
          <img src="/images/gallery/socks-1906060_960_720.jpg" class="h-full">
        </div>
        
        <div class="gallery-tile">
          <img src="https://images.unsplash.com/photo-1585499583264-491df5142e83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="/images/gallery/fence.png" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="/images/gallery/pexels-photo-1098764.jpeg" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="/images/gallery/pexels-photo-1591930.jpeg" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="https://images.unsplash.com/photo-1586574208875-cd77c2bfb851?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="/images/gallery/long_long_fence.png" class="h-full">
        </div>
        <div class="gallery-tile">
          <img src="/images/gallery/house.png" class="h-full">
        </div>
        <div class="flex-shrink-0 invisible h-full w-8"></div>
    </GalleryCarousel>

    <GalleryCarousel id="gallery2" ref="gallery2" class="h-[333px] 2xl:h-[378px] w-full">
      <div class="flex-shrink-0 xl:w-32"></div>
      <div class="gallery-tile relative">
        <img src="/images/gallery/rainbow.png" class="">
        <div class="absolute bottom-0 w-full h-16 mb-16 font-pacifico text-3xl flex items-center justify-start ml-8 text-white">
          in<br> weather
        </div>
      </div>

      <div class="gallery-tile">
        <img src="https://images.unsplash.com/photo-1513171920216-2640b288471b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="h-full">
      </div>

      <div class="hidden sm:block min-w-[26px] xl:mx-2 h-full relative">
        <div id="beacon-3" class="absolute top-0 left-1/2 h-0 w-0 bg-red-600"></div>
        <div id="beacon-4" class="absolute bottom-0 left-1/2 h-0 w-0 bg-red-600"></div>
      </div>

      <div class="gallery-tile relative">
        <img src="https://images.unsplash.com/photo-1577186488794-143f76e79f57?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" class="h-full">
        <div class="absolute top-0 w-full h-16 mt-10 font-pacifico text-3xl flex items-center justify-center">
          in navigation
        </div>
      </div>

      <div class="gallery-tile relative">
        <img src="/images/gallery/pexels-photo-3876417.jpeg" class="h-full">
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
        <img src="/images/gallery/muzhik.png" class="h-full">
      </div>
      
      <div class="gallery-tile">
        <img src="/images/gallery/pexels-photo-2820587.jpeg" class="h-full">
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
        <img src="/images/gallery/fish.png" class="h-full">
      </div>
      <div class="gallery-tile">
        <img src="/images/gallery/lemur.png" class="h-full">
      </div>
      <div class="gallery-tile">
        <img src="/images/gallery/zebras2.png" class="h-full">
      </div>

      <div class="gallery-tile">
        <img src="/images/gallery/zhuchok2.png" class="h-16">
      </div>
      <div class="flex-shrink-0 text-2xl md:text-3xl px-2 md:px-10 font-pacifico flex justify-center items-center w-min">
        in bugs
      </div>

      <div class="flex-shrink-0 invisible h-full w-8"></div>
    </GalleryCarousel>

    <GalleryCarousel id="gallery3" ref="gallery3" class="h-[220px] 2xl:h-[256px] w-full">

      <div class="flex-shrink-0 xl:w-96"></div>

      <div class="gallery-tile">
        <img src="/images/gallery/test.png" class="h-full">
      </div>


      <div class="gallery-tile relative">
        <img src="/images/gallery/close-up-1853572_960_720.jpg" class="h-full">
        <div class="absolute bottom-0 w-full h-16 mb-16 font-pacifico text-3xl flex items-center justify-start ml-8 text-white">
          in<br> music
        </div>
      </div>

      <div class="min-w-[26px] xl:mx-2 h-full relative">
        <div id="beacon-5" class="absolute top-0 left-1/2 h-0 w-0 bg-red-600"></div>
        <div id="beacon-6" class="absolute bottom-0 left-1/2 h-0 w-0 bg-red-600"></div>
      </div>

      <div class="gallery-tile">
        <img src="/images/gallery/road.png" class="h-full">
      </div>

      <div class="gallery-tile">
        <img src="https://images.unsplash.com/photo-1530127676576-acdb8fbb5690?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80" class="h-full">
      </div>

      <div class="gallery-tile relative">
        <img src="/images/gallery/pexels-photo-728824.jpeg" class="h-full">
        <div class="absolute bottom-[55%] left-[10%] font-pacifico text-3xl flex items-center justify-center text-white rotate-[-30deg]">
          in<br> transport
        </div>
      </div>

      <div class="gallery-tile">
        <img src="/images/gallery/motorcycle.png" class="h-full">
      </div>


      <div class="gallery-tile">
        <img src="https://images.unsplash.com/photo-1543839482-a95d35fc5a77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=675&q=80" class="h-full">
      </div>

      <div class="gallery-tile">
        <img src="/images/gallery/pexels-photo-1436697.webp" class="h-full">
      </div>

      <div class="gallery-tile">
        <img src="/images/gallery/pexels-photo-1571134.jpeg" class="h-full">
      </div>

      <div class="sm:hidden font-pacifico text-2xl leading-[1.7em] mx-10 min-w-max">
        Your<br>
        imagination<br>
        is the limit!
      </div>
      <div class="flex-shrink-0 invisible h-full w-8"></div>
    </GalleryCarousel>

    <div class="hidden sm:flex max-w-[320px] min-h-[400px] mx-auto relative flex items-center h-[600px] xl:h-[700px]">
      <div id="beacon-7" class="absolute bottom-[380px]"></div>
      <div class="font-pacifico text-2xl lg:text-3xl leading-[1.7em] lg:leading-[1.7em] ml-20 -mt-10">
        Your<br>
        imagination<br>
        is the limit!
      </div>
    </div>
  </section>





  <section class="md:hidden mt-28 sm:mt-0 relative z-20">
    <div class="font-pacifico text-2xl xs:text-3xl mt-16 mb-6 text-center rotate-3">
      All sorts, <span class="font-sigmar text-4xl inline-block mx-1 rotate-6">any</span> kind
    </div>
    <svg fill="none" width="751" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 751 372">
      <path fill="#ADADAD" d="m-99 86.4316 947.6851-24.432.9278 35.988-947.6851 24.432z"/>
      <path fill="#878181" d="M-136.297 229.766 912.3324 345.5304l-2.853 25.843L-139.15 255.609z"/>
      <path d="m-171 262.533 1053.375-58.534 1.997 35.945-1053.375 58.534-1.997-35.945Z" fill="#AEAEAE"/>
      <path fill="#747474" d="m-151.066 180.707 1054.9361 11.6082-.286 25.9984-1054.9362-11.6082z"/>
      <path fill="#C4C4C4" d="m-95.8633-7.0078 946.3744 55.4927-2.1073 35.9383-946.3744-55.4927zM-115.094 71l945.4498 69.4884-1.9058 25.93-945.4498-69.4883z"/>
      <path fill="#919191" d="m-93 174.428 920.7126-52.4273 2.0465 35.9418-920.7125 52.4273z"/>
    </svg>

    <div class="font-pacifico text-2xl xs:text-3xl text-center">
      <span class="inline-block rotate-[15deg] translate-y-[-8px]">
        for <span class="font-sigmar text-3xl xs:text-4xl inline-block -rotate-6">any</span>
      </span>
      <span class="inline-block ml-4 rotate-[-4deg]">
        kind of cause <span class="font-sigmar text-3xl xs:text-4xl rotate-6 inline-block">!</span>
      </span>
    </div>
    <svg fill="none" width="751" class="-mt-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 751 448">
      <path fill="#6D6C6C" d="m-176 278.342 1201.9519-163.3424 4.8477 35.6721-1201.9518 163.3424z"/>
      <path fill="#958C8C" d="M-131 217.619 912.0078 59.0007l3.909 25.7044-1043.0077 158.6184z"/>
      <path fill="#C4C4C4" d="m-251 422.309 1269.138-312.3104 6.2127 25.2468-1269.138 312.3104z"/>
      <path fill="#C4C4C4" d="m-242.617 121.193 1306.9387 12.6548-.3485 35.9984-1306.9388-12.6549z"/>
      <path fill="#A5A5A5" d="m-203.301.9727 1284.263 242.729-4.8285 25.5477-1284.263-242.729z"/>
      <path fill="#C4C4C4" d="m-190.982 87.4902 1305.3183-66.2813 1.8256 35.9537-1305.3182 66.2813z"/>
    </svg>
  </section>


  <section class="hidden md:block relative mt-[-110px] h-[700px] w-full">
    <h2 class="absolute font-pacifico text-3xl md:top-[32%] xl:text-4xl xl:top-[35%] xl:top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-normal lg:leading-normal xl:leading-normal" ref="allsorts" id="allsorts">
      All sorts, <span class="font-sigmar">any</span> kind<br>
      for <span class="font-sigmar">any</span> kind of cause
    </h2>

    <FromLeft class="absolute origin-right scale-75 xl:scale-100 top-5 -translate-x-10 xl:top-20 right-1/2 xl:translate-x-[-5%]"/>

    <FromRight class="absolute translate-y-[-32%]  scale-75 xl:scale-100 translate-x-[-14%] left-1/2 xl:translate-x-[-5%]"/>

    <div id="beacon-b" class="absolute left-2/3 bottom-[35%]"></div>
  </section>









  <section class="relative md:mt-96 xl:mt-[470px]">
    <div class="relative hidden mt-48 md:mt-0 sm:block w-0 h-1 mx-auto">
      <h1 class="absolute translate-y-[-210px] lg:translate-y-[-230px] translate-x-[-200px] rotate-[-15deg] w-max" >
        <div class="font-pacifico text-3xl lg:text-4xl">See what our</div>
        <div id="customers" class="font-sigmar text-4xl mt-10 ml-14 lg:mt-14 lg:text-5xl">customers</div>
        <div class="font-pacifico text-3xl lg:text-4xl mt-2 ml-56">have to <span ref="say" class="say inline-block translate-x-[3px] origin-left --rotate-[15deg]">say!</span></div>
      </h1>

      <svg id="comments-line" width="1315" height="2627" class="absolute translate-y-[-912px] translate-x-[-330px] z-[-1] text-orange" viewBox="0 0 1358 2500" fill="none">
        <path stroke="currentColor" stroke-dasharray="4000" stroke-dashoffset="4000" stroke-width="27" ref="long2" id="long2" :d="d2"/>
      </svg>
    </div>

    <div class="sm:hidden font-pacifico text-3xl mt-6 mb-12 mx-auto w-max">
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

    <div id="comments" class="max-w-[530px] mt-14 p-4 sm:px-0 mx-auto">
      Uh... I'm really confused as to the purpose of this place. Do they sell... what? Images of stripes? Like, one stripe per image? I don't get it. Why the hell would you want to buy one of those? Are they supposed to be useful somehow? I dunno... This is really confusing.
      <div class="font-pacifico text-xl float-right m-3 -rotate-3">&mdash; John Knopkins</div>
    </div>

    <div class="max-w-[530px] mt-10 p-4 sm:px-0 mx-auto clear-both">
      Okay, so I actually went and bought one of the stripes. Arrived shortly, as promised. Feels oddly satisfying to have bought one, haha :D What the hell do I do with it now, though?
      <div class="font-pacifico text-xl float-right m-3 -rotate-3">&mdash; Arhip</div>
    </div>

    <div class="h-[450px] max-w-screen-xl my-6 md:mb-16 md:mt-20 mx-auto">
      <div id="spirals" ref="spirals" class="grid grid-cols-8 h-full relative">
        <img src="/images/3d/wavy.svg" class="min-w-max scale-[0.75] md:scale-110 col-start-7 md:col-start-5 absolute left-[-50px] top-[250px] md:left-[-650px] md:top-[20px] rotate-[355deg] md:rotate-0">
        <img src="/images/3d/ring_top.svg" class="oring skip min-w-max scale-[0.85] md:scale-100 col-start-5 absolute left-[-403px] top-[289px]">
        <img id="ring" src="/images/3d/ring_bottom.svg" class="oring skip min-w-max scale-[0.85] md:scale-100 col-start-5 absolute top-[282px] left-[-410px] z-[-10]">
        <img src="/images/3d/infinite.svg" class="min-w-max scale-[0.85] md:scale-95 rotate-[-14deg] md:rotate-[-15deg] col-start-5 absolute top-[-20px] left-[-320px] md:left-[-310px] md:top-[0px]">
        <img src="/images/3d/ribbon.svg" class="min-w-max scale-[0.85] md:scale-110 col-start-5 absolute left-[-135px] top-[95px] md:left-[-140px] md:top-[200px] rotate-[48deg] md:rotate-0">
        <img src="/images/3d/littlespiral.svg" class="min-w-max scale-[0.75] md:scale-100 col-start-6 absolute -rotate-6 top-[-48px] left-[-90px] rotate-[-10deg] md:rotate-0">
        <img src="/images/3d/knot.svg" class="min-w-max scale-[0.9] md:scale-100 col-start-6 md:col-start-6 absolute left-[-330px] top-[190px] md:left-[-10px] md:top-[280px] rotate-[-14deg] rotate-[-9deg]">
        <img src="/images/3d/longspiral.svg" class="min-w-max scale-[0.75] md:scale-110 col-start-7 md:col-start-6 absolute left-[18px] top-[-220px] md:left-[167px] md:top-[-390px] rotate-6">
        <img src="/images/3d/spiral.svg" class="min-w-max scale-[0.75] md:scale-110 col-start-6 md:col-start-7 absolute left-[-113px] top-[225px] md:left-[80px] md:top-[200px]">
      </div>
    </div>

    <div class="max-w-[530px] mt-10 p-4 sm:px-0 mx-auto">
      Dude... I mean, can you imagine spending the effort to make something as useless as this thing... and to such level of polish? Don't you have anything better to do with your life? I guess I'll go buy something... out of pity.
      <div class="font-pacifico text-xl float-right m-3 -rotate-3">&mdash; Aristarkh Borodulko</div>
    </div>

    <div class="max-w-[530px] mt-12 p-4 sm:px-0 mx-auto">
      FINALLY, a perfect place for a stripe aficionado such as myself! I used to buy stripy patterns from stocks and then pick out individual stripes out of them... such an effort, I'll tell ya! Here I can buy stripes separately, just the ones that I need!
      <div class="font-pacifico text-xl float-right m-3 -rotate-3">&mdash; Petunya</div>
    </div>
  </section>






  <section class="mx-auto max-w-screen-xl mt-[135px] md:mt-72">
    <h1 class="flex justify-center">
      <div class="w-max ml-[-10%]">
        <div class="font-pacifico text-4xl">Also,</div>
        <div ref="sale" id="sale" class="font-sigmar text-6xl sm:text-7xl origin-left rotate-[-17deg] ml-12 mt-5">
          SA<span class="text-orange">L</span>E!
        </div>
        <div id="beacon-a" class="ml-28 -translate-y-4 translate-x-4"></div>
      </div>
    </h1>

    <h2 class="text-4xl mt-16 m-6 mb-2 font-sigmar -rotate-6 origin-left">simple</h2>
    <Carousel :ids="productStore.collection('1')" class=""/>

    <h2 class="text-4xl m-6 mt-16 mb-2 font-sigmar -rotate-6 origin-left">funky</h2>
    <Carousel :ids="productStore.collection('2')" class=""/>

    <h2 class="text-3xl m-6 mt-16 mb-2 font-sigmar -rotate-6 origin-left">quirky</h2>
    <Carousel :ids="productStore.collection('3')" class=""/>
  </section>







  <section class="flex justify-center">
    <div class="mt-40">
      <div class="font-sigmar text-xl sm:text-2xl">our motto</div>
      <div class="font-pacifico text-xl sm:text-2xl">&mdash; Are you gonna buy something?</div>
      <div class="font-pacifico text-xl sm:text-2xl">&mdash; Nah, I'm just
        <a class="text-tomato" href="/catalogue">browsing</a>
      </div>
    </div>
  </section>


  <section class="hidden flex justify-center my-48">
    <a
      href="/catalogue"
      class="p-4 px-6 bg-primary text-white font-sigmar text-xl rounded">
      browse our catalogue
    </a>
  </section>


  <ShopFooter/>
</template>

<script setup>
import CartButton from '@/components/CartButton.vue'
import UserButton from '@/components/UserButton.vue'
import WareCard from '@/components/WareCard.vue'
import Carousel from '@/components/Carousel.vue'
import GalleryCarousel from '@/components/GalleryCarousel.vue'
import ShopHeader from '@/components/ShopHeader.vue'
import ShopFooter from '@/components/ShopFooter.vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import {nextTick, ref, onMounted, onUnmounted, computed} from 'vue';
import { useProductStore } from '@/stores/products'
import FromUnder from '@/components/FromUnder.vue'
import FromLeft from '@/components/FromLeft.vue'
import FromRight from '@/components/FromRight.vue'
import { eventBus } from '@/utils'


import {useTitle} from '@vueuse/core'
const title = useTitle("Stripe Shop")

const productStore = useProductStore()





/*
 * long1 and long2 paths are responsive: every frame they are made to fit the
 * document based on a number of beacons spread around the document
 */

// SVG path's d attribute value
var d = ref("M0 0");
var d2 = ref("M0,0");

// requestAnimationFrame handles
var requestId;  
var requestId2; 

onMounted(() => {
  adaptLong1();
  adaptLong2();
})

onUnmounted(() => {
  window.cancelAnimationFrame(requestId);
  window.cancelAnimationFrame(requestId2);
  requestId = requestId2 = undefined;
})


function adaptLong1() {
  requestId = window.requestAnimationFrame(adaptLong1); // loopь

  let gallerySVG = document.getElementById("gallery-svg");
  let rectSVG = gallerySVG.getBoundingClientRect();

  let beacons = {};
  for (let id of [0, 1, 2, 3, 4, 5, 6, 7, "babulka"]) {
    let el = document.getElementById("beacon-"+id)
    let rect = el.getBoundingClientRect();
    beacons[id] = {
      x: rect.x - rectSVG.x,
      y: rect.y - rectSVG.y
    };
  }
  
  let p = beacons; // for brevity

  d.value = `
    M ${p[0].x} ${p[0].y}

    L ${p[0].x+25} ${p['babulka'].y+100}
    L ${p[1].x} ${p[1].y-70}

    V${p[1].y}
    H${p[1].x}
    L${p[2].x} ${p[2].y}
    H${p[3].x}
    V${p[4].y}
    H${p[5].x}
    V${p[6].y}
    H${p[7].x}
    V${p[7].y}
    v45

    c3.42,253.24,-4.1,334.46,-121.1,333
    c-187.212,-1.17,-748.103,-42.89,-1046.63,-57.5
  `;
}


function adaptLong2() {
  requestId2 = window.requestAnimationFrame(adaptLong2); // loopь
  
  let svg2 = document.getElementById("comments-line");
  let rectSVG = svg2.getBoundingClientRect();
  let a = document.getElementById("beacon-a").getBoundingClientRect();
  a = {
    x: a.x - rectSVG.x,
    y: a.y - rectSVG.y
  };

  d2.value = `
    M 1366,11.5
    C 624,11.5, 512.877,83.612, 588,224.5
    C 881,774, 22.745,601.352, 17.753,856.303
    C 13.769,1059.702, 13.674,1818.28, 19.674,2067.78
    C 25.674,2317.28, ${a.x-214}, ${a.y+79} ${a.x}, ${a.y}
    c214,-79.5,179.5,-52,173.5,-38.5
  `;
}








//
// scroll-triggered animations
//


gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  init_spirals_animations();
  nextTick(init_long_animations);
})

const long1 = ref(null);
const long2 = ref(null);


let spirals = ref(null)

function init_spirals_animations () {
  for (let el of spirals.value.getElementsByTagName('img')) {
    if (el.classList.contains("skip"))
      continue;
    gsap.timeline({
      scrollTrigger: {
        trigger: "#spirals",
        start: "top 80%",
      }
    })
    .from(el, {
      delay: Math.random()%0.7,
      scale: 0.8,
      opacity: 0,
      ease: "back.out(2)",
      duration: 0.4,
    })
    .set(el, {
      // reset to allow responsiveness
      clearProps: "transform"
    })
  }
}

function init_long_animations () {
  gsap.set("#long1", {
    attr: {
      'stroke-dashoffset': 5000,
    }
  });

  gsap.set("#long2", {
    attr: {
      'stroke-dashoffset': 4000,
    }
  });

  gsap.to("#long1", {
    scrollTrigger: {
      preventOverlaps: "long",
      trigger: "#only-digital",
      start: "bottom bottom"
    },
    attr: {
      'stroke-dashoffset': 4650,
    },
    duration: 0.3,
  });


  let len = long1.value.getTotalLength();
  let tail = 1900;
  gsap.timeline({
    scrollTrigger: {
      preventOverlaps: "long",
      trigger: "#beacon-2",
      start: "bottom bottom"
    }
  })
  .to("#long1", {
    attr: {
      'stroke-dashoffset': tail+(5000-len),
    },
    ease: "power1.inOut",
    duration: 2,
  });


  gsap.timeline({
    scrollTrigger: {
      preventOverlaps: "long",
      trigger: "#beacon-b",
      start: "bottom bottom"
    },
    delay: 0.2
  })
  .to("#long1", {
    attr: {
      'stroke-dashoffset': 0,
    },
    ease: "expo.in",
    duration: 0.9,
  })
  .set("#long1", {
    attr: {
      // so as to let it resize peacefully after the animation has finished
      'stroke-dasharray': 0,
    }
  })
  .to("#long2", {
    attr: {
      'stroke-dashoffset': 3700,
    },
    ease: "power1.inOut",
    duration: 0.5,
  });


  gsap.timeline({
    scrollTrigger: {
      preventOverlaps: "long",
      trigger: "#comments",
    }
  })
  .to("#long2", {
    attr: {
      'stroke-dashoffset': 2100,
    },
    ease: "power1.inOut",
    duration: 0.8,
  })
  // .fromTo("#customers", {
  //   marginTop: 15,
  //   duration: 0.21,
  // }, {
  //   // in my firefox 78 gsap is unable to restore the transform set on the
  //   // element by someone else properly, wtf?
  //   marginTop: 60,
  //   ease: "back.out(2)",
  // }, "-=0.5")
  .from("#customers", {
    // this doesn't work properly in my firefox 78 (ends up at margin-top==0
    // instead of its initial value), but I haven't been able to find a way
    // to fix it without setting the starting/ending values explicitly(as can
    // be seen commented above), which is a) ugly, b) doesn't allow for the
    // animation to be responsive
    marginTop: 15,
    ease: "back.out(2)",
  }, "-=0.4")
  .set("#customers", {
    // so as to let it resize peacefully after the animation has finished
    clearProps: "margin-top"
  })
  .to(".say", {
    duration: 1.5,
    rotation: 20,
    ease: "elastic"
  }, "-=0.3")

  gsap.timeline({
    scrollTrigger: {
      preventOverlaps: "long",
      trigger: "#ring",
    },
  })
  .to("#long2", {
    attr: {
      'stroke-dashoffset': 1300,
    },
    ease: "power1.inOut",
    duration: 0.8,
  });

  gsap.timeline({
    scrollTrigger: {
      preventOverlaps: "long",
      trigger: "#sale"
    }
  })
  .to("#long2", {
    attr: {
      'stroke-dashoffset': 0,
    },
    immediateRender: false,
    ease: "expo.Out",
    duration: 1.1,
  })
  .set("#long2", {
    attr: {
      // so as to let it resize peacefully after the animation has finished
      strokeDasharray: 0
    }
  })
  .fromTo("#sale", {
    rotation: 0,
    duration: 0.4,
  }, {
    ease: "back.out(5)",
    rotation: -18
  }, "-=0.4");
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
