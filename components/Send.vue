<script setup lang="ts">
	import { ref } from "vue";
	import { useBlockUI } from "~/composables/useBlockUI";
	import type { EventMessage } from "~/utils/interfaces/EventMessage";
	import {
		TransactionStatus,
		type Transaction,
		type TransactionResponse,
	} from "~/utils/interfaces/Transaction";

	import axios from "axios";

	import Cleave from "vue-cleave-component";
	import moment from "moment";

	const CONFIG = useRuntimeConfig().public;
	const API = CONFIG.BE_API;

	const { getFractionalCurrency, getMoney, formatFractionalCurrency } =
		useAppSettings();

	const email = ref("");
	const amount = ref("");
	const showForm = ref(true);

	const eventSource = ref<EventSource | null>();

	const transactionResponse = ref<TransactionResponse | null>({
		quid: "TZIOMSUY",
		currency: "NGN",
		amount: 80800,
		status: TransactionStatus.COMPLETED,
		timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
		transactionId: "Wie94ijEURI-kdiUU80",
	});

	const { toggleBlock } = useBlockUI("tokenize-form");

	const loader = ref({
		initiating: false,
		processing: false,
	});

	const checkAmount = () => {
		const inputAmount = getMoney(amount.value);
		const is = inputAmount > 100_000;

		return is;
	};

	const initSSEListener = (sessionId: string) => {
		if (eventSource.value) eventSource.value.close();

		// Listen to the SSE
		eventSource.value = new EventSource(`${API}/sse/connect/${sessionId}`);
		toggleBlock();

		eventSource.value.onmessage = (event) => {
			const sseData: EventMessage<TransactionResponse> = JSON.parse(
				event.data
			);

			console.log(sseData);
			loader.value.processing = false;
			toggleBlock();

			// Hide the form
			showForm.value = false;

			transactionResponse.value = sseData.message;

			const status = sseData.message.status.toLocaleLowerCase();

			successAlert("Transaction " + status);
			if (eventSource.value) eventSource.value.close();

			// if (
			// 	sseData.event === "PAYMENT" &&
			// 	sseData.message.status === TransactionStatus.COMPLETED
			// ) {
			// 	// Handle successful payment
			// 	alert("Payment successful!");
			// 	eventSource.close();
			// }
		};

		eventSource.value.onerror = (error) => {
			console.error("SSE error:", error);
			if (eventSource.value) eventSource.value.close();
		};
	};

	const send = async () => {
		if (checkAmount()) return;

		try {
			loader.value.initiating = true;

			const response = await axios.post<Transaction>(
				`${API}/transactions`,
				{
					email: email.value,
					amount: getFractionalCurrency(amount.value),
				}
			);

			const data = response.data;

			loader.value.initiating = false;
			loader.value.processing = true;

			// Open the Paystack URL in a new tab
			window.open(data.authorizationUrl, "_blank");

			initSSEListener(data.sessionId!);
		} catch (error) {
			console.error("There was a problem with the request:", error);

			// Display the error message to the user
			if (axios.isAxiosError(error)) {
				// Axios error with a response from the server
				console.log(
					`Error: ${
						error.response?.data?.message || "An error occurred"
					}`
				);
			} else if (error instanceof Error) {
				// Generic error
				console.log(`Error: ${error.message}`);
			} else {
				// Unknown error
				console.log("An unexpected error occurred");
			}
			loader.value.processing = false;
		} finally {
			loader.value.initiating = false;
		}
	};

	useSeoMeta({
		title: `${CONFIG.APP} - Share freely`,
	});

	const statusColor = (status: TransactionStatus) => {
		return status === TransactionStatus.COMPLETED
			? "success"
			: status === TransactionStatus.PENDING
			? "light-warning"
			: "light-danger";
	};

	onMounted(() => {
		// toggleBlock();
	});
</script>

