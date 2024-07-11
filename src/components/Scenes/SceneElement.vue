<script setup>
import cn from "../../utils/cn.js"
import client from "../../utils/client.js"
import { inject, onMounted, onUnmounted, ref } from "vue"
import { toast } from "vue-sonner"

const props = defineProps({
	name: {
		required: true,
		type: String,
	},
	uuid: {
		required: true,
		type: String,
	},
	active: {
		required: true,
		type: Boolean,
	},
})

const updateScenes = inject('updateScenes')
const previewUuid = inject('previewUuid')
const editName = ref(false)
const nameModel = ref(props.name)

previewUuid.value = props.uuid

const setScene = async () => {
	await client.call('SetCurrentProgramScene', {
		sceneUuid: props.uuid,
	})

	previewUuid.value = props.uuid
	updateScenes.value = true
}

const saveSceneName = async () => {
	editName.value = false

	client.call('SetSceneName', {
		newSceneName: nameModel.value,
		sceneUuid: props.uuid,
	}).then(() => {
		toast.success("Scene name saved successfully.")
		updateScenes.value = true
	})
}
</script>

<template>
	<div>
		<button
			class="bg-backgroundSecondary pl-8 py-4 rounded-lg border transition cursor-pointer relative font-medium leading-none h-[50px]"
			:class="cn(props.active ? 'border-borderActive pr-4' : 'border-border pr-8', 'flex justify-center items-center gap-3')"
			@click="setScene"
			@dblclick="editName = true"
		>
			{{ props.name }}

			<img src="/icons/activeScene.svg"
			     alt="activeScene"
			     v-if="props.active"
			/>
		</button>

		<Transition enter-from-class="opacity-0"
		            leave-to-class="opacity-0"
		            enter-active-class="transition duration-150"
		            leave-active-class="transition duration-150"
		>
			<form v-if="editName"
			      class="modal"
			      @submit.prevent="saveSceneName"
			>
				<div class="modal-close" @click="editName = false; nameModel = props.name" />

				<div class="modal-content">
					<input
						type="text"
						class="w-full"
						placeholder="Scene name..."
						v-model="nameModel"
					/>

					<button type="submit" class="btn-primary">
						Save
					</button>
				</div>
			</form>
		</Transition>
	</div>
</template>

<style scoped lang="scss">

</style>