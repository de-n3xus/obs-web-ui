<script setup>
import { Icon } from "@iconify/vue"
import { inject, onMounted, onUnmounted, ref } from "vue"
import client from "../../../utils/client.js"
import { onClickOutside } from '@vueuse/core'
import cn from "../../../utils/cn.js"

const updateScenes = inject('updateScenes')

const profiles = ref([])
const currentProfile = ref('')

const showDropdown = ref(false)
const target = ref(null)

onClickOutside(target, () => {
	showDropdown.value = false
})

const getProfiles = () => {
	client.call('GetProfileList')
		.then(data => {
			profiles.value = data.profiles || []
			currentProfile.value = data.currentProfileName || ''
			updateScenes.value = true
		})
}

onMounted(() => {
	getProfiles()

	client.on('CurrentProfileChanged', (data) => {
		currentProfile.value = data.profileName || ''
		updateScenes.value = true
	})

	client.on('ProfileListChanged', (data) => {
		profiles.value = data.profiles || []
		updateScenes.value = true
	})

	client.on('CurrentProfileChanged', () => {
		getProfiles()
	})
})

const setProfile = (profile) => {
	showDropdown.value = false

	client.call('SetCurrentProfile', {
		profileName: profile,
	})

	updateScenes.value = true
}
</script>

<template>
	<div class="relative" ref="target">
		<button class="btn-primary group"
		        @click="showDropdown = !showDropdown"
		>
			<Icon icon="ri:user-smile-fill"
			      class="size-6 group-hover:text-white"
			/>

			{{ currentProfile }}
		</button>

		<div class="absolute bottom-11 left-0 bg-backgroundThird flex flex-col items-start gap-0 text-sm font-medium"
		     :class="cn('rounded-lg min-w-fit border border-borderSecondary text-left')"
		     v-if="showDropdown"
		>
			<template v-for="profile in profiles">
				<button @click="setProfile(profile)" class="hover:bg-backgroundSecondary px-4 py-2 transition w-full">
					{{ profile }}
				</button>
			</template>
		</div>
	</div>
</template>

<style scoped lang="scss">

</style>