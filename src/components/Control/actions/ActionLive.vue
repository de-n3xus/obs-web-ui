<script setup>
import { Icon } from "@iconify/vue"
import { inject, onMounted, onUnmounted, ref } from "vue"
import client from "../../../utils/client.js"

const isLive = ref(false)
const isReconnecting = ref(false)

let interval = null

const getStatus = () => {
	client.call('GetStreamStatus')
		.then(data => {
			isLive.value = data.outputActive
			isReconnecting.value = data.outputReconnecting
		})
}

onMounted(() => {
	interval = setInterval(getStatus, 500)
	onUnmounted(() => clearInterval(interval))
})
</script>

<template>
	<button class="btn-primary">
		<Icon icon="ri:rfid-fill"
		      class="size-6"
		/>
	</button>
</template>

<style scoped lang="scss">

</style>