<script setup lang="ts">
	defineProps<{
		classes?: string;
		appClass?: string;
		appClassDark?: string;
	}>();

	const config = useRuntimeConfig().public;
</script>

<template>
	<NuxtLink
		to="/"
		class="d-flex align-items-center justify-content-center position-relative m-0 p-0"
	>
		<img
			alt="Logo"
			src="/assets/media/logos/quiika-logo.png"
			:class="classes"
			class=""
		/>
	</NuxtLink>
</template>
