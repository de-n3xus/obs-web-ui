<script setup>
import { onMounted, onUnmounted, ref } from "vue"
import client from "../utils/client.js"
import { useRoute } from "vue-router"

const imageData = ref('')
const uuid = useRoute().params.uuid

let updateInterval = null

const getImageData = () => {
	client.call('GetSourceScreenshot', {
		imageFormat: 'webp',
		sourceUuid: uuid,
	}).then(data => imageData.value = data.imageData)
}

onMounted(() => {
	getImageData()

	setInterval(getImageData, 50)

	onUnmounted(() => {
		clearInterval(updateInterval)
	})
})
</script>

<template>
	<div class="min-h-screen w-full h-full flex justify-center items-center">
		<img :src="imageData"
		     alt=""
		/>
	</div>
</template>

<style scoped lang="scss">

</style>