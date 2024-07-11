<script setup>
import ScenesLayout from "./Scenes/ScenesLayout.vue"
import ControlLayout from "./Control/ControlLayout.vue"
import { provide, ref } from "vue"

const updateScenes = ref(false)
provide('updateScenes', updateScenes)
</script>

<template>
	<div class="max-w-screen-2xl w-full mx-auto px-4">
		<div class="min-h-screen h-full py-20 px-16 flex flex-col justify-between items-center">
			<div></div>
			<ScenesLayout />

			<ControlLayout />
		</div>
	</div>
</template>

<style scoped lang="scss">

</style>