<template>
	<div>
		<!--begin::Card-->
		<div
			id="tokenize-form"
			class="card card-custom bg-light-successi border-0 h-md-100 mb-5 mb-lg-10"
		>
			<!--begin::Body-->
			<div
				v-if="showForm"
				class="card-body d-flex align-items-center justify-content-center flex-wrap px-auto gap-8 gap-md-10"
			>
				<!--begin::Wrapper-->
				<div class="flex-grow-1 mt-2 me-9 me-md-6 mb-8">
					<div class="mb-5">
						<h1 class="display-6">
							<span class="text-success">Gift</span> Easily
						</h1>
						<h6 class="text-muted">Be anonymous.</h6>
					</div>
					<div
						class="position-relative text-gray-800 fs-2 z-index-2 fw-bold mb-5"
					>
						Send With Ease
					</div>

					<form @submit.prevent="send" class="h-100">
						<div class="mb-5">
							<label
								for="amount"
								class="form-label required fw-bold"
							>
								Amount
							</label>

							<cleave
								type="text"
								name="amount"
								class="form-control form-control-solidi form-control-lg text-centeri fw-bold"
								:options="{
									numeral: true,
									numeralThousandsGroupStyle: 'thousand',
									numeralDecimalMark: '.', // Specifies the decimal mark
									numeralDecimalScale: 2, // Allows up to 8 decimal places
									numeralIntegerScale: 15, // Adjust as needed (max integer length)
								}"
								:class="
									checkAmount()
										? 'border-danger border-3 is-invalid'
										: ''
								"
								placeholder="Enter amount"
								v-model="amount"
							/>
						</div>
						<div class="mb-5">
							<label
								for="email"
								class="form-label required fw-bold"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								v-model="email"
								class="form-control form-control-solidi form-control-lg"
							/>
						</div>
						<button
							:disabled="loader.initiating"
							class="btn btn-primary w-100"
						>
							<span v-if="!loader.initiating"> Proceed </span>
							<span v-else>
								Please wait...
								<span
									class="spinner-border spinner-border-sm"
								></span>
							</span>
						</button>
					</form>
				</div>
				<!--begin::Wrapper-->

				<!--begin::Illustration-->
				<img
					src="/assets/media/illustrations/misc/credit-card.png"
					class="h-175px me-auto"
					alt=""
				/>
				<!--end::Illustration-->
			</div>
			<!--end::Body-->

			<div v-else-if="transactionResponse" class="card-body min-w-500px">
				<div
					class="d-print-none border border-dashed border-gray-300 card-rounded h-lg-100 min-w-md-350px p-9 bg-lighten"
					bis_skin_checked="1"
				>
					<!--begin::Labels-->
					<div class="mb-8">
						<span
							:class="
								'badge-' +
								statusColor(transactionResponse.status)
							"
							class="badge me-2"
							>{{ transactionResponse.status }}</span
						>
					</div>
					<!--end::Labels-->

					<!--begin::Title-->
					<h6
						class="mb-8 fw-bolder text-capitalize text-gray-600 text-hover-primary"
					>
						TRANSACTION DETAILS
					</h6>
					<!--end::Title-->

					<!--begin::Item-->
					<div class="mb-6" bis_skin_checked="1">
						<div
							class="fw-semibold text-gray-600 fs-7"
							bis_skin_checked="1"
						>
							Amount:
						</div>

						<div
							class="fw-bold text-gray-800 fs-6"
							bis_skin_checked="1"
						>
							{{ transactionResponse.currency }}
							{{
								formatFractionalCurrency(
									transactionResponse.amount,
									""
								)
							}}
						</div>
					</div>
					<!--end::Item-->

					<!--begin::Item-->
					<div class="mb-6" bis_skin_checked="1">
						<div
							class="fw-semibold text-gray-600 fs-7"
							bis_skin_checked="1"
						>
							QUID:
						</div>

						<div
							class="fw-bold text-gray-800 fs-6"
							bis_skin_checked="1"
						>
							{{ transactionResponse.quid }}
						</div>
					</div>
					<!--end::Item-->

					<div class="mb-6" bis_skin_checked="1">
						<div
							class="fw-semibold text-gray-600 fs-7"
							bis_skin_checked="1"
						>
							Transaction ID:
						</div>

						<div
							class="fw-bold fs-6 text-gray-800 d-flex align-items-center"
							bis_skin_checked="1"
						>
							{{ transactionResponse.transactionId }}
						</div>
					</div>

					<!--begin::Item-->
					<div class="mb-15" bis_skin_checked="1">
						<div
							class="fw-semibold text-gray-600 fs-7"
							bis_skin_checked="1"
						>
							Transaction Date:
						</div>

						<div
							class="fw-bold fs-6 text-gray-800 d-flex align-items-center"
							bis_skin_checked="1"
						>
							{{ transactionResponse.timestamp }}

							<span
								class="fs-7 text-success d-flex align-items-center"
							>
								<span
									class="bullet bullet-dot bg-danger mx-2"
								></span>

								{{
									moment(
										transactionResponse.timestamp
									).fromNow()
								}}
							</span>
						</div>
					</div>
					<!--end::Item-->

					<!--begin::Title-->
					<h6 class="mb-2 fw-bolder text-gray-600 text-hover-primary">
						Seamlessly withdraw access funds with the Quiika Pay
						Unique ID (QUID)
					</h6>
					<!--end::Title-->
					<div
						class="fw-bold fs-6 text-gray-800"
						bis_skin_checked="1"
					>
						<a href="#" class="link-primary ps-1"
							>Withdraw to local bank account</a
						>
					</div>
				</div>
			</div>
		</div>
		<!--end::Card-->
	</div>
</template>
