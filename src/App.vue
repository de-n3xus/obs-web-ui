<script setup>
import { Toaster } from "vue-sonner"
import { onMounted, onUnmounted, ref } from "vue"
import client from "./utils/client.js"
import { Icon } from "@iconify/vue"

let clientInterval = null
const allowLoad = ref(false)

onMounted(() => {
	clientInterval = setInterval(() => {
		client.call('GetSceneCollectionList')
			.then(() => {
				clearInterval(clientInterval)

				setTimeout(() => allowLoad.value = true, 1000)
			})
	}, 100)

	onUnmounted(() => clearInterval(clientInterval))
})
</script>

<template>
	<div>
		<RouterView v-if="allowLoad" />

		<div v-else class="fixed top-0 left-0 w-full h-full min-h-screen flex flex-col justify-center items-center">
			<Icon icon="tdesign:load" class="animate-spin text-3xl" />
		</div>

		<Toaster position="top-center"
		         theme="dark"
		/>
	</div>
</template>

<style scoped lang="scss">

</style>
