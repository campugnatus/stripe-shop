<template>
	<ShopHeader/>

	<section class="w-80 mx-auto sm:container lg:hidden px-3 md:px-6 mt-32 mb-5 flex justify-between">
		<div>
			<label class="mr-4 hidden sm:inline">Sort by:</label>
			<select class="bg-white border px-2 py-1 rounded border-gray-400">
				<option>Curated</option>
				<option>Highest rated first</option>
				<option>Cheapest first</option>
				<option>Most expensive first</option>
			</select>
		</div>
		<button class="flex items-center">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
			</svg>
			<span class="ml-2 hidden sm:block">Filters</span>
		</button>
	</section>

	<main class="md:px-6 flex container mx-auto lg:mt-32">
		<aside class="w-64 h-screen font-roboto flex-shrink-0 hidden lg:block">
			<h2 class="text-2xl mb-2">Sort by</h2>
			<select class="bg-white border px-2 py-1 rounded border-gray-400">
				<option>Curated</option>
				<option>Highest rated first</option>
				<option>Cheapest first</option>
				<option>Most expensive first</option>
			</select>

			<h2 class="text-2xl mb-2 mt-8">Colors</h2>
			<div><input type="checkbox" class="mr-2"> Monochrome</div>
			<div><input type="checkbox" class="mr-2"> Variegated</div>

			<div class="mt-3"></div>
			<div><input type="checkbox" class="mr-2"> Dark</div>
			<div><input type="checkbox" class="mr-2"> Light</div>

			<div class="mt-3"></div>
			<div><input type="checkbox" class="mr-2"> Saturated</div>
			<div><input type="checkbox" class="mr-2"> Washed-out</div>
			
			<div class="mt-3"></div>
			<div><input type="checkbox" class="mr-2 rounded-full"> Grayscale</div>
			<div><input type="checkbox" class="mr-2 rounded-full bg-red-600 border-red-500"> Red</div>
			<div><input type="checkbox" class="mr-2 rounded-full"> Green</div>
			<div><input type="checkbox" class="mr-2 rounded-full"> Blue</div>
			<div><input type="checkbox" class="mr-2 rounded-full"> Yellow</div>

			<h2 class="text-2xl mb-2 mt-8">Shape</h2>
			<div><input type="checkbox" class="mr-2"> Straight</div>
			<div><input type="checkbox" class="mr-2"> Curvy</div>
			<div><input type="checkbox" class="mr-2"> Squiggly</div>
			<div><input type="checkbox" class="mr-2"> Zig-zaggy</div>

			<h2 class="text-2xl mb-2 mt-8">Tags</h2>

		</aside>

		<main class="w-80 mx-auto sm:w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/>
			
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/>
			
			
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/>
			
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/>
			
			
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/>
			
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/> 
			<WareCard/>
			
		</main>
	</main>

	<ShopFooter/>
</template>

<script setup>
import WareCard from '@/components/WareCard.vue'
import ShopHeader from '@/components/ShopHeader.vue'
import ShopFooter from '@/components/ShopFooter.vue'

</script>

<style>
</style>