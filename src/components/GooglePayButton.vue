<template>
	<div ref="container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
	price: {
		type: String,
		required: true
	}
})

const emits = defineEmits(["paid"])

const container = ref(null)

const baseRequest = {
	apiVersion: 2,
	apiVersionMinor: 0
}

const baseCardPaymentMethod = {
	type: 'CARD',
	parameters: {
		allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
		allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
	}
}

const cardPaymentMethod = {
	...baseCardPaymentMethod,
	tokenizationSpecification: {
		type: 'PAYMENT_GATEWAY',
		parameters: {
			'gateway': 'example',
			'gatewayMerchantId': 'exampleGatewayMerchantId'
		}
	}
}

let paymentsClient

onMounted(async () => {
	paymentsClient = new google.payments.api.PaymentsClient({environment: 'TEST'})

	let response = await paymentsClient.isReadyToPay({
		...baseRequest,
		allowedPaymentMethods: [baseCardPaymentMethod]
	})

	if (!response.result) {
		console.error("payment client not ready: no result", response)
		return
	}

	const button = paymentsClient.createButton({
	    allowedPaymentMethods: [baseCardPaymentMethod],
	    buttonSizeMode: 'fill',
		onClick
    })
	container.value.appendChild(button)
})


async function onClick() {
	let paymentData = await paymentsClient.loadPaymentData({
		...baseRequest,
		allowedPaymentMethods: [cardPaymentMethod],
		transactionInfo: {
			totalPriceStatus: 'FINAL',
			totalPrice: props.price,
			currencyCode: 'USD', // huh?
			countryCode: 'US' // uh... 
		},
		merchantInfo: {
			merchantName: 'Stripe shop',
			merchantId: '12345678901234567890'
		}
	})

	let paymentToken = paymentData.paymentMethodData.tokenizationData.token
	emits('paid', paymentToken)
	log("got payment token", paymentToken)
}
</script>