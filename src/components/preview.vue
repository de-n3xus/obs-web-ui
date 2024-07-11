<script setup>
import { inject, onMounted, onUnmounted, ref } from "vue"
import client from "../utils/client.js"

const imageData = ref('')
const uuid = inject('previewUuid')

let updateInterval = null

const getImageData = () => {
	client.call('GetSourceScreenshot', {
		imageFormat: 'jpg',
		sourceUuid: uuid.value,
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