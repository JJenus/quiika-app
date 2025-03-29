<script setup>
	import QuiikaLogo from "./QuiikaLogo.vue";

	const config = useRuntimeConfig().public;
</script>

<template>
	<!--begin::Footer container-->
	<div
		class="app-container card container-fluid fs-5 pt-10 mt-10 py-3"
		style="border-radius: 0"
	>
		<div class="row row-cols-1 row-cols-md-2 g-5 justify-content-between">
			<!--begin::About Section-->
			<div class="col-md-4 order-2 order-md-1">
				<div class="d-flex flex-column align-items-center mb-6">
					<div
						class="d-flex flex-row align-items-center justify-content-center mb-3"
					>
						<QuiikaLogo :classes="'h-50px'" :text-class="'mt-3'" />
					</div>
					<p class="text-center p-4">
						At <strong>Quiika</strong>, we empower individuals and
						businesses to send and receive funds effortlessly,
						fostering financial inclusion and enabling seamless
						transactions across diverse communities. Our innovative
						QUID system ensures secure, fast, and reliable access to
						funds, helping build a more connected and equitable
						financial ecosystem.
					</p>
				</div>
			</div>
			<!--end::About Section-->

			<!--begin::Stay Informed Section-->
			<div class="col-md-5">
				<h2 class="fs-2qx text-danger mb-4">Stay Informed</h2>
				<p class="mb-3">
					Reach us on <br />
					<strong>support@quiika.com</strong>
				</p>
				<p class="mb-4">
					Don’t miss out! Subscribe to our newsletter for updates.
				</p>
				<div class="d-flex align-items-center">
					<div class="position-relative me-3 flex-grow-1">
						<i
							class="ki-outline ki-sms fs-3 position-absolute top-50 translate-middle-y ms-4"
						></i>
						<input
							type="email"
							class="form-control w-100 ps-12"
							placeholder="Enter your email"
							aria-label="Email"
						/>
					</div>
					<button class="btn btn-danger">Subscribe</button>
				</div>
			</div>
			<!--end::Stay Informed Section-->
		</div>

		<!--begin::Footer Bottom-->
		<div
			class="d-flex flex-column flex-md-row mt-9 align-items-center justify-content-between border-top pt-4"
		>
			<!--begin::Copyright-->
			<div class="px-md-2 fs-6 text-center text-md-start">
				<span
					>Copyright © 2023 {{ config.APP }}. All rights
					reserved.</span
				>
			</div>
			<!--end::Copyright-->

			<!--begin::Footer Links-->
			<ul
				class="menu menu-gray-600 menu-hover-primary fw-semibold d-flex flex-wrap justify-content-center gap-3 mt-3 mt-md-0"
			>
				<li class="menu-item">
					<NuxtLink to="/about" class="menu-link px-2">
						About
					</NuxtLink>
				</li>
				<li class="menu-item">
					<NuxtLink to="/contact-us" class="menu-link px-2">
						Contact Us
					</NuxtLink>
				</li>
				<li class="menu-item">
					<NuxtLink to="/faqs" class="menu-link px-2">
						FAQs
					</NuxtLink>
				</li>
				<li class="menu-item">
					<NuxtLink to="/terms" class="menu-link px-2">
						Terms and Conditions
					</NuxtLink>
				</li>
			</ul>
			<!--end::Footer Links-->
		</div>
		<!--end::Footer Bottom-->
	</div>
	<!--end::Footer container-->
</template>
