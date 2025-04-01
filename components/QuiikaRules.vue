<script setup lang="ts">
	import { ref, computed, watch, onMounted } from "vue";
	import Cleave from "vue-cleave-component";
	import type { Rule, SplitRule, TimeRule } from "~/utils/interfaces/Rule";

	const props = defineProps({
		quid: {
			type: String,
			required: true,
		},
		currentRules: {
			type: Array as () => Rule[],
			default: () => [],
		},
	});

	const emit = defineEmits(["submit", "cancel"]);

	// Rule types
	enum RuleType {
		NTH_PERSON = "nth_person",
		SPLIT = "split",
		TIME = "time",
	}

	// Time rule frequencies
	enum TimeFrequency {
		ONCE = "once",
		DAILY = "daily",
		WEEKLY = "weekly",
		MONTHLY = "monthly",
	}

	// Form state with local storage persistence
	const ruleState = useState(`quid-${props.quid}-rules`, () => ({
		ruleType: RuleType.NTH_PERSON as RuleType,
		nthPerson: 1,
		splitRules: [
			{ email: "", percentage: 0, amount: 0, fixedAmount: false },
		] as SplitRule[],
		timeRule: {
			start: "",
			end: "",
			frequency: TimeFrequency.ONCE,
			weekdays: [] as number[],
		} as TimeRule,
	}));

	// Constants
	const MIN_AMOUNT = 100;
	const MAX_SPLITS = 5;
	const WEEKDAYS = [
		{ id: 0, name: "Sunday" },
		{ id: 1, name: "Monday" },
		{ id: 2, name: "Tuesday" },
		{ id: 3, name: "Wednesday" },
		{ id: 4, name: "Thursday" },
		{ id: 5, name: "Friday" },
		{ id: 6, name: "Saturday" },
	];

	// Computed properties
	const totalPercentage = computed(() => {
		return ruleState.value.splitRules.reduce((sum, rule) => {
			return rule.fixedAmount ? sum : sum + (rule.percentage || 0);
		}, 0);
	});

	const isValid = computed(() => {
		switch (ruleState.value.ruleType) {
			case RuleType.NTH_PERSON:
				return ruleState.value.nthPerson > 0;
			case RuleType.SPLIT:
				return (
					ruleState.value.splitRules.every(validateSplitRule) &&
					(ruleState.value.splitRules[0].fixedAmount ||
						totalPercentage.value === 100)
				);
			case RuleType.TIME:
				return validateTimeRule(ruleState.value.timeRule);
			default:
				return false;
		}
	});

	const showWeekdaySelection = computed(() => {
		return ruleState.value.timeRule.frequency === TimeFrequency.WEEKLY;
	});

	// Methods
	function validateSplitRule(rule: SplitRule): boolean {
		if (!rule.email.includes("@")) return false;

		if (rule.fixedAmount) {
			return rule.amount >= MIN_AMOUNT;
		} else {
			return rule.percentage > 0 && rule.percentage <= 100;
		}
	}

	function validateTimeRule(rule: TimeRule): boolean {
		if (!rule.start || !rule.end) return false;

		const start = new Date(rule.start);
		const end = new Date(rule.end);

		if (start >= end) return false;

		if (rule.frequency === TimeFrequency.WEEKLY && !rule.weekdays.length) {
			return false;
		}

		return true;
	}

	function addSplit() {
		if (ruleState.value.splitRules.length < MAX_SPLITS) {
			ruleState.value.splitRules.push({
				email: "",
				percentage: 0,
				amount: 0,
				fixedAmount: false,
			});
		}
	}

	function removeSplit(index: number) {
		if (ruleState.value.splitRules.length > 1) {
			ruleState.value.splitRules.splice(index, 1);
		}
	}

	function toggleSplitType(index: number) {
		ruleState.value.splitRules[index].fixedAmount =
			!ruleState.value.splitRules[index].fixedAmount;

		if (ruleState.value.splitRules[index].fixedAmount) {
			ruleState.value.splitRules[index].percentage = 0;
		} else {
			ruleState.value.splitRules[index].amount = 0;
		}
	}

	function toggleWeekday(dayId: number) {
		const index = ruleState.value.timeRule.weekdays.indexOf(dayId);
		if (index === -1) {
			ruleState.value.timeRule.weekdays.push(dayId);
		} else {
			ruleState.value.timeRule.weekdays.splice(index, 1);
		}
	}

	function submit() {
		let rule: Rule;

		switch (ruleState.value.ruleType) {
			case RuleType.NTH_PERSON:
				rule = {
					quid: props.quid,
					type: RuleType.NTH_PERSON,
					nthPerson: ruleState.value.nthPerson,
				};
				break;
			case RuleType.SPLIT:
				rule = {
					quid: props.quid,
					type: RuleType.SPLIT,
					splits: ruleState.value.splitRules.map((split) => ({
						email: split.email,
						amount: split.fixedAmount ? split.amount : undefined,
						percentage: split.fixedAmount
							? undefined
							: split.percentage,
					})),
				};
				break;
			case RuleType.TIME:
				rule = {
					quid: props.quid,
					type: RuleType.TIME,
					startTime: ruleState.value.timeRule.start,
					endTime: ruleState.value.timeRule.end,
					frequency: ruleState.value.timeRule.frequency,
					weekdays:
						ruleState.value.timeRule.frequency ===
						TimeFrequency.WEEKLY
							? ruleState.value.timeRule.weekdays
							: undefined,
				};
				break;
			default:
				throw new Error("Invalid rule type");
		}

		emit("submit", rule);
	}

	function cancel() {
		emit("cancel");
	}

	// Reset form when rule type changes
	watch(
		() => ruleState.value.ruleType,
		() => {
			if (
				ruleState.value.ruleType === RuleType.SPLIT &&
				!ruleState.value.splitRules.length
			) {
				ruleState.value.splitRules = [
					{
						email: "",
						percentage: 0,
						amount: 0,
						fixedAmount: false,
					},
				];
			}
		}
	);

	// Initialize with current rules if editing
	onMounted(() => {
		if (props.currentRules.length) {
			const firstRule = props.currentRules[0];
			ruleState.value.ruleType = firstRule.type;

			if (firstRule.type === RuleType.NTH_PERSON) {
				ruleState.value.nthPerson = firstRule.nthPerson || 1;
			} else if (firstRule.type === RuleType.SPLIT && firstRule.splits) {
				ruleState.value.splitRules = firstRule.splits.map((split) => ({
					email: split.email,
					percentage: split.percentage || 0,
					amount: split.amount || 0,
					fixedAmount: !!split.amount,
				}));
			} else if (firstRule.type === RuleType.TIME) {
				ruleState.value.timeRule = {
					start: firstRule.startTime || "",
					end: firstRule.endTime || "",
					frequency: firstRule.frequency || TimeFrequency.ONCE,
					weekdays: firstRule.weekdays || [],
				};
			}
		}
	});
