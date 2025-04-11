<!-- components/quid/RuleManager.vue -->
<script setup lang="ts">
	import {
		type Quid,
		type Rule,
		type RuleDTO,
		type SplitRule,
		type TimeRule,
		RuleType,
		SplitMode,
	} from "~/utils/interfaces/Rule";

	const {
		public: { BE_API },
	} = useRuntimeConfig();
	const alert = useAlert();

	const { formatFractionalCurrency, getMoneyFromKobo } = useAppSettings();

	// Form state
	const quidInput = ref("");
	const isLoading = ref(false);
	const quidDetails: Ref<Quid | null> = ref(null);
	const currentRule: Ref<Rule | null> = ref(null);

	const ruleState = ref({
		ruleType: RuleType.NTH_PERSON as RuleType,
		nthPerson: 1,
		splitConfig: {
			mode: SplitMode.FIXED_AMOUNT,
			totalSplits: 1,
			totalAmount: 0,
			splits: [] as SplitRule[],
		},
		timeRule: {
			start: "",
			end: "",
		} as TimeRule,
	});

	const MIN_AMOUNT = 1000;
	const MAX_PERCENTAGE_SPLITS = 5;

	const rulesNav = [
		{ name: "Nth Person", rule: RuleType.NTH_PERSON },
		{ name: "Split", rule: RuleType.SPLIT },
		{ name: "Time Range", rule: RuleType.TIME },
	];

	const totalPercentage = computed(() =>
		ruleState.value.splitConfig.splits.reduce(
			(sum, rule) => sum + (rule.percentage || 0),
			0
		)
	);

	const fixedSplitAmount = computed(() => {
		const { totalAmount, totalSplits } = ruleState.value.splitConfig;
		if (!totalAmount || !totalSplits) return 0;
		return Math.floor(totalAmount / totalSplits);
	});

	const isValid = computed(() => {
		const state = ruleState.value;
		switch (state.ruleType) {
			case RuleType.NTH_PERSON:
				return state.nthPerson > 0;
			case RuleType.SPLIT:
				const { mode, totalAmount, totalSplits, splits } =
					state.splitConfig;
				const realTotalAmount = totalAmount;
				if (mode === SplitMode.FIXED_AMOUNT) {
					return (
						totalSplits > 0 &&
						realTotalAmount >= MIN_AMOUNT &&
						fixedSplitAmount.value >= MIN_AMOUNT
					);
				}
				return (
					splits.length > 0 &&
					totalPercentage.value === 100 &&
					splits.every((split) => {
						const amount = Math.floor(
							realTotalAmount * (split.percentage! / 100)
						);
						return split.percentage! > 0 && amount >= MIN_AMOUNT;
					})
				);
			case RuleType.TIME:
				return validateTimeRule(state.timeRule);
			default:
				return false;
		}
	});

	function validateTimeRule(rule: TimeRule): boolean {
		if (!rule.start || !rule.end) return false;
		return new Date(rule.start) < new Date(rule.end);
	}

	function addPercentageSplit() {
		if (ruleState.value.splitConfig.splits.length < MAX_PERCENTAGE_SPLITS) {
			ruleState.value.splitConfig.splits.push({
				percentage: 0,
				amount: 0,
				fixedAmount: false,
			});
		}
	}

	function removePercentageSplit(index: number) {
		if (ruleState.value.splitConfig.splits.length > 1) {
			ruleState.value.splitConfig.splits.splice(index, 1);
		}
	}

	function toggleSplitMode() {
		const config = ruleState.value.splitConfig;
		config.mode =
			config.mode === SplitMode.FIXED_AMOUNT
				? SplitMode.PERCENTAGE
				: SplitMode.FIXED_AMOUNT;
		if (
			config.mode === SplitMode.PERCENTAGE &&
			config.splits.length === 0
		) {
			config.splits = [{ percentage: 0, amount: 0, fixedAmount: false }];
		}
	}

	function updateFixedSplits() {
		if (ruleState.value.splitConfig.totalSplits < 1) {
			ruleState.value.splitConfig.totalSplits = 1;
		}
	}

	async function fetchQuidDetails() {
		if (!quidInput.value) return;

		isLoading.value = true;
		try {
			// First fetch the Quid details
			const quidRes = await $fetch(`${BE_API}/quid/${quidInput.value}`);
			quidDetails.value = quidRes;

			// Then try to fetch the rule
			try {
				const ruleRes = await $fetch(
					`${BE_API}/rules/${quidInput.value}`
				);
				currentRule.value = ruleRes;

				if (currentRule.value) {
					initializeRuleForm(currentRule.value);
				}
			} catch (rulesError: any) {
				// 404 is expected when no rule exists
				if (rulesError.status !== 404) {
					console.log("Error loading rule");
				}
				currentRule.value = null;
			}
		} catch (error: any) {
			console.error("Failed to fetch quid details:", error);
			quidDetails.value = null;
			currentRule.value = null;

			if (error.status === 404) {
				alert.error("Quid not found");
			} else {
				alert.error("Failed to load quid details");
			}
		} finally {
			isLoading.value = false;
		}
	}

	const initializeRuleForm = (rule: Rule) => {
		console.log("Initializing rule form with:", rule);

		// Update rule type reactively
		ruleState.value.ruleType = rule.nthPerson
			? RuleType.NTH_PERSON
			: rule.splits
			? RuleType.SPLIT
			: RuleType.TIME;

		// Handle nthPerson rule
		if (rule.nthPerson) {
			ruleState.value.nthPerson = rule.nthPerson;
		}

		const realAmount = getMoneyFromKobo(quidDetails.value?.amount || 0);

		// Handle split rule
		if (rule.splits) {
			toggleSplitMode();
			console.log("Processing splits rule");

			const isFixed = !rule.splits || rule.splits.length == 0;
			const mode = isFixed
				? SplitMode.FIXED_AMOUNT
				: SplitMode.PERCENTAGE;

			console.log("Is fixed amount split:", isFixed, mode);

			// Create a new split config object
			const newSplitConfig = {
				mode: mode,
				totalSplits: isFixed ? rule.totalSplits! : rule.splits?.length!,
				totalAmount: realAmount,
				splits: isFixed
					? []
					: rule.splits?.map((s) => ({
							percentage: s.percentage || 0,
							amount: Math.floor(
								(realAmount || 0) * ((s.percentage || 0) / 100)
							),
							fixedAmount: false,
					  })),
			};
			nextTick(() => {
				// Update splitConfig reactively by assigning a new object
				ruleState.value.splitConfig = newSplitConfig;
			});
		}

		// Handle time rule
		if (rule.startTime) {
			ruleState.value.timeRule = {
				start: rule.startTime,
				end: rule.endTime || "",
			};
		}

		console.log("Form initialized:", ruleState.value);
	};

	async function submit() {
		if (!quidDetails.value || !isValid.value) return;

		let payload: RuleDTO = {
			quid: quidDetails.value.quid,
		};

		switch (ruleState.value.ruleType) {
			case RuleType.NTH_PERSON:
				payload.nthPerson = ruleState.value.nthPerson;
				break;
			case RuleType.SPLIT:
				const { mode, totalSplits, splits } =
					ruleState.value.splitConfig;
				if (mode === SplitMode.FIXED_AMOUNT) {
					payload.totalSplits = totalSplits;
				} else {
					payload.splits = splits.map((s) => ({
						percentage: s.percentage,
					}));
				}
				break;
			case RuleType.TIME:
				payload.startTime = ruleState.value.timeRule.start;
				payload.endTime = ruleState.value.timeRule.end;
				break;
		}

		try {
			const response = await $fetch(`${BE_API}/rules`, {
				method: "POST",
				body: payload,
			});
			currentRule.value = response;
			alert.success(
				currentRule.value
					? "Rule updated successfully"
					: "Rule created successfully"
			);
			cancel();
		} catch (error) {
			alert.error("Failed to save rule");
			console.error("Rule submission failed:", error);
		}
	}

	const cancel = () => {
		quidDetails.value = null;
		quidInput.value = "";
		currentRule.value = null;
	};

	const calEqualSplit = (splits: number) => {
		const amount = getMoneyFromKobo(quidDetails.value?.amount || 0);
		return Math.floor(amount / splits).toLocaleString();
	};

	watch(quidInput, (newVal) => {
		if (newVal.length === 8) {
			// Assuming quid is 8 characters
			fetchQuidDetails();
		}
	});

	watch(
		() => ruleState.value.ruleType,
		() => {
			if (ruleState.value.ruleType === RuleType.SPLIT) {
				ruleState.value.splitConfig = {
					mode: SplitMode.FIXED_AMOUNT,
					totalSplits: 1,
					totalAmount: quidDetails.value?.amount || 0,
					splits: [],
				};
			}
		}
	);
