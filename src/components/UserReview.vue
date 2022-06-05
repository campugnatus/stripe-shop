<template>
	<div class="w-full bg-gray-50 border rounded p-3 px-4 flex">
		<div class="shrink-0 pr-4 hidden sm:block lg:hidden xl:block">
			<img v-if="review.userpic" :src="review.userpic" class="rounded-full h-12 w-12">
			<UserCircleIcon v-else class="h-12 w-12 text-gray-300"/>
		</div>

		<div class="w-full">
			<div class="flex justify-between items-center w-full">
				<div class="mr-4 sm:hidden lg:block xl:hidden shrink-0 h-12 w-12">
					<img v-if="review.userpic" :src="review.userpic" class="rounded-full border-2 border-transparent">
					<UserCircleIcon v-else class="text-gray-300 "/>
				</div>

				<div class="font-bold text-gray-600 flex-grow overflow-hidden text-ellipsis w-0 max-h-12 sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">
					{{review.username}}
				</div>
				<div class="flex items-end flex-col-reverse sm:flex-row sm:items-center lg:flex-col-reverse lg:items-end xl:flex-row xl:items-center">
					<div
						:title="dateTitle"
						class="flex items-center text-gray-500 ml-auto whitespace-nowrap text-right mt-1 sm:mt-0 lg:mt-1 xl:mt-0">
						<PencilAltIcon v-if="review.edited" class="w-4 mr-1"/>
						{{formatDateShort(review.date)}}
					</div>
					<RatingStars :rating="review.rating" class="ml-3 mb-0.5 h-5"/>
				</div>
			</div>
			<div class="mt-3">
				{{review.text}}
			</div>
		</div>
	</div>
</template>

<script setup>
import RatingStars from '@/components/RatingStars.vue'
import { StarIcon, UserCircleIcon } from '@heroicons/vue/solid'
import { PencilAltIcon } from '@heroicons/vue/outline'
import { useProductStore } from '@/stores/products'
import { formatDateShort } from '@/utils'
import { computed } from 'vue'

const props = defineProps({
	'review': {
		type: Object,
		required: true
	},
})


const dateTitle = computed(() => {


	if (props.review.edited) {
		return "Created:   " + formatDateShort(props.review.date)
			+ "\nLast edit:  " + formatDateShort(props.review.edited)
	} else {
		return "Created: " + formatDateShort(props.review.date)
	}
})
</script>