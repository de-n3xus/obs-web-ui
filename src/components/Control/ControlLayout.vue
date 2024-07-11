<script setup>
import ActionLive from "./actions/ActionLive.vue"
import { onMounted, onUnmounted, provide, ref, watch } from "vue"
import client from "../../utils/client.js"
import ActionRecord from "./actions/ActionRecord.vue"
import ActionFullscreen from "./actions/ActionFullscreen.vue"
import ActionProfile from "./actions/ActionProfile.vue"
import ActionSceneCollection from "./actions/ActionSceneCollection.vue"
import ActionVirtualCam from "./actions/ActionVirtualCam.vue"
import cn from "../../utils/cn.js"

let heartbeatInterval = null
const heartbeat = ref({})

const updateHeartbeat = ref(false)

provide("heartbeat", heartbeat)
provide("updateHeartbeat", updateHeartbeat)

const getHeartbeat = async () => {
	const stats = await client.call('GetStats')
	const streaming = await client.call('GetStreamStatus')
	const recording = await client.call('GetRecordStatus')
	heartbeat.value = { stats, streaming, recording }
}

watch(updateHeartbeat, () => {
	getHeartbeat()
	updateHeartbeat.value = false
})

onMounted(() => {
	setInterval(getHeartbeat, 1000)

	onUnmounted(() => clearInterval(heartbeatInterval))
})
</script>

<template>
	<div class="flex flex-col gap-2">
		<div :class="cn(
			'flex justify-center items-center flex-wrap gap-[10px] bg-backgroundSecondary',
				'px-[12px] py-[10px] border border-border rounded-[14px] w-fit mx-auto'
			)"
		>
			<!-- <ActionLive /> -->
			<ActionRecord />

			<ActionProfile />

			<ActionSceneCollection />

			<ActionVirtualCam />

			<ActionFullscreen />
		</div>

		<p class="opacity-80 text-sm text-center" v-if="heartbeat && heartbeat.stats">
			{{ Math.round(heartbeat.stats.activeFps) }} fps,
			{{ Math.round(heartbeat.stats.cpuUsage) }}% CPU,
			{{ heartbeat.stats.renderSkippedFrames }} skipped frames
		</p>
	</div>
</template>

<style scoped lang="scss">

</style>