<template>
	<div class="w-full bg-gray-50 border rounded p-3 px-4 flex">
		<div class="pr-4 hidden sm:block lg:hidden xl:block">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
			  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
			</svg>
		</div>

		<div class="w-full">
			<div class="flex justify-between items-center w-full">
				<svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-4 h-12 w-12 text-gray-300 sm:hidden lg:block xl:hidden" viewBox="0 0 20 20" fill="currentColor">
				  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
				</svg>
				<div class="font-bold text-gray-600 flex-grow overflow-hidden text-ellipsis w-0 max-h-12 sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">
					Aristarkh Borodulko
				</div>
				<div class="flex flex-col-reverse sm:flex-row lg:flex-col-reverse xl:flex-row gap-2">
					<div class="text-gray-500 ml-auto whitespace-nowrap pl-4 text-right">16 Jan 2020</div>
					<RatingStars :rating="3" class="h-5"/>

					<div class="hidden flex gap-1 ml-4 scale-75 sm:scale-100 origin-right">
						<svg width="22" height="22" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#24282B"/>
						</svg>
						<svg width="22" height="22" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#24282B"/>
						</svg>
						<svg width="22" height="22" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#24282B"/>
						</svg>
						<svg width="22" height="22" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#24282B"/>
						</svg>
						<svg width="22" height="22" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#24282B"/>
						</svg>
					</div>
				</div>
			</div>
			<div class="mt-3">
				This is not a bad stripe per se, just not really my cup of tea. Too plain for my taste. I hoped it would give it this solid serious kinda look, but in the hindsight I can say that it needs something else to play off of. Bit boring on it own, if I’m honest.
			</div>
		</div>
	</div>
</template>

<script setup>
import RatingStars from '@/components/RatingStars.vue'
</script>