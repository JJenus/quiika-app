// utils/ruleUtils.ts
import { RuleType, SplitMode, Rule, SplitRule, RuleState, Quid } from '../types/api';

export const MIN_AMOUNT = 1000;
export const MAX_PERCENTAGE_SPLITS = 5;

export const formatFractionalCurrency = (amount: number, currency: string = ""): string => {
  return `${currency} ${(amount / 100).toFixed(2)}`;
};

export const getMoneyFromKobo = (amount: number): number => {
  return amount / 100;
};

export const validateTimeRule = (timeRule: { start: string; end: string }): boolean => {
  if (!timeRule.start || !timeRule.end) return false;
  return new Date(timeRule.start) < new Date(timeRule.end);
};

export const calculateTotalPercentage = (splits: SplitRule[]): number => {
  return splits.reduce((sum, rule) => sum + (rule.percentage || 0), 0);
};

export const calculateFixedSplitAmount = (totalAmount: number, totalSplits: number): number => {
  if (!totalAmount || !totalSplits) return 0;
  return Math.floor(totalAmount / totalSplits);
};

export const initializeRuleForm = (rule: Rule, quidDetails: Quid | null): RuleState => {
  const realAmount = quidDetails ? getMoneyFromKobo(quidDetails.amount) : 0;
  
  let ruleType = RuleType.NTH_PERSON;
  if (rule.nthPerson) {
    ruleType = RuleType.NTH_PERSON;
  } else if (rule.splits && rule.splits.length > 0) {
    ruleType = RuleType.SPLIT;
  } else if (rule.startTime) {
    ruleType = RuleType.TIME;
  }

  const isFixedSplit = rule.splits && rule.splits.length === 0;
  const splitMode = isFixedSplit ? SplitMode.FIXED_AMOUNT : SplitMode.PERCENTAGE;

  return {
    ruleType,
    nthPerson: rule.nthPerson || 1,
    splitConfig: {
      mode: splitMode,
      totalSplits: rule.totalSplits || 1,
      totalAmount: realAmount,
      splits: rule.splits?.map(s => ({
        percentage: s.percentage || 0,
        amount: Math.floor(realAmount * ((s.percentage || 0) / 100)),
        fixedAmount: false
      })) || []
    },
    timeRule: {
      start: rule.startTime || '',
      end: rule.endTime || ''
    }
  };
};