</script>

<template>
	<div
		class="card card-custom border-0 h-md-100 mb-5 mb-lg-10"
	>
		<div
			class="card-body d-flex align-items-center justify-content-center flex-wrap px-auto gap-8 gap-md-10"
		>
			<div class="flex-grow-1 mt-2 me-9 me-md-6 mb-8">
				<div class="mb-5">
					<h1 class="display-6">
						Add<span class="text-success"> Rules</span> to Quid
					</h1>
					<h6 class="text-muted">
						Control how your gift is accessed and distributed.
					</h6>
				</div>

				<form @submit.prevent="submit" class="h-100">
					<!-- Rule Type Selection -->
					<div class="mb-5">
						<label class="form-label required fw-bold"
							>Rule Type</label
						>
						<div class="btn-group w-100" role="group">
							<button
								type="button"
								:class="[
									'btn',
									ruleState.ruleType === RuleType.NTH_PERSON
										? 'btn-primary'
										: 'btn-outline-primary',
								]"
								@click="
									ruleState.ruleType = RuleType.NTH_PERSON
								"
							>
								Nth Person
							</button>
							<button
								type="button"
								:class="[
									'btn',
									ruleState.ruleType === RuleType.SPLIT
										? 'btn-primary'
										: 'btn-outline-primary',
								]"
								@click="ruleState.ruleType = RuleType.SPLIT"
							>
								Split
							</button>
							<button
								type="button"
								:class="[
									'btn',
									ruleState.ruleType === RuleType.TIME
										? 'btn-primary'
										: 'btn-outline-primary',
								]"
								@click="ruleState.ruleType = RuleType.TIME"
							>
								Time Range
							</button>
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
						<div class="form-text">
							Only the specified person in sequence will receive
							this gift.
						</div>
					</div>

					<!-- Split Rule -->
					<div
						v-if="ruleState.ruleType === RuleType.SPLIT"
						class="mb-5"
					>
						<div
							class="d-flex justify-content-between align-items-center mb-3"
						>
							<label class="form-label required fw-bold"
								>Split Details</label
							>
							<div>
								<button
									type="button"
									class="btn btn-sm btn-success me-2"
									@click="addSplit"
									:disabled="
										ruleState.splitRules.length >=
										MAX_SPLITS
									"
								>
									Add Split
								</button>
								<span class="badge bg-light text-dark">
									{{ ruleState.splitRules.length }}/{{
										MAX_SPLITS
									}}
								</span>
							</div>
						</div>

						<div
							v-for="(split, index) in ruleState.splitRules"
							:key="index"
							class="mb-4 p-3 border rounded"
							:class="{
								'border-danger': !validateSplitRule(split),
							}"
						>
							<div class="d-flex justify-content-between mb-2">
								<h6 class="fw-bold">Split #{{ index + 1 }}</h6>
								<button
									type="button"
									class="btn btn-sm btn-danger"
									@click="removeSplit(index)"
									:disabled="ruleState.splitRules.length <= 1"
								>
									Remove
								</button>
							</div>

							<div class="mb-3">
								<label
									:for="`email-${index}`"
									class="form-label required"
								>
									Email
								</label>
								<input
									type="email"
									:id="`email-${index}`"
									v-model="split.email"
									class="form-control form-control-lg"
									placeholder="Recipient email"
									:class="{
										'is-invalid':
											!split.email.includes('@'),
									}"
								/>
								<div
									v-if="!split.email.includes('@')"
									class="invalid-feedback"
								>
									Please enter a valid email address
								</div>
							</div>

							<div class="form-check form-switch mb-3">
								<input
									class="form-check-input"
									type="checkbox"
									:id="`toggle-${index}`"
									v-model="split.fixedAmount"
									@change="toggleSplitType(index)"
								/>
								<label
									class="form-check-label"
									:for="`toggle-${index}`"
								>
									{{
										split.fixedAmount
											? "Fixed Amount"
											: "Percentage"
									}}
								</label>
							</div>

							<div v-if="split.fixedAmount" class="mb-3">
								<label
									:for="`amount-${index}`"
									class="form-label required"
								>
									Amount (min N{{ MIN_AMOUNT }})
								</label>
								<div class="input-group">
									<span class="input-group-text">₦</span>
									<cleave
										:id="`amount-${index}`"
										v-model="split.amount"
										class="form-control form-control-lg"
										:class="{
											'is-invalid':
												split.amount < MIN_AMOUNT,
										}"
										:options="{
											numeral: true,
											numeralThousandsGroupStyle:
												'thousand',
											numeralDecimalMark: '.',
											numeralDecimalScale: 2,
											numeralIntegerScale: 15,
										}"
									/>
								</div>
								<div
									v-if="split.amount < MIN_AMOUNT"
									class="invalid-feedback"
								>
									Amount must be at least N{{ MIN_AMOUNT }}
								</div>
							</div>

							<div v-else class="mb-3">
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
										v-model.number="split.percentage"
										min="1"
										max="100"
										class="form-control form-control-lg"
										placeholder="0-100"
										:class="{
											'is-invalid':
												split.percentage <= 0 ||
												split.percentage > 100,
										}"
									/>
									<span class="input-group-text">%</span>
								</div>
								<div
									v-if="
										split.percentage <= 0 ||
										split.percentage > 100
									"
									class="invalid-feedback"
								>
									Percentage must be between 1-100
								</div>
							</div>
						</div>

						<div
							v-if="!ruleState.splitRules[0].fixedAmount"
							class="alert"
							:class="
								totalPercentage === 100
									? 'alert-success'
									: 'alert-warning'
							"
						>
							<div
								class="d-flex justify-content-between align-items-center"
							>
								<span>
									Total Percentage: {{ totalPercentage }}%
									<span v-if="totalPercentage !== 100">
										- Must total exactly 100%
									</span>
								</span>
								<span
									v-if="totalPercentage !== 100"
									class="badge bg-danger"
								>
									{{ Math.abs(100 - totalPercentage) }}%
									{{
										totalPercentage > 100 ? "over" : "under"
									}}
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
									:min="new Date().toISOString().slice(0, 16)"
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
										new Date().toISOString().slice(0, 16)
									"
								/>
							</div>
						</div>

						<div class="mb-3">
							<label class="form-label required fw-bold"
								>Frequency</label
							>
							<select
								v-model="ruleState.timeRule.frequency"
								class="form-select form-select-lg"
							>
								<option :value="TimeFrequency.ONCE">
									Once
								</option>
								<option :value="TimeFrequency.DAILY">
									Daily
								</option>
								<option :value="TimeFrequency.WEEKLY">
									Weekly
								</option>
								<option :value="TimeFrequency.MONTHLY">
									Monthly
								</option>
							</select>
						</div>

						<div v-if="showWeekdaySelection" class="mb-3">
							<label class="form-label required fw-bold"
								>Active Days</label
							>
							<div class="d-flex flex-wrap gap-2">
								<button
									v-for="day in WEEKDAYS"
									:key="day.id"
									type="button"
									class="btn"
									:class="{
										'btn-primary':
											ruleState.timeRule.weekdays.includes(
												day.id
											),
										'btn-outline-primary':
											!ruleState.timeRule.weekdays.includes(
												day.id
											),
									}"
									@click="toggleWeekday(day.id)"
								>
									{{ day.name }}
								</button>
							</div>
							<div
								v-if="
									showWeekdaySelection &&
									!ruleState.timeRule.weekdays.length
								"
								class="text-danger small"
							>
								Please select at least one weekday
							</div>
						</div>

						<div class="alert alert-info">
							<div
								v-if="
									ruleState.timeRule.frequency ===
									TimeFrequency.ONCE
								"
							>
								The gift will only be accessible between
								<strong>{{
									new Date(
										ruleState.timeRule.start
									).toLocaleString()
								}}</strong>
								and
								<strong>{{
									new Date(
										ruleState.timeRule.end
									).toLocaleString()
								}}</strong>
							</div>
							<div v-else>
								The gift will be accessible
								<strong>{{
									ruleState.timeRule.frequency
								}}</strong>
								between the specified times
								<span v-if="showWeekdaySelection">
									on
									<strong>{{
										ruleState.timeRule.weekdays
											.map(
												(d) =>
													WEEKDAYS.find(
														(w) => w.id === d
													)?.name
											)
											.join(", ")
									}}</strong>
								</span>
							</div>
						</div>
					</div>

					<div class="d-flex gap-3">
						<button
							type="button"
							class="btn btn-secondary flex-grow-1"
							@click="cancel"
						>
							Cancel
						</button>
						<button
							type="submit"
							class="btn btn-primary flex-grow-1"
							:disabled="!isValid"
						>
							{{
								currentRules.length ? "Update Rule" : "Add Rule"
							}}
						</button>
					</div>
				</form>
			</div>

			<div class="h-175px mx-auto">
				<i
					class="ki-duotone ki-gear text-success"
					style="font-size: 13rem"
				>
					<i class="path1"></i>
					<i class="path2"></i>
				</i>
			</div>
		</div>
	</div>
</template>
