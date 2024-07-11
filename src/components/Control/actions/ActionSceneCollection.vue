<script setup>
import { Icon } from "@iconify/vue"
import { inject, onMounted, onUnmounted, ref } from "vue"
import client from "../../../utils/client.js"
import { onClickOutside } from '@vueuse/core'
import cn from "../../../utils/cn.js"

const updateScenes = inject('updateScenes')

const collections = ref([])
const currentCollection = ref('')

const showDropdown = ref(false)
const target = ref(null)

onClickOutside(target, () => {
	showDropdown.value = false
})

const getScenes = () => {
	client.call('GetSceneCollectionList')
		.then(data => {
			collections.value = data.sceneCollections || []
			currentCollection.value = data.currentSceneCollectionName || ''
			updateScenes.value = true
		})
}

onMounted(() => {
	getScenes()

	client.on('CurrentSceneCollectionChanged', (data) => {
		currentCollection.value = data.sceneCollectionName || ''
		updateScenes.value = true
	})

	client.on('SceneCollectionListChanged', (data) => {
		collections.value = data.sceneCollections || []
		updateScenes.value = true
	})

	client.on('CurrentSceneChanged', () => {
		client.call('GetSceneCollectionList')
			.then(data => {
				collections.value = data.sceneCollections || []
				currentCollection.value = data.currentSceneCollectionName || ''
				updateScenes.value = true
			})
	})
})

const setProfile = (scene) => {
	showDropdown.value = false

	client.call('SetCurrentSceneCollection', {
		sceneCollectionName: scene,
	})

	updateScenes.value = true
}
</script>

<template>
	<div class="relative" ref="target">
		<button class="btn-primary group"
		        @click="showDropdown = !showDropdown"
		>
			<Icon icon="ion:grid"
			      class="size-6 group-hover:text-white"
			/>

			{{ currentCollection }}
		</button>

		<div class="absolute bottom-11 left-0 bg-[#979797]/5 backdrop-blur-sm flex flex-col gap-2 items-start p-[10px] text-sm font-medium"
		     :class="cn('rounded-lg min-w-fit border border-borderSecondary text-left')"
		     v-if="showDropdown"
		>
			<template v-for="scene in collections">
				<button @click="setProfile(scene)"
				        class="w-full p-[8px] font-medium leading-none bg-backgroundThird rounded-[8px]"
				>
					{{ scene }}
				</button>
			</template>
		</div>
	</div>
</template>

<style scoped lang="scss">

</style>