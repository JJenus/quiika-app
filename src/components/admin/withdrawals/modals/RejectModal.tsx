import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";
import { formatFractionalCurrency as formatCurrency } from "@/utils/ruleUtils"; 
import type { WithdrawalRequest as WithdrawalRequestDto } from "@/lib/api";

type Props = {
  open: boolean;
  onClose: () => void;
  withdrawal: WithdrawalRequestDto | null;
  reason: string;
  setReason: (v: string) => void;
  onConfirm: () => void;
  loading: boolean;
};

export const RejectModal = ({
  open,
  onClose,
  withdrawal,
  reason,
  setReason,
  onConfirm,
  loading,
}: Props) => {
  if (!withdrawal) return null;

  return (
    <Modal isOpen={open} onClose={onClose} title="Reject Withdrawal Request" size="md">
      <div className="space-y-6">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-sm font-medium text-red-600 dark:text-red-400">
            This action cannot be undone
          </span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-1 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="text-gray-600 dark:text-gray-400">Account:</span> {withdrawal.accountName || 'N/A'}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="text-gray-600 dark:text-gray-400">Amount:</span>{" "}
            {withdrawal.amount ? formatCurrency(withdrawal.amount) : 'N/A'}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="text-gray-600 dark:text-gray-400">Reference:</span> {withdrawal.reference || 'N/A'}
          </p>
        </div>

        <div>
          <label htmlFor="rejectReason" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
            Reason for Rejection *
          </label>
          <textarea
            id="rejectReason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-none"
            placeholder="Provide a clear reason..."
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            loading={loading}
            disabled={!reason.trim()}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            Reject Request
          </Button>
        </div>
      </div>
    </Modal>
  );
};