<script setup lang="ts">
	import { ref, watch } from "vue";
	import { useRoute } from "vue-router";

	const route = useRoute();
	const activeTab = ref("send"); // Default tab
	const options = ref([
		{ name: "Send", path: "send" },
		{ name: "Rules", path: "rules" },
		{ name: "Claim", path: "claim" },
	]);

	// Watch for hash changes
	watch(
		() => route.hash, // Watch the hash value in the route
		(newHash) => {
			const hash = newHash.replace("#", "");
			if (options.value.find((e) => e.path === hash)) {
				activeTab.value = hash; 
			}
		},
		{ immediate: true } 
	);
</script>

<template>
	<div class="container-fluid">
		<div class="d-flex justify-content-center">
			<div
				class="card min-h-md-600px min-w-md-700px"
				bis_skin_checked="1"
			>
				<!--begin::Header-->
				<div
					class="card-header position-relative min-h-50px p-0 border-bottom-2"
					bis_skin_checked="1"
				>
					<!--begin::Nav-->
					<ul
						class="nav nav-pills nav-pills-custom d-flex position-relative justify-content-between flex-fill"
						role="tablist"
					>
						<!--begin::Item-->
						<li
							v-for="option in options"
							class="nav-item mx-0 flex-fill"
							role="presentation"
						>
							<!--begin::Link-->
							<NuxtLink
								class="nav-link btn btn-color-muted border-0 h-100 px-0"
								:class="{ active: activeTab === option.path }"
								:to="`/#${option.path}`"
								role="tab"
							>
								<!--begin::Subtitle-->
								<span class="nav-text fw-bold fs-4 mb-3">
									{{ option.name }}
								</span>
								<!--end::Subtitle-->

								<!--begin::Bullet-->
								<span
									class="bullet-custom position-absolute z-index-2 w-100 h-2px top-100 bottom-n100 bg-primary rounded"
								></span>
								<!--end::Bullet-->
							</NuxtLink>
							<!--end::Link-->
						</li>
						<!--end::Item-->
					</ul>
					<!--end::Nav-->
				</div>
				<!--end::Header-->

				<!--begin::Body-->
				<div class="card-body" bis_skin_checked="1">
					<!--begin::Tab Content-->
					<div class="tab-content" bis_skin_checked="1">
						<!--begin::Tap pane-->
						<div
							class="tab-pane fade"
							:class="{ 'active show': activeTab === 'send' }"
							role="tabpanel"
							bis_skin_checked="1"
						>
							<Send />
						</div>
						<!--end::Tap pane-->

						<!--begin::Tap pane-->
						<div
							class="tab-pane fade"
							:class="{ 'active show': activeTab === 'claim' }"
							role="tabpanel"
							bis_skin_checked="1"
						>
							<Claim />
						</div>
						<!--end::Tap pane-->

						<!--begin::Tap pane-->
						<div
							class="tab-pane fade"
							:class="{ 'active show': activeTab === 'rules' }"
							role="tabpanel"
							bis_skin_checked="1"
						>
							<QuiikaRules quid="" />
						</div>
						<!--end::Tap pane-->
					</div>
					<!--end::Tab Content-->
				</div>
				<!--end: Card Body-->
			</div>
		</div>
	</div>
</template>
