<script setup lang="ts">
	defineProps<{
		classes?: string;
		appClass?: string;
		textClass?: string;
	}>();

	const { APP } = useRuntimeConfig().public;
</script>

<template>
	<a href="/" class="d-flex algin-items-center gap-3 justify-content-center">
		<img
			alt="Logo"
			src="/assets/media/logos/quiika-logo.png"
			:class="classes"
		/>
		<span
			:class="textClass"
			class="fw-bold theme-dark-show fs-1 text-white mt-2"
			>{{ APP }}</span
		>
		<span
			:class="textClass"
			class="fw-bold theme-light-show fs-1 text-primary mt-2"
			>{{ APP }}</span
		>
	</a>
</template>
