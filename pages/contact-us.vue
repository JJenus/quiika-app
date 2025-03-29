<script lang="ts"></script>

<template>
	<div id="kt_app_content" class="app-content flex-column-fluid container">
		<!--begin::Content container-->
		<div
			id="kt_app_content_container"
			class="app-container container-fluid"
		>
			<!--begin::Sitemap main-->
			<div class="d-flex flex-column flex-xl-row">
				<!--begin::Content-->
				<div class="card bg-body flex-row-fluid mb-9 mb-xl-0 me-xl-9">
					<div class="card-body">
						<!--begin::Form-->
						<form
							action="#"
							class="form mb-15"
							method="post"
							id="kt_contact_form"
						>
							<!--begin::Title-->
							<div class="d-flex flex-column mb-9 fv-row">
								<h1 class="fw-bold text-gray-900 mb-7">
									Contact Quiika Support
								</h1>

								<span
									class="fs-4 fw-semibold text-gray-600 d-block"
								>
									Need help with giveaways or transactions?
									Our team is here to assist you 24/7. <br />
									Average response time: under 2 hours for
									priority issues.
								</span>
							</div>
							<!--end::Title-->

							<!--begin::Input group-->
							<div class="row mb-5">
								<!--begin::Col-->
								<div class="col-md-6 fv-row">
									<!--begin::Label-->
									<label class="fs-5 fw-semibold mb-2"
										>Name</label
									>
									<!--end::Label-->

									<!--begin::Input-->
									<input
										type="text"
										class="form-control form-control-solid"
										placeholder="Your name"
										name="name"
									/>
									<!--end::Input-->
								</div>
								<!--end::Col-->

								<!--begin::Col-->
								<div class="col-md-6 fv-row">
									<!--end::Label-->
									<label class="fs-5 fw-semibold mb-2"
										>Email</label
									>
									<!--end::Label-->

									<!--end::Input-->
									<input
										type="text"
										class="form-control form-control-solid"
										placeholder="Your email"
										name="email"
									/>
									<!--end::Input-->
								</div>
								<!--end::Col-->
							</div>
							<!--end::Input group-->

							<!--begin::Input group-->
							<div class="d-flex flex-column mb-5 fv-row">
								<!--begin::Label-->
								<label class="fs-5 fw-semibold mb-2"
									>Subject</label
								>
								<!--end::Label-->

								<!--begin::Input-->
								<select
									class="form-select form-select-solid"
									name="subject"
								>
									<option value="">
										Select an issue type
									</option>
									<option value="giveaway">
										Giveaway Support
									</option>
									<option value="transaction">
										Transaction Issue
									</option>
									<option value="verification">
										Account Verification
									</option>
									<option value="business">
										Business Inquiry
									</option>
									<option value="other">Other</option>
								</select>
								<!--end::Input-->
							</div>
							<!--end::Input group-->

							<!--begin::Input group-->
							<div class="d-flex flex-column mb-10 fv-row">
								<label class="fs-6 fw-semibold mb-2"
									>Message</label
								>

								<textarea
									class="form-control form-control-solid"
									rows="6"
									name="message"
									placeholder="Describe your issue in detail..."
								></textarea>
							</div>
							<!--end::Input group-->

							<!--begin::Submit-->
							<button
								type="submit"
								class="btn btn-primary"
								id="kt_contact_submit_button"
							>
								<!--begin::Indicator label-->
								<span class="indicator-label">
									Submit Request</span
								>
								<!--end::Indicator label-->

								<!--begin::Indicator progress-->
								<span class="indicator-progress">
									Sending...
									<span
										class="spinner-border spinner-border-sm align-middle ms-2"
									></span>
								</span>
								<!--end::Indicator progress-->
							</button>
							<!--end::Submit-->
						</form>
						<!--end::Form-->

						<!--begin::Map-->
						<div
							id="kt_contact_map"
							class="w-100 rounded mb-2 mb-lg-0 mt-2"
							style="height: 486px"
						></div>
						<!--end::Map-->
					</div>
				</div>
				<!--end::Content-->

				<!--begin::Sidebar-->
				<div class="flex-column flex-lg-row-auto w-100 w-xl-350px">
					<!--begin::Support-->
					<div class="card card-flush bg-body mb-9">
						<!--begin::Card header-->
						<div class="card-header">
							<h2 class="card-title fs-2 fw-bold text-gray-900">
								Quick Support Channels
							</h2>

							<div class="card-toolbar">
								<button
									type="button"
									class="btn btn-sm btn-icon btn-color-primary"
								>
									<i class="ki-outline ki-phone fs-1"></i>
								</button>
							</div>
						</div>
						<!--end::Card header-->

						<!--begin::Card body-->
						<div class="card-body pt-2">
							<!--begin::Items-->
							<div class="mb-5">
								<!--begin::Item-->
								<div class="d-flex flex-stack mb-5">
									<span class="text-gray-500 fs-4 fw-bold"
										>Twitter Support</span
									>

									<a
										href="https://twitter.com/QuiikaSupport"
										class="text-gray-700 fs-4 fw-bold"
									>
										@QuiikaSupport
									</a>
								</div>
								<!--end::Item-->

								<!--begin::Item-->
								<div class="d-flex flex-stack mb-5">
									<span class="text-gray-500 fs-4 fw-bold"
										>Giveaway Help</span
									>

									<a
										href="mailto:giveaways@quiika.com"
										class="text-gray-700 fs-4 fw-bold"
									>
										giveaways@quiika.com
									</a>
								</div>
								<!--end::Item-->

								<!--begin::Item-->
								<div class="d-flex flex-stack">
									<span class="text-gray-500 fs-4 fw-bold"
										>App Support</span
									>

									<span class="text-gray-700 fs-4 fw-bold">
										In-app chat
									</span>
								</div>
								<!--end::Item-->
							</div>
							<!--end::Items-->

							<!--begin::Text-->
							<span
								class="text-gray-800 fs-6 fw-semibold d-block mb-9"
							>
								For urgent giveaway disputes or transaction
								issues, please use Twitter support for fastest
								response. Include giveaway tweet links for
								verification.
							</span>
							<!--end::Text-->

							<!--begin::Info-->
							<div class="d-flex flex-stack mb-6">
								<h2
									class="card-title fs-2 fw-bold text-gray-900"
								>
									Business Inquiries
								</h2>

								<div class="card-toolbar">
									<button
										type="button"
										class="btn btn-sm btn-icon btn-color-primary"
									>
										<i class="ki-outline ki-sms fs-2hx"></i>
									</button>
								</div>
							</div>
							<!--end::Info-->

							<!--begin::Items-->
							<div class="mb-4">
								<!--begin::Item-->
								<div class="d-flex flex-stack mb-5">
									<span class="text-gray-500 fs-4 fw-bold"
										>Partnerships</span
									>

									<a
										href="mailto:partners@quiika.com"
										class="text-gray-700 text-hover-primary fs-4 fw-bold"
										>partners@quiika.com</a
									>
								</div>
								<!--end::Item-->

								<!--begin::Item-->
								<div class="d-flex flex-stack">
									<span class="text-gray-500 fs-4 fw-bold"
										>Enterprise</span
									>

									<a
										href="mailto:enterprise@quiika.com"
										class="text-gray-700 text-hover-primary fs-4 fw-bold"
										>enterprise@quiika.com</a
									>
								</div>
								<!--end::Item-->
							</div>
							<!--end::Items-->
						</div>
						<!--end::Card body-->
					</div>
					<!--end::Support-->

					<!--begin::Connected-->
					<div class="card card-flush bg-body">
						<!--begin::Card header-->
						<div class="card-header">
							<h4 class="card-title fw-bold text-">
								Join Our Community
							</h4>
						</div>
						<!--end::Card header-->

						<!--begin::Card body-->
						<div class="card-body pt-2">
							<!--begin::Items-->
							<div class="mb-6">
								<!--begin::Link-->
								<a
									href="https://twitter.com/QuiikaApp"
									class="mb-6"
								>
									<img
										src="/assets/media/svg/brand-logos/twitter.svg"
										class="h-20px me-2"
										alt="Twitter"
									/>

									<span
										class="text-gray-700 text-hover-primary fs-5 mb-6"
										>Twitter</span
									>
								</a>
								<!--end::Link-->
							</div>
							<!--begin::Items-->

							<!--begin::Items-->
							<div class="mb-6">
								<!--begin::Link-->
								<a
									href="https://facebook.com/quiika"
									class="mb-6"
								>
									<img
										src="/assets/media/svg/brand-logos/facebook-3.svg"
										class="h-20px me-2"
										alt="Discord"
									/>

									<span
										class="text-gray-700 text-hover-primary fs-5 mb-6"
										>Facebook</span
									>
								</a>
								<!--end::Link-->
							</div>
							<!--begin::Items-->

							<!--begin::Items-->
							<div class="mb-6">
								<!--begin::Link-->
								<a
									href="https://t.me/quiika"
									class="mb-6"
								>
									<img
										src="/assets/media/svg/brand-logos/telegram.svg"
										class="h-20px me-2"
										alt="Telegram"
									/>

									<span
										class="text-gray-700 text-hover-primary fs-5 mb-6"
										>Telegram</span
									>
								</a>
								<!--end::Link-->
							</div>
							<!--begin::Items-->

							<!--begin::Items-->
							<div class="">
								<!--begin::Link-->
								<a
									href="https://instagram.com/quiikaapp"
									class="mb-6"
								>
									<img
										src="/assets/media/svg/brand-logos/instagram-2016.svg"
										class="h-20px me-2"
										alt="Instagram"
									/>

									<span
										class="text-gray-700 text-hover-primary fs-5 mb-6"
										>Instagram</span
									>
								</a>
								<!--end::Link-->
							</div>
							<!--begin::Items-->
						</div>
						<!--end::Card body-->
					</div>
					<!--end::Connected-->
				</div>
				<!--end::Sidebar-->
			</div>
			<!--end::Sitemap main-->
		</div>
		<!--end::Content container-->
	</div>
</template>
