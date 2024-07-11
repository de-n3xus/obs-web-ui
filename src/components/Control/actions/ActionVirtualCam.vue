<script setup>
import { Icon } from "@iconify/vue"
import { onMounted, ref } from "vue"
import client from "../../../utils/client.js"
import cn from "../../../utils/cn.js"

const isActive = ref(false)

const getStatus = () => {
	client.call('GetVirtualCamStatus')
		.then(data => {
			isActive.value = data.outputActive
		})
}

onMounted(() => {
	getStatus()

	client.on('VirtualcamStateChanged', (data) => {
		isActive.value = data.outputActive
	})
})
</script>

<template>
	<button class="btn-primary group"
	        @click="client.call('ToggleVirtualCam')"
	>
		<Icon icon="bi:camera-fill"
		      class="size-6"
		      :class="cn(isActive ? 'text-blue-500 group-hover:text-red-500' : 'group-hover:text-blue-500')"
		/>
	</button>
</template>

<style scoped lang="scss">

</style>