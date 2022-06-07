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
			<div class="mt-3 markdown-rendered" v-html="clean"></div>
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
import DOMPurify from 'dompurify'
import { marked } from 'marked'

const props = defineProps({
	'review': {
		type: Object,
		required: true
	},
})

// disable links and images... do we really need all that? anything except
// paragraphs and (maybe) lists?
var renderer = new marked.Renderer();
renderer.link = (text) => text
renderer.image = (text, level) => text
// renderer.code = (text, level) => text
marked.use({ renderer })

const dirty = computed(() => marked.parse(props.review.text))
const clean = computed(() => DOMPurify.sanitize(dirty.value, { USE_PROFILES: { html: true } }))

const dateTitle = computed(() => {
	if (props.review.edited) {
		return "Created:   " + formatDateShort(props.review.date)
			+ "\nLast edit:  " + formatDateShort(props.review.edited)
	} else {
		return "Created: " + formatDateShort(props.review.date)
	}
})
</script>

<style>
.markdown-rendered {
	/* this is a hack... it prevents the container from growing because of
	   <pre> blocks in it */
	display: grid;
}

.markdown-rendered > * {
	@apply mt-2;
}

.markdown-rendered ul {
	@apply ml-4 list-disc
}


.markdown-rendered li {
	@apply mt-1 ml-4 list-disc
}
.markdown-rendered ol {
	@apply ml-4 list-decimal
}

.markdown-rendered h1 {
	@apply text-xl text-primary/80 font-bold pt-1.5
}

.markdown-rendered h2 {
	@apply text-lg text-primary/80 font-bold pt-1.5
}

.markdown-rendered h3 {
	@apply text-primary/80 font-bold italic pt-1.5
}

.markdown-rendered blockquote {
	@apply border-l-4 border-sky-800/30 pl-4 text-sky-900/60
}

.markdown-rendered pre {
	@apply leading-tight py-3 rounded-lg text-sm;

	overflow: auto;
	scrollbar-color: rgb(12 74 110 / 0.2) transparent;
}

.markdown-rendered pre::-webkit-scrollbar {
	@apply h-1.5 bg-transparent;
    /*background-color: transparent;*/
}

.markdown-rendered pre::-webkit-scrollbar-track {
    @apply rounded-full;
    background-color: ￼transparent;
}

.markdown-rendered pre::-webkit-scrollbar-thumb {
	@apply rounded-full bg-sky-900/20;
}

.markdown-rendered pre::-webkit-scrollbar-corner {
    background-color:￼transparent;
    border-color: transparent
}

.markdown-rendered code {
	/*@apply font-mono text-yellow-700/60*/
	@apply font-mono text-primary/70
}
</style>