<script setup>
import { Icon } from "@iconify/vue"
import { inject } from "vue"

const showPreview = inject('showPreview')
</script>

<template>
	<button class="btn-primary group"
			@click="showPreview = !showPreview"
	>
		<Icon icon="fluent:window-20-filled"
		      class="size-6"
		/>
	</button>
</template>

<style scoped lang="scss">

</style>