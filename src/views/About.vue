<template>
	<ShopHeader/>

	<article
		class="max-w-screen-md mx-auto md:px-6 lg:mt-32 markdown-rendered"
		v-html="clean">
	</article>

	<ShopFooter/>
</template>

<script setup>
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import ShopFooter from '@/components/ShopFooter.vue'
import ShopHeader from '@/components/ShopHeader.vue'
import { computed } from 'vue'

import { useTitle } from '@vueuse/core'
const title = useTitle("About", {titleTemplate: '%s • Stripe shop'})


const dirty = computed(() => marked.parse(raw))
const clean = computed(() => DOMPurify.sanitize(dirty.value, { USE_PROFILES: { html: true } }))

const raw = `

# About

At the risk of stating the obvious, this is a joke shop. As such, I don't know
if it's that funny or what, but that it's not serious, I hope, raises no doubt.

However! While a toy project, and a comparatively small one, my intention was
to make it a fully functional, real world, production quality shop, not just
a proof of concept or a half-assed example.

Making a real-world something always entails having to solve many problems
that usually don't get much attention in a demo environment, such as error
handling, or adaptiveness of the design, for example.

So, if you encounter any flaws or have suggestions with regard to either the
UX or the inner-workings, feel free to let me know either by writing me an
email or opening an issue on GitHub. If there's anything wrong with my
English, don't hesitate to mention that, as well :)


## Technical overview

The site is build as an **SPA** (signle page application), using **Vue 3** for
the frontend framework. CSS framework is **Tailwind**. The API server
runs **node.js** with **express.js** framework and **SQLite** as the
database, all of that behind an **nginx** proxy, which also serves the static
content. It uses **docker** for both development and production, running two
containers, one for the static content and the proxy, and another for the API
server. The site is running on a VPS.

`
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

	.markdown-rendered > hr {
		@apply my-4;
	}

	.markdown-rendered > p {
		@apply mt-3;
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
		@apply text-5xl text-primary font-pacifico font-normal pt-1.5 my-12
	}

	.markdown-rendered h2 {
		@apply text-3xl font-pacifico text-primary font-normal pt-1.5 mt-16 mb-2
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