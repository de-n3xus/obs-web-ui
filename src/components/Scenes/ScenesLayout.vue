<script setup>
import { inject, onMounted, onUnmounted, provide, ref, watch } from "vue"
import client from "../../utils/client.js"
import SceneElement from "./SceneElement.vue"

const scenes = ref({})
const current = ref('')

const updateScenes = inject('updateScenes')

const getScenes = async () => {
	client.call('GetSceneList')
		.then(data => {
			scenes.value = data
			current.value = data.currentProgramSceneUuid
		})
}

let scenesInterval = null

watch(updateScenes, () => {
	getScenes()
	updateScenes.value = false
})

onMounted(() => {
	getScenes()

	scenesInterval = setInterval(() => getScenes(), 500)
	onUnmounted(() => clearInterval(scenesInterval))
})
</script>

<template>
	<div>
		<div class="flex justify-center items-center gap-x-6 gap-y-4 w-full">
			<template v-for="scene in scenes.scenes">
				<SceneElement :uuid="scene.sceneUuid"
				              :name="scene.sceneName"
				              :active="current === scene.sceneUuid"
				/>
			</template>
		</div>
	</div>
</template>

<style scoped lang="scss">

</style>