</script>

<template>
	<div class="card card-custom border-0 h-md-100 mb-5 mb-lg-10">
		<div class="card-body d-flex flex-center gap-8 p-0 p-md-10">
			<!-- Quid Input Section -->
			<div v-if="!quidDetails" class="mb-5 flex-grow-1">
				<h1 class="display-6 mb-8">
					<span class="text-success">Quid</span> Rules Management
				</h1>

				<div class="mb-5">
					<div class="mb-5">
						<input
							v-model="quidInput"
							type="text"
							class="form-control form-control-lg"
							placeholder="Enter Quid ID"
							:disabled="isLoading"
							@keyup.enter="fetchQuidDetails"
							name="quid"
							autocomplete="quid"
						/>
					</div>

					<div>
						<button
							class="btn btn-primary w-100"
							type="button"
							@click="fetchQuidDetails"
							:disabled="!quidInput || isLoading"
						>
							<span
								v-if="isLoading"
								class="spinner-border spinner-border-sm"
							></span>
							{{ isLoading ? "Loading..." : "Load" }}
						</button>
					</div>
				</div>
			</div>

			<!-- Rules Form (shown when quid is loaded) -->
			<div v-if="quidDetails" class="flex-grow-1">
				<!-- Quid Details Display -->
				<div class="alerti alert-primaryi mb-5">
					<div class="d-flex justify-content-between fs-5 fw-bold">
						<div>
							<strong>Amount:</strong> {{ quidDetails.currency }}
							{{
								formatFractionalCurrency(quidDetails.amount, "")
							}}
							<span class="mx-2">|</span>
							<strong>Status:</strong> {{ quidDetails.status }}
						</div>
						<div>
							<strong>Created:</strong>
							{{
								new Date(
									quidDetails.createdAt
								).toLocaleDateString()
							}}
						</div>
					</div>
				</div>

				<div class="mb-5">
					<h3 class="mb-3">
						{{
							currentRule
								? "Update Existing Rule"
								: "Create New Rule"
						}}
					</h3>

					<!-- Current Rule Indicator -->
					<div v-if="currentRule" class="alert alert-info mb-4">
						Current rule type:
						<strong>{{
							currentRule.nthPerson
								? "Nth Person"
								: currentRule.splits
								? "Split"
								: "Time Range"
						}}</strong>
					</div>

					<form @submit.prevent="submit" class="h-100">
						<!-- Rule Type Selection -->
						<div class="mb-5">
							<label class="form-label required fw-bold"
								>Rule Type</label
							>
							<div class="rounded bg-gray-200i mb-9 p-2">
								<ul class="nav flex-wrap">
									<li
										v-for="rule in rulesNav"
										class="nav-item my-1 flex-grow-1"
									>
										<a
											class="btn btn-sm btn-color-gray-600 bg-state-body btn-active-color-gray-800 fw-bolder fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-4 mx-1"
											:class="{
												active:
													ruleState.ruleType ===
													rule.rule,
											}"
											@click="
												ruleState.ruleType = rule.rule
											"
										>
											{{ rule.name }}
										</a>
									</li>
								</ul>
							</div>
						</div>

						<!-- Nth Person Rule -->
						<div
							v-if="ruleState.ruleType === RuleType.NTH_PERSON"
							class="mb-5"
						>
							<label
								for="nthPerson"
								class="form-label required fw-bold"
							>
								Which person can access this gift?
							</label>
							<div class="input-group">
								<input
									type="number"
									id="nthPerson"
									v-model.number="ruleState.nthPerson"
									min="1"
									class="form-control form-control-lg"
									placeholder="e.g. 1 for first person"
								/>
								<span class="input-group-text">th person</span>
							</div>
						</div>

						<!-- Split Rule -->
						<div
							v-if="ruleState.ruleType === RuleType.SPLIT"
							class="mb-5"
						>
							<div class="form-check form-switch mb-4">
								<input
									class="form-check-input"
									type="checkbox"
									id="splitModeToggle"
									:checked="
										ruleState.splitConfig.mode ===
										SplitMode.PERCENTAGE
									"
									@change="toggleSplitMode"
								/>
								<label
									class="form-check-label"
									for="splitModeToggle"
								>
									{{
										ruleState.splitConfig.mode ===
										SplitMode.PERCENTAGE
											? "Percentage Split"
											: "Fixed Amount Split"
									}}
								</label>
							</div>

							<!-- Fixed Amount Split -->
							<div
								v-if="
									ruleState.splitConfig.mode ===
									SplitMode.FIXED_AMOUNT
								"
							>
								<div class="mb-3">
									<label
										for="totalSplits"
										class="form-label required fw-bold"
									>
										Number of Equal Splits
									</label>
									<input
										type="number"
										id="totalSplits"
										v-model.number="
											ruleState.splitConfig.totalSplits
										"
										min="1"
										class="form-control form-control-lg"
										@change="updateFixedSplits"
									/>
								</div>

								<div class="alert alert-info">
									<div
										v-if="
											ruleState.splitConfig.totalSplits >
											0
										"
									>
										Each of
										{{ ruleState.splitConfig.totalSplits }}
										recipient(s) will receive:
										<strong
											>{{ quidDetails.currency }}
											{{
												calEqualSplit(
													ruleState.splitConfig
														.totalSplits
												)
											}}</strong
										>
									</div>
								</div>
							</div>

							<!-- Percentage Split -->
							<div v-else>
								<div
									class="d-flex justify-content-between align-items-center mb-3"
								>
									<label class="form-label required fw-bold">
										Percentage Splits
									</label>
									<div>
										<button
											type="button"
											class="btn btn-sm btn-success me-2"
											@click="addPercentageSplit"
											:disabled="
												ruleState.splitConfig.splits
													.length >=
												MAX_PERCENTAGE_SPLITS
											"
										>
											Add Split
										</button>
										<span class="badge bg-light text-dark">
											{{
												ruleState.splitConfig.splits
													.length
											}}/{{ MAX_PERCENTAGE_SPLITS }}
										</span>
									</div>
								</div>

								<div
									v-for="(split, index) in ruleState
										.splitConfig.splits"
									:key="index"
									class="mb-3 p-3 border rounded"
								>
									<div
										class="d-flex justify-content-between mb-2"
									>
										<h6 class="fw-bold">
											Split #{{ index + 1 }}
										</h6>
										<button
											type="button"
											class="btn btn-sm btn-danger"
											@click="
												removePercentageSplit(index)
											"
											:disabled="
												ruleState.splitConfig.splits
													.length <= 1
											"
										>
											Remove
										</button>
									</div>

									<div class="mb-3">
										<label
											:for="`percentage-${index}`"
											class="form-label required"
										>
											Percentage
										</label>
										<div class="input-group">
											<input
												type="number"
												:id="`percentage-${index}`"
												v-model.number="
													split.percentage
												"
												min="1"
												max="100"
												class="form-control form-control-lg"
												placeholder="0-100"
											/>
											<span class="input-group-text"
												>%</span
											>
										</div>
										<div class="mt-2">
											Amount: {{ quidDetails.currency }}
											{{
												Math.floor(
													getMoneyFromKobo(
														quidDetails.amount
													) *
														(split.percentage! /
															100)
												).toLocaleString()
											}}
										</div>
									</div>
								</div>

								<div
									class="alert"
									:class="
										totalPercentage === 100
											? 'alert-success'
											: 'alert-warning'
									"
								>
									Total Percentage: {{ totalPercentage }}%
									<span v-if="totalPercentage !== 100">
										- Must total exactly 100%
									</span>
								</div>
							</div>
						</div>

						<!-- Time Rule -->
						<div
							v-if="ruleState.ruleType === RuleType.TIME"
							class="mb-5"
						>
							<div class="row">
								<div class="col-md-6 mb-3">
									<label
										for="startTime"
										class="form-label required fw-bold"
									>
										Start Time
									</label>
									<input
										type="datetime-local"
										id="startTime"
										v-model="ruleState.timeRule.start"
										class="form-control form-control-lg"
										:min="
											new Date()
												.toISOString()
												.slice(0, 16)
										"
									/>
								</div>
								<div class="col-md-6 mb-3">
									<label
										for="endTime"
										class="form-label required fw-bold"
									>
										End Time
									</label>
									<input
										type="datetime-local"
										id="endTime"
										v-model="ruleState.timeRule.end"
										class="form-control form-control-lg"
										:min="
											ruleState.timeRule.start ||
											new Date()
												.toISOString()
												.slice(0, 16)
										"
									/>
								</div>
							</div>
						</div>

						<div class="d-flex gap-3">
							<button
								type="button"
								class="btn btn-secondary flex-grow-1"
								@click="cancel()"
							>
								Cancel
							</button>
							<button
								type="submit"
								class="btn btn-primary flex-grow-1"
								:disabled="!isValid"
							>
								{{ currentRule ? "Update Rule" : "Add Rule" }}
							</button>
						</div>
					</form>
				</div>
			</div>

			<!-- Empty State -->
			<div v-if="!quidDetails && !isLoading" class="text-center py-10">
				<div class="h-175px mx-auto">
					<i
						class="ki-duotone ki-gear text-primary"
						style="font-size: 13rem"
					>
						<i class="path1"></i>
						<i class="path2"></i>
					</i>
				</div>

				<h4 class="text-muted mt-5">Enter a Quid ID to manage rules</h4>
			</div>
		</div>
	</div>
</template>
