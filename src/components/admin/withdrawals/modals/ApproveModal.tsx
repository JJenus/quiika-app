import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";
import { formatFractionalCurrency as formatCurrency } from "@/utils/ruleUtils"; 
import type { WithdrawalRequest as WithdrawalRequestDto } from "@/lib/api";

type Props = {
  open: boolean;
  onClose: () => void;
  withdrawal: WithdrawalRequestDto | null;
  onConfirm: () => void;
  loading: boolean;
};

export const ApproveModal = ({ open, onClose, withdrawal, onConfirm, loading }: Props) => {
  if (!withdrawal) return null;

  return (
    <Modal isOpen={open} onClose={onClose} title="Approve Withdrawal" size="md">
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            This will release funds to the user
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

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            loading={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            Approve Withdrawal
          </Button>
        </div>
      </div>
    </Modal>
  );
};