<script setup>
	
	const appSettings = useAppSettings();

	const toggleTheme = (themeMode) => {
		appSettings.themeMode.value = themeMode;
		KTThemeMode.setMode(themeMode);
	};
</script>

<template>
	<div
		id="kt_app_header"
		class="app-header d-flex border-0 py-10"
		:data-kt-sticky="false"
		data-kt-sticky-name="app-header-sticky"
		data-kt-sticky-offset="{default: 'false', lg: '300px'}"
	>
		<!--begin::Header container-->
		<div
			class="app-container container-fluid d-flex align-items-center justify-content-between"
			id="kt_app_header_container"
		>
			<!--begin::Logo-->
			<div class="d-flex d-lg-none align-items-center me-auto">
				<QuiikaLogo :classes="'h-40px ms-n3'" />
			</div>

			<div class="d-none d-lg-flex align-items-center">
				<QuiikaLogo :classes="'h-50px'" />
			</div>
			<!--end::Logo-->

			<Navbar />

			<!--begin::Navbar-->
			<div class="app-navbar flex-shrink-0" id="kt_app_aside_navbar">
				<!--begin::Login-->
				<div class="app-navbar-item ms-n3w">
					<!--begin::Menu- wrapper-->
					<button
						@click="toggleTheme('light')"
						class="btn btn-icon theme-dark-show rounded-circle btn-light-primary btn-active-light-primary"
					>
						<i class="ki-duotone ki-moon fs-2x">
							<span class="path1"></span>
							<span class="path2"></span>
						</i>
					</button>
					<button
						@click="toggleTheme('dark')"
						class="btn btn-icon theme-light-show rounded-circle btn-light-warning btn-active-light-warning"
					>
						<i class="ki-duotone ki-night-day fs-4x fs-md-3x">
							<span class="path1"></span>
							<span class="path2"></span>
							<span class="path3"></span>
							<span class="path4"></span>
							<span class="path5"></span>
							<span class="path6"></span>
							<span class="path7"></span>
							<span class="path8"></span>
							<span class="path9"></span>
							<span class="path10"></span>
						</i>
					</button>
					<!--end::Menu wrapper-->
				</div>
				<!--end::Login-->
			</div>
			<!--end::Navbar-->

			<!--begin::Sidebar toggle-->
			<div
				class="d-flex d-lg-none align-items-center me-n1 ms-3 d-none"
				title="Show sidebar menu"
			>
				<button
					class="btn btn-icon btn-icon-white btn-active-icon-white btn-active-color-white w-35px h-35px"
					id="kt_app_sidebar_mobile_toggle"
				>
					<i class="ki-solid ki-burger-menu-5 fs-3x"></i>
				</button>
			</div>
			<!--end::Sidebar toggle-->
		</div>
		<!--end::Header container-->
	</div>
</template>
