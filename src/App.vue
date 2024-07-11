<script setup>
import { Toaster } from "vue-sonner"
</script>

<template>
	<div>
		<RouterView />

		<Toaster position="top-center"
		         theme="dark"
		/>
	</div>
</template>

<style scoped lang="scss">

</style>
