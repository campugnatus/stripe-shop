<template>
	<div class="h-20 w-full flex">
		<div class="border border-gray-400 h-full" style="aspect-ratio: 1"></div>
		<div class="ml-4 lg:ml-6 py-1 flex flex-col justify-between relative flex-grow overflow-hidden">
<!-- 			<button class="absolute right-0 top-0 p-2" title="Remove from cart">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
 -->
 			<div class="font-roboto truncate">Figurative red line for fuck's sake</div>
			<div class="flex items-center">
				<div class="text-lg text-gray-500">$0.99</div>
<!-- 				<div class="ml-4 flex h-8">
					<button class="w-8 bg-primary z-10 mr-[-1px] rounded-l text-white">-</button>
					<input type="text" class="w-12 text-center" value="1">
					<button class="w-8 bg-primary z-10 ml-[-1px] rounded-r text-white">+</button>
				</div> -->
				<div class="mx-4 text-gray-500">x</div>
				<select class="py-0.5 rounded font-bold text-lg border-gray-400 font-roboto w-16" value="1">
					<option>0</option>
					<option selected>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
					<option>6</option>
					<option>7</option>
					<option>8</option>
					<option>9</option>
				</select>
			</div>
		</div>
		<div class="hidden xs:flex py-1 h-full border-l flex-col justify-between items-end pl-5 lg:pl-6 ml-4 lg:ml-6 font-roboto border-primary">
			<button class="" title="Remove from cart">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			<div class="text-xl">$0.99</div>
		</div>
	</div>
</template>

<script setup>
	
</script>

<style>
	
</style>