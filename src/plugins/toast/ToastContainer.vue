<template>
	<TransitionGroup tag="ul" name="toaster"
	                 class="fixed top-0 left-0 pb-10 h-full overflow-visible flex flex-col-reverse gap-4 bottom-10 left-0 h-full"
	                 @before-leave="beforeLeave">

		<ToastAlert v-for="toast in toasts.list"
					:key="toast.id"
					@close="removeToast(toast.id)"
					:toast="toast"/>
	</TransitionGroup>
</template>

<script setup>
import ToastAlert from './ToastAlert.vue'
import {toasts, removeToast} from '.'

function beforeLeave(el) {
	// hack around Vue's long standing inability to animate flexboxes, based on this post:
	// https://forum.vuejs.org/t/transition-group-leave-transition-w-position-absolute-jumping-to-top-left-flip/12258/1
	// wtf, Vue?

	const {y, height} = el.getBoundingClientRect()
	const {y: parentY, height: parentHeight} = el.offsetParent.getBoundingClientRect()
	const bottom = parentHeight - (y - parentY) - height

	el.style.bottom = bottom + "px"
}

</script>

<style>
/*
	So... I wasn't able to make the animations work well with transition-group
	and css transitions. Not sure who's the culprit, but the symptoms are as
	follows

	1. If toaster-leave-active class has "position: static", then all the
	leaving animations work perfectly, BUT the moving animations don't
	work at all: the elements just jump into place once the leaving
	animation is finished

	2. If toaster-leave-active class has "position: absolute" (as is
	recommended in the Vue docs), then the moving animations work nicely,
	BUT the leaving animations work improperly. How?

	Well, it depends on whether we set the element's "bottom" attribute in the
	fix above, but in either case the way the animation behaves is incorrect.

	How to reproduce: call showToast() rapidly a number of times, then close
	some of the toasts adjacent to each other in quick succession IN THE
	DIRECTION OF THE FLOW OF THE CONTAINER

	As far as I understand, it has something to do with the moment the browser
	recalculates the position of the element being in transition, making
	the element transition to its NEW position while still being drawn at
	the old one. Long story short, WT actual F...
*/


.toaster-move {
	transition: all 0.3s ease 0.2s;
}

.toaster-leave-active {
	/*transition: all 0.3s;*/
	animation: 0.3s ease-in toast-leave;
}
.toaster-enter-active {
	transform: translateX(-120%);
	animation: 0.4s linear 0.2s toast-enter;
	/*transition: all 0.3s;*/
}

.toaster-leave-active {
	/* ensure leaving items are taken out of layout flow so that moving
	   animations can be calculated correctly. */
   	position: absolute;
}

.toaster-enter-from {
	/*transform: translateX(-120%);*/
}
.toaster-leave-to {
	/*opacity: 0;*/
	/*transform: translate(-120%, 0);*/
}

@keyframes toast-enter {
	0% {
		transform: translateX(-120%);
	}
	40% {
		transform: translateX(0%) scale(1.1, 0.9);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes toast-leave {
	0% {
		transfrom: translate(0, 0) scale(1);
	}
	80% {
		transform: scaleX(1.1) scaleY(0.9);
	}
	100% {
		transform: translate(-120%, 0);
	}
}
</style>