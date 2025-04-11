// ~/utils/interfaces/Rule.ts
export enum RuleType {
	NTH_PERSON = "nth_person",
	SPLIT = "split",
	TIME = "time",
}

export enum TimeFrequency {
	ONCE = "once",
	DAILY = "daily",
	WEEKLY = "weekly",
	MONTHLY = "monthly",
}

export interface SplitDetail {
	percentage?: number;
}

export interface SplitRule {
	percentage?: number;
	amount?: number;
	fixedAmount?: boolean;
}

export interface TimeRule {
	start: string;
	end: string;
}

// types/quid.d.ts
export interface Quid {
	quid: string;
	amount: number;
	currency: string;
	status:
		| "ACTIVE"
		| "SPLIT"
		| "CLAIMED"
		| "BLOCKED"
		| "EXPIRED"
		| "CONFLICTED";
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface RuleDTO {
	quid: string;
	nthPerson?: number;
	totalSplits?: number;
	startTime?: string;
	endTime?: string;
	splits?: Array<{ percentage?: number }>;
}

export interface TimeRule {
	start: string;
	end: string;
}

export enum SplitMode {
	FIXED_AMOUNT = "fixed",
	PERCENTAGE = "percentage",
}

// types/quid.d.ts
export interface Rule {
  quid: string;
  nthPerson?: number;
  totalSplits?: number;
  startTime?: string;
  endTime?: string;
  splits?: Array<SplitDetail>;
}
