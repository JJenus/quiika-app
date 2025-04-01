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
    email: string;
    percentage?: number;
    amount?: number;
  }
  
  export interface SplitRule {
    email: string;
    percentage: number;
    amount: number;
    fixedAmount: boolean;
  }
  
  export interface TimeRule {
    start: string;
    end: string;
    frequency: TimeFrequency;
    weekdays: number[];
  }
  
  export interface Rule {
    quid: string;
    type: RuleType;
    nthPerson?: number;
    splits?: SplitDetail[];
    startTime?: string;
    endTime?: string;
    frequency?: TimeFrequency;
    weekdays?: number[];
  }