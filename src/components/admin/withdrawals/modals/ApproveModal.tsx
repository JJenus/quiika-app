// src/components/admin/withdrawals/modals/ApproveModal.tsx
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";
import { formatFractionalCurrency as  formatCurrency} from "@/utils/ruleUtils"; 
import type { WithdrawalRequest } from "@/types/api";

type Props = {
  open: boolean;
  onClose: () => void;
  withdrawal: WithdrawalRequest | null;
  onConfirm: () => void;
  loading: boolean;
};

export const ApproveModal = ({ open, onClose, withdrawal, onConfirm, loading }: Props) => {
  if (!withdrawal) return null;

  return (
    <Modal isOpen={open} onClose={onClose} title="Approve Withdrawal" size="md">
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 text-success mr-2" />
          <span className="text-sm font-medium text-success">
            This will release funds to the user
          </span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-1 text-sm">
          <p>
            <span className="text-text-secondary">Account:</span> {withdrawal.accountName}
          </p>
          <p>
            <span className="text-text-secondary">Amount:</span>{" "}
            {formatCurrency(withdrawal.amount)}
          </p>
          <p>
            <span className="text-text-secondary">QUID:</span> {withdrawal.quid}
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            loading={loading}
            className="flex-1 bg-success hover:bg-success/90"
          >
            Approve Withdrawal
          </Button>
        </div>
      </div>
    </Modal>
  );
};