<script setup>
import { Icon } from "@iconify/vue"
import { inject } from "vue"
import client from "../../../utils/client.js"
import { Duration } from "luxon"
import formatTime from "../../../utils/formatTime.js"

const updateHeartbeat = inject('updateHeartbeat')

const heartbeat = inject('heartbeat')
</script>

<template>
	<template v-if="heartbeat && heartbeat?.recording">
		<button class="btn-primary group"
		        v-if="heartbeat?.recording?.outputActive && !heartbeat?.recording?.outputPaused"
		        @click="client.call('PauseRecord'); updateHeartbeat = true"
		>
			<Icon icon="ion:pause"
			      class="size-6 group-hover:text-yellow-400"
			/>
		</button>

		<button class="btn-primary group"
		        v-else-if="heartbeat?.recording?.outputPaused"
		        @click="client.call('ResumeRecord'); updateHeartbeat = true"
		>
			<Icon icon="ph:play-pause-fill"
			      class="size-6 group-hover:text-yellow-400"
			/>
		</button>

		<button class="btn-primary group"
		        v-if="heartbeat?.recording?.outputActive"
		        @click="client.call('StopRecord'); updateHeartbeat = true"
		>
			<Icon icon="bi:stop-fill"
			      class="size-6 group-hover:text-red-500"
			/>

			{{ formatTime(heartbeat?.recording?.outputDuration) }}
		</button>

		<button class="btn-primary group"
		        v-else
		        @click="client.call('StartRecord'); updateHeartbeat = true"
		>
			<Icon icon="solar:play-bold"
			      class="size-6 group-hover:text-blue-500"
			/>
		</button>
	</template>
</template>

<style scoped lang="scss">

</style>