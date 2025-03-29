<script setup lang="ts">
	const route = useRoute();
	const activePath = ref(route.path);

	watch(
		() => route.path,
		(newPath) => {
			activePath.value = newPath;
			console.log("Path changed:", newPath);
		}
	);
</script>

<template>
	<div class="d-none d-md-block">
		<ul
			class="nav nav-stretch nav-pills nav-pills-custom d-flex mt-4 align-items-center fs-5 fw-bold"
		>
			<!--begin::Nav item-->
			<li
				v-for="nav in navs"
				class="nav-item p-0 ms-0"
				role="presentation"
			>
				<NuxtLink
					class="nav-link btn btn-color-gray-500 flex-center px-3"
					:class="{
						active: activePath === nav.path,
					}"
					:to="nav.path"
					:aria-selected="activePath === nav.path"
					tabindex="-1"
				>
					<!--begin::Title-->
					<span class="nav-text mb-3">{{ nav.name }}</span>
					<!--end::Title-->

					<!--begin::Bullet-->
					<span
						class="bullet-custom position-absolute z-index-2 w-100 h-3px top-100 bottom-n100 bg-primary rounded"
					></span>
					<!--end::Bullet-->
				</NuxtLink>
			</li>
			<!--end::Nav item-->
		</ul>
	</div>
</template>
