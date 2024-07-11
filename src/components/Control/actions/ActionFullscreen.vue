<script setup>
import { Icon } from "@iconify/vue"
import { useFullscreen } from "@vueuse/core"

const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>

<template>
	<button class="btn-primary group"
			@click="toggle"
	>
		<Icon icon="material-symbols:aspect-ratio"
			  class="size-6 group-hover:text-white"
		/>
	</button>
</template>

<style scoped lang="scss">

</style>