<template>
	<div class="rounded-md border shadow-sm overflow-hidden">
		<section class="bg-gray-50 md:border-b grid md:flex">
			<section class="row-start-1 p-3 pl-4 pr-8 md:border-r flex items-center md:justify-center shrink-0">
				<table class="">
					<tr>
						<td class="pr-6 p-1">Order #</td>
						<td class="p-1 text-blue-500">
							<router-link :to="'/order/'+order.id">{{order.id}}</router-link>
						</td>
					</tr>
					<tr>
						<td class="pr-6 p-1 text-base text-gray-500">Created</td>
						<td class="p-1">{{formatDate(timeCreated)}}</td>
					</tr>
					<tr>
						<td class="pr-6 p-1 text-base text-gray-500">Total amount</td>
						<td class="p-1">${{order.price}}</td>
					</tr>
				</table>
			</section>

			<section class="row-start-3 p-4 bg-white md:bg-gray-50 relative md:pl-8 shrink max-h-24 overflow-hidden">
				<transition
					v-for="upd, i in updates"

					enter-active-class="transition duration-700 delay-150 ease-out"
					enter-from-class="-translate-y-24"
					enter-to-class="translate-y-0"

					leave-active-class="absolute transition max-w-full duration-200 origin-center ease-in"
					leave-from-class="translate-y-0 opacity-100"
					leave-to-class="translate-y-10 opacity-0">

					<div v-if="i===0" :key="upd.status">
						<OrderStatus lg :status="upd" class="inline-block mr-3 md:mb-3"/>
						&shy; <!-- wrap here -->
						<span v-if="upd.date" class="inline-block text-sm text-gray-400">
							{{ formatDate(updates[0].date) }}
						</span>
					</div>
				</transition>
			</section>

			<section class="row-start-2 md:ml-auto p-4 border-b text-center flex md:flex-col justify-between shrink-0">
				<router-link
					class="block p-1 text-blue-500 flex items-center"
					:to="'/order/'+order.id">
					View order details
				</router-link>
				<div>
					<a
						:class="{'invisible': !order.package}"
						class="block p-3 py-1.5 w-full rounded bg-white border text-gray-500 hover:border-gray-300"
						:href="api.baseURL+'/package/'+order.package">
						Download <DownloadIcon class="inline w-6"/>
					</a>
				</div>
			</section>
		</section>

		<section class="p- flex flex-wrap --space-x-20 --space-y-4">
			<OrderedItem class="w-64 m-4" v-for="item in order.items" :item="item"/>
		</section>
	</div>
</template>

<script setup>
import OrderedItem from '@/components/OrderedItem.vue'
import OrderStatus from '@/components/OrderStatus.vue'
import { ref, watch, computed } from 'vue'
import { DownloadIcon } from '@heroicons/vue/solid'
import { useUserStore, useOrderUpdates } from '@/stores/user'
import {formatDate} from '@/utils'
import api from '@/api'

const props = defineProps({
	order: {
		type: Object,
		required: true
	}
})

const userStore = useUserStore()
const order = computed(() => props.order)
const timeCreated = computed(() => userStore.timeCreated(props.order.id))
const updates = useOrderUpdates(order)
</script>