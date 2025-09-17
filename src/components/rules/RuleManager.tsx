// components/rules/RuleManager.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Settings, Calendar, Users, Split } from 'lucide-react';
import { rulesAPI, quidAPI } from '../../lib/api';
import { useQuidStore } from '../../stores/useQuidStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { RuleTypeNavigation } from './RuleTypeNavigation';
import { NthPersonRule } from './NthPersonRule';
import { SplitRuleComponent } from './SplitRule';
import { TimeRuleComponent } from './TimeRule';
import { QuidDetailsDisplay } from './QuidDetailsDisplay';
import toast from 'react-hot-toast';
import { Rule, Quid, RuleDTO, RuleType, SplitMode } from '../../types/api';
import { getMoneyFromKobo, formatFractionalCurrency } from '../../utils/ruleUtils';

const rulesNav = [
  { name: "Nth Person", rule: "NTH_PERSON" as RuleType, icon: Users },
  { name: "Split", rule: "SPLIT" as RuleType, icon: Split },
  { name: "Time Range", rule: "TIME" as RuleType, icon: Calendar },
];

export const RuleManager: React.FC = () => {
  const [quidInput, setQuidInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quidDetails, setQuidDetails] = useState<Quid | null>(null);
  const [currentRule, setCurrentRule] = useState<Rule | null>(null);
  const [error, setError] = useState<{ hasError: boolean; message?: string }>({ hasError: false });
  
  const [ruleState, setRuleState] = useState({
    ruleType: "NTH_PERSON" as RuleType,
    nthPerson: 1,
    splitConfig: {
      mode: "FIXED_AMOUNT" as SplitMode,
      totalSplits: 1,
      totalAmount: 0,
      splits: [] as Array<{ percentage?: number; amount?: number; fixedAmount: boolean }>,
    },
    timeRule: {
      start: "",
      end: "",
    },
  });

  // Check if the form is valid
  const isValid = useCallback(() => {
    const state = ruleState;
    const MIN_AMOUNT = 1000;
    
    switch (state.ruleType) {
      case "NTH_PERSON":
        return state.nthPerson > 0;
      case "SPLIT":
        const { mode, totalAmount, totalSplits, splits } = state.splitConfig;
        const realTotalAmount = totalAmount;
        if (mode === "FIXED_AMOUNT") {
          return (
            totalSplits > 0 &&
            realTotalAmount >= MIN_AMOUNT &&
            Math.floor(realTotalAmount / totalSplits) >= MIN_AMOUNT
          );
        }
        return (
          splits.length > 0 &&
          splits.reduce((sum, rule) => sum + (rule.percentage || 0), 0) === 100 &&
          splits.every((split) => {
            const amount = Math.floor(realTotalAmount * ((split.percentage || 0) / 100));
            return (split.percentage || 0) > 0 && amount >= MIN_AMOUNT;
          })
        );
      case "TIME":
        if (!state.timeRule.start || !state.timeRule.end) return false;
        return new Date(state.timeRule.start) < new Date(state.timeRule.end);
      default:
        return false;
    }
  }, [ruleState]);

  // Fetch Quid details
  const fetchQuidDetails = useCallback(async () => {
    if (!quidInput) return;

    setIsLoading(true);
    setError({ hasError: false });
    
    try {
      // First fetch the Quid details
      const quidRes = await quidAPI.getQuid(quidInput);
      setQuidDetails(quidRes.data);

      // Then try to fetch the rule
      try {
        const ruleRes = await rulesAPI.getRule(quidInput);
        setCurrentRule(ruleRes.data);
        
        if (ruleRes.data) {
          const realAmount = getMoneyFromKobo(quidRes.data.amount);
          let ruleType: RuleType = RuleType.NTH_PERSON;
          
          if (ruleRes.data.nthPerson) {
            ruleType = RuleType.NTH_PERSON;
          } else if (ruleRes.data.splits && ruleRes.data.splits.length > 0) {
            ruleType = RuleType.SPLIT;
          } else if (ruleRes.data.startTime) {
            ruleType = RuleType.TIME;
          }

          const isFixedSplit = ruleRes.data.splits && ruleRes.data.splits.length === 0;
          const splitMode = isFixedSplit ? "FIXED_AMOUNT" as SplitMode : "PERCENTAGE" as SplitMode;

          setRuleState({
            ruleType,
            nthPerson: ruleRes.data.nthPerson || 1,
            splitConfig: {
              mode: splitMode,
              totalSplits: ruleRes.data.totalSplits || 1,
              totalAmount: realAmount,
              splits: ruleRes.data.splits?.map(s => ({
                percentage: s.percentage || 0,
                amount: Math.floor(realAmount * ((s.percentage || 0) / 100)),
                fixedAmount: false
              })) || []
            },
            timeRule: {
              start: ruleRes.data.startTime || '',
              end: ruleRes.data.endTime || ''
            }
          });
        }
      } catch (rulesError: any) {
        // 404 is expected when no rule exists
        if (rulesError.response?.status !== 404) {
          console.error("Error loading rule:", rulesError);
        }
        setCurrentRule(null);
      }
    } catch (error: any) {
      console.error("Failed to fetch quid details:", error);
      setQuidDetails(null);
      setCurrentRule(null);
      
      if (error.response?.status === 404) {
        setError({ hasError: true, message: "Quid not found" });
        toast.error("Quid not found");
      } else {
        setError({ hasError: true, message: "Failed to load quid details" });
        toast.error("Failed to load quid details");
      }
    } finally {
      setIsLoading(false);
    }
  }, [quidInput, getMoneyFromKobo]);

  // Submit the form
  const submit = useCallback(async () => {
    if (!quidDetails || !isValid()) return;

    let payload: RuleDTO = {
      quid: quidDetails.quid,
    };

    switch (ruleState.ruleType) {
      case "NTH_PERSON":
        payload.nthPerson = ruleState.nthPerson;
        break;
      case "SPLIT":
        const { mode, totalSplits, splits } = ruleState.splitConfig;
        if (mode === "FIXED_AMOUNT") {
          payload.totalSplits = totalSplits;
        } else {
          payload.splits = splits.map(s => ({ percentage: s.percentage || 0 }));
        }
        break;
      case "TIME":
        payload.startTime = ruleState.timeRule.start;
        payload.endTime = ruleState.timeRule.end;
        break;
    }

    try {
      const response = await rulesAPI.createRule(payload);
      setCurrentRule(response.data);
      toast.success(
        currentRule ? "Rule updated successfully" : "Rule created successfully"
      );
      cancel();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save rule");
      console.error("Rule submission failed:", error);
    }
  }, [quidDetails, ruleState, currentRule, isValid]);

  // Cancel and reset form
  const cancel = useCallback(() => {
    setQuidDetails(null);
    setQuidInput("");
    setCurrentRule(null);
    setRuleState({
      ruleType: RuleType.NTH_PERSON,
      nthPerson: 1,
      splitConfig: {
        mode: SplitMode.FIXED_AMOUNT,
        totalSplits: 1,
        totalAmount: 0,
        splits: [],
      },
      timeRule: {
        start: "",
        end: "",
      },
    });
  }, []);

  // Watch for quidInput changes and fetch when length is 8
  useEffect(() => {
    if (quidInput.length === 13) {
      fetchQuidDetails();
    }
  }, [quidInput, fetchQuidDetails]);

  // Update splitConfig totalAmount when quidDetails changes
  useEffect(() => {
    if (quidDetails) {
      const realAmount = getMoneyFromKobo(quidDetails.amount);
      setRuleState(prev => ({
        ...prev,
        splitConfig: {
          ...prev.splitConfig,
          totalAmount: realAmount
        }
      }));
    }
  }, [quidDetails, getMoneyFromKobo]);

  // Show success message if rule was successfully created/updated
  if (currentRule && !quidInput) {
    return (
      <div className="card p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mx-auto w-fit mb-4">
            <Settings className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
            Rule {currentRule ? 'Updated' : 'Created'} Successfully!
          </h2>
          <p className="text-text-secondary dark:text-text-secondary-dark mb-4">
            Your rule has been {currentRule ? 'updated' : 'created'} successfully
          </p>
          <button
            onClick={() => setQuidInput(quidDetails?.quid || '')}
            className="btn-primary mt-4"
          >
            Manage Another Rule
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="bg-gradient-to-br from-primary to-purple-600 p-3 rounded-xl mx-auto w-fit mb-3">
          <Settings className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
          Manage Quid Rules
        </h2>
        <p className="text-text-secondary dark:text-text-secondary-dark">
          Set rules for how your gift can be accessed
        </p>
      </div>

      {error.hasError && (
        <ErrorMessage
          message={error.message || "An error occurred"}
          onDismiss={() => setError({ hasError: false })}
          className="mb-6"
        />
      )}

      {/* Quid Input Section */}
      {!quidDetails ? (
        <div className="space-y-6">
          <div>
            <label
              htmlFor="quid"
              className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
            >
              Quid ID
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                id="quid"
                value={quidInput}
                onChange={(e) => setQuidInput(e.target.value.toUpperCase())}
                className="input-field pl-10 uppercase"
                placeholder="Enter QUID code"
                maxLength={15}
              />
            </div>
            <p className="mt-1 text-xs text-text-secondary dark:text-text-secondary-dark">
              Enter the 8-character QUID code to manage its rules
            </p>
          </div>

          <button
            onClick={fetchQuidDetails}
            disabled={!quidInput || isLoading || quidInput.length !== 8}
            className="w-full btn-primary py-3 text-base font-semibold"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" text="Loading..." />
            ) : (
              "Load Quid Details"
            )}
          </button>
        </div>
      ) : (
        /* Rules Form */
        <div className="space-y-6">
          <QuidDetailsDisplay 
            quidDetails={quidDetails} 
            formatFractionalCurrency={formatFractionalCurrency}
          />

          {currentRule && (
            <div className="alert alert-info">
              Current rule type:
              <strong className="ml-1">
                {currentRule.nthPerson
                  ? "Nth Person"
                  : currentRule.splits
                  ? "Split"
                  : "Time Range"}
              </strong>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2">
              Rule Type
            </label>
            <RuleTypeNavigation
              rulesNav={rulesNav}
              currentRuleType={ruleState.ruleType}
              onRuleTypeChange={(ruleType) => setRuleState(prev => ({ 
                ...prev, 
                ruleType,
                splitConfig: ruleType === RuleType.SPLIT ? {
                  mode: SplitMode.FIXED_AMOUNT,
                  totalSplits: 1,
                  totalAmount: getMoneyFromKobo(quidDetails.amount),
                  splits: [],
                } : prev.splitConfig
              }))}
            />
          </div>

          {ruleState.ruleType === "NTH_PERSON" && (
            <NthPersonRule
              nthPerson={ruleState.nthPerson}
              onNthPersonChange={(nthPerson) => setRuleState(prev => ({ ...prev, nthPerson }))}
            />
          )}

          {ruleState.ruleType === "SPLIT" && (
            <SplitRuleComponent
              splitConfig={ruleState.splitConfig}
              currency={quidDetails.currency}
              totalAmount={ruleState.splitConfig.totalAmount}
              onSplitConfigChange={(splitConfig) => setRuleState(prev => ({ ...prev, splitConfig }))}
            />
          )}

          {ruleState.ruleType === "TIME" && (
            <TimeRuleComponent
              timeRule={ruleState.timeRule}
              onTimeRuleChange={(timeRule) => setRuleState(prev => ({ ...prev, timeRule }))}
            />
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={cancel}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={!isValid()}
              className="flex-1 btn-primary"
            >
              {currentRule ? "Update Rule" : "Create Rule"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};