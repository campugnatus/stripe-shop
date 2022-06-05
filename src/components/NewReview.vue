<template>
	<div
		v-if="!userStore.signedIn"
		class="border-2 rounded border-dashed h-[86px] flex justify-center items-center text-xl text-gray-400">
		Sign in to leave a review
	</div>

	<button
		v-else-if="!editing && !review"
		@click="edit()"
		class="w-full border-2 rounded border-dashed h-[86px] flex justify-center items-center text-xl text-gray-400 hover:border-gray-300 hover:text-gray-500">
		Like this stripe? Leave a review!
	</button>

	<div v-else-if="editing" class="w-full border rounded p-3 px-4 flex bg-blue-50 border-blue-200 text-sky-900">
		<div class="shrink-0 pr-4 hidden sm:block lg:hidden xl:block">
			<img v-if="userpic" :src="userpic" class="rounded-full h-12 w-12">
			<UserCircleIcon v-else class="h-12 w-12 text-gray-300"/>
		</div>

		<div class="w-full">
			<div class="flex justify-between items-center w-full">
				<div class="mr-4 sm:hidden lg:block xl:hidden shrink-0 h-12 w-12">
					<img v-if="userpic" :src="userpic" class="rounded-full border-2 border-transparent">
					<UserCircleIcon v-else class="text-gray-300 "/>
				</div>

				<div class="font-bold text-sky-900/70 flex-grow overflow-hidden text-ellipsis w-0 max-h-12 sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">
					{{username}}
				</div>
				<div class="flex flex-col-reverse sm:flex-row lg:flex-col-reverse xl:flex-row gap-2">
					<RatingStars interactive :rating="rating" @set="setRating" class="h-7 text-sky-900/60 hover:text-tomato/80"/>
				</div>
			</div>
			<form @submit.prevent="postReview">
				<div class="relative mt-3">
					<!-- the auto-resizing textarea trick -->
					<div class="invisible border h-full min-h-[4.5em] p-2.5 w-full whitespace-pre-wrap">
						{{text+"\n"}}
					</div>
					<textarea
						v-model="text"
						class="border w-full absolute h-full top-0 left-0 overflow-hidden p-2.5 border-blue-200 rounded  min-h-[4.5em] placeholder:text-sky-900/50 resize-none focus:ring-sky-700/80 focus:border-sky-700/80"
						rows="2"
						placeholder="Write your review here (optional)">
					</textarea>
				</div>
				<div class="flex justify-end mt-3">
					<button
						@click="editing = false"
						class="flex items-center justify-center mr-2 bg-white border border-blue-200 text-gray-600 hover:text-sky-900 p-3 py-1.5 rounded text-sky-900/70">
						Cancel
					</button>
					<button
						type="submit"
						class="bg-sky-900/60 hover:bg-sky-900/70 p-3 py-1.5 rounded  text-white --text-sky-900/60">
						Submit review
					</button>
				</div>
			</form>
		</div>
	</div>

	<div v-else-if="review">
		<UserReview :review="review" class="border-b-0 rounded-b-none bg-blue-50 border-blue-200"/>
		<button
			@click="edit()"
			class="w-full bg-blue-50 border rounded-b border-blue-200 flex justify-center items-center p-2 text-blue-900/40 hover:bg-blue-100 hover:text-blue-900/50 group">
			<PencilIcon class="h-6 text-blue-900/40 group-hover:text-blue-900/50 mr-2"/> Edit your review
		</button>
	</div>
</template>

<script setup>
import RatingStars from '@/components/RatingStars.vue'
import UserReview from '@/components/UserReview.vue'
import {StarIcon, UserCircleIcon, PencilIcon, } from '@heroicons/vue/solid'
import {PencilIcon as HollowPencilIcon, PencilAltIcon} from '@heroicons/vue/outline'
import {useProductStore} from '@/stores/products.js'
import {useUserStore} from '@/stores/user.js'
import {showToast} from '@/plugins/toast'
import {ref, computed} from 'vue'

const props = defineProps({
	id: {
		type: String,
		required: true
	},
	review: Object
})

const userStore = useUserStore()
const username = computed(() => userStore.profile?.name)

const productStore  = useProductStore()

const editing = ref(false)
const text = ref("")
const rating = ref()

const userpic = computed(() => props.review?.userpic || userStore.profile?.picture)

function edit () {
	editing.value = true
	text.value = props.review?.text || ""
	rating.value = props.review?.rating || 0
}

function postReview () {
	if (rating.value === 0) {
		showToast.error("Please rate the product")
		return
	}

	productStore.postReview({
		rating: rating.value,
		text: text.value,
		id: props.id
	})
	.then(() => {
		showToast.success("Your review has been posted!")
		editing.value = false
	})
}

function setRating (val) {
	rating.value = val
}
</script>