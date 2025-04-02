<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import axios from "axios";
	import Cleave from "vue-cleave-component";

	import { useBlockUI } from "~/composables/useBlockUI";
	import type { EventMessage } from "~/utils/interfaces/EventMessage";
	import {
		TransactionStatus,
		type Transaction,
	} from "~/utils/interfaces/Transaction";
	import type { Bank } from "~/utils/interfaces/Bank";

	const CONFIG = useRuntimeConfig().public;
	const API = CONFIG.BE_API;
	console.log(API);

	const { getFractionalCurrency, getMoney, formatFractionalCurrency } =
		useAppSettings();

	// Form object to group all fields
	const form = ref({
		quid: "",
		accountName: "",
		accountNumber: "",
		amount: "",
		bankCode: "",
		bankName: "",
	});

	const inputErrors = ref({
		quid: {
			isValid: true,
			errorMessage: "Invalid QUID",
		},
		accountName: {
			isValid: true,
			errorMessage: "Invalid account",
		},
		accountNumber: {
			isValid: true,
			errorMessage: "Invalid account number",
		},
		amount: {
			isValid: true,
			errorMessage: "Invalid amount",
		},
		bankCode: {
			isValid: true,
			errorMessage: "Invalid bank code",
		},
		bankName: {
			isValid: true,
			errorMessage: "Bank not supported",
		},
	});

	const showForm = ref(false);
	const banks = ref<Bank[]>([]);
	const quidResponse = ref<Transaction | null>(null);

	const { toggleBlock } = useBlockUI("withdrawal-form");

	const loader = ref({
		fetchingBanks: false,
		verifyingQuid: false,
		processing: false,
	});

	// Fetch list of banks
	const fetchBanks = async () => {
		try {
			loader.value.fetchingBanks = true;
			const response = await axios.get<Bank[]>(
				`${API}/transactions/banks`
			);
			banks.value = response.data;
		} catch (error) {
			console.error("Failed to fetch banks:", error);
		} finally {
			loader.value.fetchingBanks = false;
		}
	};

	// Verify QUID
	const verifyQuid = async () => {
		if (!form.value.quid) {
			return;
		}

		try {
			loader.value.verifyingQuid = true;
			const response = await axios.get<Transaction>(
				`${API}/transactions/verify/${form.value.quid}`
			);
			quidResponse.value = response.data;
			console.log(response.data);
			form.value.amount = formatFractionalCurrency(
				quidResponse.value.amount
			);

			inputErrors.value.quid.isValid = true;

			showForm.value = true; // Show withdrawal form after successful verification
		} catch (error) {
			console.error("Failed to verify QUID:", error);
			inputErrors.value.quid.isValid = false;
		} finally {
			loader.value.verifyingQuid = false;
		}
	};

	// Submit withdrawal request
	const submitWithdrawal = async () => {
		if (
			!form.value.accountName ||
			!form.value.accountNumber ||
			!form.value.amount ||
			!form.value.bankCode
		) {
			warningAlert("Please fill in all required fields.");
			return;
		}

		try {
			loader.value.processing = true;
			const response = await axios.post(`${API}/withdrawal-request`, {
				quid: form.value.quid,
				accountName: form.value.accountName,
				accountNumber: form.value.accountNumber,
				amount: getFractionalCurrency(form.value.amount),
				bank: form.value.bankName,
				bankCode: form.value.bankCode,
				currency: "NGN",
			});

			if (response.status === 200) {
				console.log("Withdrawal request submitted successfully!");
				successAlert(response.data.message || "Withdrawal Processed");
				// showForm.value = false; // Hide form after successful submission
			}
		} catch (error) {
			console.error("Failed to submit withdrawal request:", error);
			errorAlert("An error occurred. Please try again.");
		} finally {
			loader.value.processing = false;
		}
	};

	const fetchAccountDetails = async () => {
		if (!form.value.bankCode || form.value.accountNumber.length < 10) {
			return;
		} else {
			console.log("Fetching data...");
		}

		try {
			// loader.value.verifyingQuid = true;
			const response = await axios.post<any>(
				`${API}/transactions/banks/resolve-name`,
				{
					accountNumber: form.value.accountNumber,
					bankCode: form.value.bankCode,
				}
			);
			console.log(response.data);
			form.value.accountName = response.data.accountName;
			inputErrors.value.accountName.isValid = true;
		} catch (error) {
			console.error("Account verification failed:", error);
			// errorAlert("Account verification failed");
			inputErrors.value.accountName.isValid = false;
			form.value.accountName = "";
		} finally {
			// loader.value.verifyingQuid = false;
		}
	};

	const isValidAccount = () => {
		fetchAccountDetails();
		return (
			form.value.bankCode &&
			form.value.accountNumber.length > 9 &&
			!form.value.accountName
		);
	};

	const selectBank = () => {
		form.value.bankName =
			banks.value.find((b: Bank) => b.code === form.value.bankCode)
				?.name || "unknown";
		fetchAccountDetails();
	};

	// Fetch banks on component mount
	onMounted(() => {
		fetchBanks();
	});
</script>

