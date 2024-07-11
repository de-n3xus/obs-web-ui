<script setup>
import ScenesLayout from "./Scenes/ScenesLayout.vue"
import ControlLayout from "./Control/ControlLayout.vue"
import { computed, onMounted, onUnmounted, provide, ref } from "vue"

const updateScenes = ref(false)
provide('updateScenes', updateScenes)

const points = ref(new Array(16).fill(0).map(() => [Math.random(), Math.random()]))

const poly = computed(() => points.value.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(', '))

function jumpVal (val) {
	return Math.random() > 0.5 ? val + (Math.random() - 0.5) / 2 : Math.random()
}

let timeout

function jumpPoints () {
	for (let i = 0; i < points.value.length; i++) {
		points.value[i] = [jumpVal(points.value[i][0]), jumpVal(points.value[i][1])]
	}

	timeout = setTimeout(jumpPoints, 2000 + Math.random() * 1000)
}

onMounted(() => {
	jumpPoints()
	onUnmounted(() => clearTimeout(timeout))
})
</script>

<template>
	<div class="max-w-screen-2xl w-full mx-auto px-4 relative">
		<div class="min-h-screen h-full py-4 min-[500px]:py-20 px-4 min-[500px]:px-16 flex flex-col justify-between items-center">
			<div></div>
			<ScenesLayout />

			<ControlLayout />
		</div>

		<div class="bg absolute inset-0 -z-[1] transform-gpu blur-3xl overflow-hidden" aria-hidden="true">
			<div
				class="aspect-[1.7] h-full w-full bg-gradient-to-r from-cyan-400 to-white/10 lg:opacity-30 xs:opacity-50"
				:style="{ 'clip-path': `polygon(${poly})` }"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.bg > div {
	clip-path: circle(75%);
	transition: clip-path 3s;
}

.light .bg > div {
	opacity: 1 !important;
}
</style>