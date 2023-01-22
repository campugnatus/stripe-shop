<template>
	<ShopHeader/>

	<article
		class="max-w-screen-md mx-auto px-4 sm:px-6 lg:mt-32 about-markdown-rendered"
		v-html="clean">
	</article>

	<div class="max-w-screen-md mx-auto px-4 sm:px-6 text-right text-sm leading-6">
		<pre>
		Andrey Shevchuk
		campugnatus@gmail.com
		shevchuk.net
		</pre>
	</div>

	<ShopFooter/>
</template>

<script setup>
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import ShopFooter from '@/components/ShopFooter.vue'
import ShopHeader from '@/components/ShopHeader.vue'
import { computed, onMounted, inject } from 'vue'

import { useTitle } from '@vueuse/core'
useTitle("About", {titleTemplate: inject('titleTemplate')})

const dirty = computed(() => marked.parse(raw))
const clean = computed(() => DOMPurify.sanitize(dirty.value, { USE_PROFILES: { html: true } }))

const raw = `

# about

At the risk of stating the obvious, this is a joke shop. As such, I don't know
if it's funny or what, but that it's not serious, I hope, raises no doubt.

If you encounter any flaws or have suggestions with regard to either visual
design, or the UX, or the inner-workings, feel free to let me know either by
writing me an email or [opening an issue on GitHub](https://github.com/campugnatus/stripe-shop/issues/new).
If there's anything wrong with my English, don't hesitate to mention that, as
well :)

## technical overview

I used **figma** for interface prototyping. The site is built as a single page
application using **Vue 3** (with **vite** and **pinia**) as the frontend
framework. The CSS framework is **tailwind**. The animation is done
using **gsap**. On the backend there's **node.js** with **express.js** framework
and **SQLite** as the database.

**Docker** is used for both development and production. The whole thing is
deployed on a VPS (running **debian**) behind an **nginx** reverse-proxy. Email notifications are
delivered by **exim** set up on the same server... we'll see how that goes.

What else should I mention?

I dunno
`
</script>

<style>
	.about-markdown-rendered {
		/* this is a hack... it prevents the container from growing because of
		   <pre> blocks in it */
		display: grid;
	}

	.about-markdown-rendered > * {
		@apply mt-2;
	}

	.about-markdown-rendered > hr {
		@apply my-4;
	}

	.about-markdown-rendered > p {
		@apply mt-3;
	}

	.about-markdown-rendered ul {
		@apply ml-4 list-disc
	}

	.about-markdown-rendered a {
		@apply text-tomato font-bold
	}

	.about-markdown-rendered strong {
		@apply text-tomato
	}

	.about-markdown-rendered li {
		@apply mt-1 ml-4 list-disc
	}
	.about-markdown-rendered ol {
		@apply ml-4 list-decimal
	}

	.about-markdown-rendered h1 {
		@apply text-6xl text-primary font-pacifico font-normal pt-1.5 my-12
	}

	.about-markdown-rendered h2 {
		@apply text-4xl text-primary font-pacifico font-normal pt-1.5 mt-20 mb-8
	}

	.about-markdown-rendered h3 {
		@apply text-primary/80 font-bold italic pt-1.5
	}

	.about-markdown-rendered blockquote {
		@apply border-l-4 border-sky-800/30 pl-4 text-sky-900/60
	}

	.about-markdown-rendered pre {
		@apply leading-tight rounded-lg text-sm;

		overflow: auto;
		scrollbar-color: rgb(12 74 110 / 0.2) transparent;
	}

	.about-markdown-rendered pre::-webkit-scrollbar {
		@apply h-1.5 bg-transparent;
	    /*background-color: transparent;*/
	}

	.about-markdown-rendered pre::-webkit-scrollbar-track {
	    @apply rounded-full;
	    background-color: ￼transparent;
	}

	.about-markdown-rendered pre::-webkit-scrollbar-thumb {
		@apply rounded-full bg-sky-900/20;
	}

	.about-markdown-rendered pre::-webkit-scrollbar-corner {
	    background-color:￼transparent;
	    border-color: transparent
	}

	.about-markdown-rendered code {
		/*@apply font-mono text-yellow-700/60*/
		@apply font-mono text-primary/70
	}
</style>