<script setup lang="ts">
	// Can add reactive data here if needed
</script>

<template>
	<div
		class="d-flex flex-column content flex-column-fluid container-xxl fs-6"
		id="kt_content"
	>
		<div id="kt_content_container">
			<div class="card">
				<div class="card-body p-lg-17">
					<!-- Hero Section -->
					<div class="mb-18">
						<div class="mb-10">
							<div class="mb-15 text-center">
								<h3 class="fs-2hx mb-5 text-gray-900">
									<span class="text-primary">Q</span>uiika -
									Reinventing Digital Value Exchange
								</h3>
								<div class="fw-semibold text-muted fs-5">
									The future of transparent giveaways and
									peer-to-peer value transfer powered by our
									proprietary QUID system
								</div>
							</div>
							<div class="overlay">
								<img
									alt="Quiika Platform Interface"
									src="/assets/media/illustrations/sharing.png"
									class="card-rounded w-100"
								/>
								<div
									class="card-rounded bg-dark bg-opacity-25 overlay-layer"
								>
									<NuxtLink to="/" class="btn btn-primary">
										<i
											class="ki-duotone ki-rocket fs-2 me-2"
										>
											<span class="path1"></span>
											<span class="path2"></span>
										</i>
										Launch Your First Giveaway
									</NuxtLink>
								</div>
							</div>
						</div>

						<!-- Core Value Propositions -->
						<div class="fw-semibold fs-3 text-gray-600">
							<p class="mb-8">
								<span class="text-primary fw-bold"
									>QUID Technology:</span
								>
								At the heart of Quiika is our revolutionary QUID
								system - a digital value protocol that enables
								instant, verifiable transfers without
								traditional banking constraints. QUID represents
								real value stored securely in our ecosystem,
								redeemable anytime.
							</p>

							<div
								class="d-flex align-items-center mb-8 bg-light-primary rounded p-5"
							>
								<i
									class="ki-duotone ki-shield-tick fs-2hx text-primary me-5"
								>
									<span class="path1"></span>
									<span class="path2"></span>
								</i>
								<div>
									<h4 class="text-gray-800 fw-bold">
										Trust Through Transparency
									</h4>
									<p class="mb-0">
										Every giveaway result and QUID
										transaction is cryptographically
										verifiable via our public audit system.
										No more doubts about fairness or
										legitimacy.
									</p>
								</div>
							</div>

							<p class="mb-8">
								<span class="text-primary fw-bold"
									>For Creators & Businesses:</span
								>
								Quiika isn't just another payment app. Our
								giveaway tools help brands and influencers
								create buzz with provably fair campaigns. The
								QUID system ensures winners receive value
								instantly, eliminating payout delays.
							</p>

							<div class="row g-10 mb-8">
								<div class="col-md-6">
									<div
										class="bg-light-success rounded p-5 h-100"
									>
										<h4 class="text-gray-800 fw-bold">
											🎁 Smarter Gifting
										</h4>
										<p>
											Send QUID gifts that recipients can
											redeem as cash or use in our
											ecosystem. Perfect for birthdays,
											holidays, or just because.
										</p>
									</div>
								</div>
								<div class="col-md-6">
									<div
										class="bg-light-info rounded p-5 h-100"
									>
										<h4 class="text-gray-800 fw-bold">
											🤝 Peer-to-Peer Made Simple
										</h4>
										<p>
											Split bills, pay freelancers, or
											send money to family - all with
											QUID's near-instant settlement and
											low fees.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Stats Section -->
					<div class="bg-light card mb-18">
						<div class="card-body py-15">
							<div class="d-flex flex-center">
								<div
									class="d-flex flex-center flex-wrap gap-5 mb-10 mx-auto w-xl-900px"
								>
									<div
										class="d-flex flex-center bg-body h-200px mx-lg-10 octagon w-200px"
									>
										<div class="text-center">
											<i
												class="ki-duotone text-primary fs-2tx ki-abstract-26"
											>
												<span class="path1"></span>
												<span class="path2"></span>
											</i>
											<div class="mt-1">
												<div
													class="d-flex align-items-center fw-bold fs-2x fs-lg-2hx text-gray-800"
												>
													<div
														class="min-w-70px"
														data-kt-countup="true"
														data-kt-countup-value="250"
													>
														0
													</div>
													K+
												</div>
												<span
													class="fw-semibold fs-5 text-gray-600 lh-0"
													>Verified Giveaways</span
												>
											</div>
										</div>
									</div>
									<div
										class="d-flex flex-center bg-body h-200px mx-lg-10 octagon w-200px"
									>
										<div class="text-center">
											<i
												class="ki-duotone fs-2tx ki-money-bag text-success"
											>
												<span class="path1"></span>
												<span class="path2"></span>
											</i>
											<div class="mt-1">
												<div
													class="d-flex align-items-center fw-bold fs-2x fs-lg-2hx text-gray-800"
												>
													<div
														class="min-w-50px"
														data-kt-countup="true"
														data-kt-countup-value="15"
													>
														0
													</div>
													M+
												</div>
												<span
													class="fw-semibold fs-5 text-gray-600 lh-0"
													>QUID Transacted</span
												>
											</div>
										</div>
									</div>
									<div
										class="d-flex flex-center bg-body h-200px mx-lg-10 octagon w-200px"
									>
										<div class="text-center">
											<i
												class="ki-duotone fs-2tx ki-security-user text-info"
											>
												<span class="path1"></span>
												<span class="path2"></span>
												<span class="path3"></span>
											</i>
											<div class="mt-1">
												<div
													class="d-flex align-items-center fw-bold fs-2x fs-lg-2hx text-gray-800"
												>
													<div
														class="min-w-50px"
														data-kt-countup="true"
														data-kt-countup-value="99.9"
													>
														0
													</div>
													%
												</div>
												<span
													class="fw-semibold fs-5 text-gray-600 lh-0"
													>Payout Success Rate</span
												>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								class="fw-semibold text-muted fs-2 text-center mb-3"
							>
								<span class="fs-1 lh-1 text-gray-700">"</span>
								We built Quiika to solve one simple problem:
								<span class="text-primary">digital trust</span
								>.<br />
								The QUID system verifies every transaction so
								you don't have to take anyone's word for it.
								<span class="fs-1 lh-1 text-gray-700">"</span>
							</div>
							<div
								class="fw-semibold text-muted fs-2 text-center"
							>
								<span class="fw-bold text-gray-600 fs-4"
									>The Quiika Team</span
								>
							</div>
						</div>
					</div>

					<!-- CTA Section -->
					<div class="text-center mb-18">
						<h3 class="fs-2hx mb-5 text-gray-900">
							Ready to Experience Transparent Transactions?
						</h3>
						<div
							class="d-flex flex-center flex-wrap gap-5 justify-content-center"
						>
							<NuxtLink
								to="/"
								class="btn btn-primary btn-lg px-6"
							>
								<i class="ki-duotone ki-gift me-2">
									<span class="path1"></span>
									<span class="path2"></span>
									<span class="path3"></span>
									<span class="path4"></span>
								</i>
								Start gifting
							</NuxtLink>
							<NuxtLink
								to="/faqs"
								class="btn btn-light btn-lg px-6"
							>
								<i
									class="ki-duotone ki-information-2 fs-2 me-2"
								>
									<span class="path1"></span>
									<span class="path2"></span>
								</i>
								How QUID Works
							</NuxtLink>
						</div>
					</div>

					<!-- Social Proof -->
					<div class="bg-light card mb-4 text-center">
						<div class="card-body py-12">
							<h3 class="fs-2hx mb-5 text-gray-900">
								Join Our Community
							</h3>
							<p class="fw-semibold fs-5 text-muted mb-8">
								Connect with thousands of users who trust Quiika
								for transparent value exchange
							</p>
							<div
								class="d-flex flex-center flex-wrap gap-5 justify-content-center"
							>
								<a
									href="#"
									class="btn btn-icon btn-active-light btn-outline btn-outline-dashed btn-outline-primary btn-circle w-50px h-50px"
								>
									<i class="ki-duotone ki-facebook fs-2">
										<span class="path1"></span>
										<span class="path2"></span>
									</i>
								</a>
								<a
									href="#"
									class="btn btn-icon btn-active-light btn-outline btn-outline-dashed btn-outline-info btn-circle w-50px h-50px"
								>
									<i class="ki-duotone ki-twitter fs-2">
										<span class="path1"></span>
										<span class="path2"></span>
									</i>
								</a>
								<a
									href="#"
									class="btn btn-icon btn-active-light btn-outline btn-outline-dashed btn-outline-danger btn-circle w-50px h-50px"
								>
									<i class="ki-duotone ki-instagram fs-2">
										<span class="path1"></span>
										<span class="path2"></span>
									</i>
								</a>
								<a
									href="#"
									class="btn btn-icon btn-active-light btn-outline btn-outline-dashed btn-outline-dark btn-circle w-50px h-50px"
								>
									<i class="ki-duotone ki-github fs-2">
										<span class="path1"></span>
										<span class="path2"></span>
									</i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