<template>
	<div>
		<!--begin::Card-->
		<div
			id="withdrawal-form"
			class="card card-custom border-0 h-md-100 mb-5 mb-lg-10"
		>
			<!--begin::Body-->
			<div
				class="card-body d-flex align-items-center justify-content-center flex-wrap px-auto gap-8 gap-md-10 p-0 p-md-10"
			>
				<!--begin::Wrapper-->
				<div class="flex-grow-1 mt-2 mx-auto mb-8">
					<div class="text-centeri mb-10">
						<h1 class="display-6">
							<span class="text-success">Withdraw</span> Funds
						</h1>
						<h6 class="text-muted">
							Transfer funds to your bank account.
						</h6>
					</div>
					<div
						class="position-relative text-gray-800 fs-2 z-index-2 fw-bold mb-5 d-none"
					>
						Withdraw Funds
					</div>

					<form
						v-if="!showForm"
						@submit.prevent="verifyQuid"
						class="h-100"
					>
						<!-- QUID Verification -->
						<div class="mb-5">
							<label
								for="quid"
								class="form-label required fw-bold"
							>
								QUID
							</label>
							<input
								type="text"
								id="quid"
								name="quid"
								v-model="form.quid"
								:class="{
									'is-invalid': !inputErrors.quid.isValid,
								}"
								class="form-control form-control-solid form-control-lg"
								placeholder="Enter QUID"
							/>
							<small
								v-if="inputErrors.quid.isValid"
								class="text-muted"
							>
								Enter your QUID to verify and proceed.
							</small>
							<small class="invalid-feedback">
								Invalid QUID.
							</small>
						</div>

						<button
							:disabled="loader.verifyingQuid"
							class="btn btn-primary w-100"
						>
							<span v-if="!loader.verifyingQuid"> Submit </span>
							<span v-else>
								verifying...
								<span
									class="spinner-border spinner-border-sm"
								></span>
							</span>
						</button>
					</form>

					<form
						v-else-if="
							quidResponse?.status === TransactionStatus.SUCCESS
						"
						@submit.prevent="submitWithdrawal"
						class="h-100"
					>
						<div class="mb-5">
							<label
								for="quid"
								class="form-label required fw-bold"
							>
								QUID
							</label>
							<input
								disabled
								type="text"
								id="quid"
								name="quid"
								v-model="form.quid"
								class="form-control form-control-solidi form-control-lg"
								placeholder="Enter QUID"
							/>
							<small class="text-muted"> Verified QUID. </small>
						</div>

						<!-- Amount -->
						<div class="mb-5">
							<label
								for="amount"
								class="form-label required fw-bold"
							>
								Amount
							</label>
							<cleave
								disabled
								type="text"
								name="amount"
								class="form-control disabled form-control-solidi form-control-lg text-center fw-bold"
								:options="{
									numeral: true,
									numeralThousandsGroupStyle: 'thousand',
									numeralDecimalMark: '.',
									numeralDecimalScale: 2,
									numeralIntegerScale: 15,
								}"
								placeholder="Enter amount"
								v-model="form.amount"
							/>
						</div>

						<!-- Account Number -->
						<div class="mb-5">
							<label
								for="accountNumber"
								class="form-label required fw-bold"
							>
								Account Number
							</label>
							<input
								type="text"
								id="accountNumber"
								name="accountNumber"
								v-model="form.accountNumber"
								@keyup="fetchAccountDetails()"
								class="form-control form-control-solid form-control-lg"
								placeholder="Enter account number"
							/>
						</div>

						<!-- Bank Selection -->
						<div class="mb-5">
							<label
								for="bank"
								class="form-label required fw-bold"
							>
								Bank
							</label>
							<select
								id="bank"
								name="bank"
								v-model="form.bankCode"
								class="form-control form-control-solid form-control-lg"
								@change="selectBank()"
							>
								<option value="" disabled>
									Select your bank
								</option>
								<option
									v-for="bank in banks"
									:key="bank.code"
									:value="bank.code"
								>
									{{ bank.name }}
								</option>
							</select>
						</div>

						<!-- Account Name -->
						<div class="mb-5">
							<label
								for="accountName"
								class="form-label required fw-bold"
							>
								Account Name
							</label>
							<input
								:class="{
									'is-invalid':
										!inputErrors.accountName.isValid,
								}"
								disabled
								type="text"
								id="accountName"
								name="accountName"
								v-model="form.accountName"
								class="form-control form-control-solidi form-control-lg"
								placeholder="Enter account name"
							/>
							<small class="invalid-feedback">
								{{ inputErrors.accountName.errorMessage }}
							</small>
						</div>

						<!-- Submit Button -->
						<div class="d-flex gap-3">
							<button
								type="button"
								class="btn btn-danger"
								@click="showForm = false"
							>
								Cancel
							</button>

							<button
								:disabled="loader.processing"
								class="btn btn-primary flex-grow-1"
							>
								<span v-if="!loader.processing"> Submit </span>
								<span v-else>
									Processing...
									<span
										class="spinner-border spinner-border-sm"
									></span>
								</span>
							</button>
						</div>
					</form>
				</div>
				<!--end::Wrapper-->

				<!--begin::Illustration-->

				<div class="h-175px mx-auto">
					<i
						class="ki-duotone ki-shield-tick text-primary"
						style="font-size: 13rem"
					>
						<span class="path1"></span>
						<span class="path2"></span>
						<span class="path3"></span>
						<span class="path4"></span>
						<span class="path5"></span>
					</i>
				</div>
				<!--end::Illustration-->
			</div>
			<!--end::Body-->
		</div>
		<!--end::Card-->
	</div>
</template>
