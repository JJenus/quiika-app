// src/components/admin/withdrawals/modals/RejectModal.tsx
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";
import { formatFractionalCurrency as  formatCurrency} from "@/utils/ruleUtils"; 
import type { WithdrawalRequest } from "@/types/api";

type Props = {
  open: boolean;
  onClose: () => void;
  withdrawal: WithdrawalRequest | null;
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
          <AlertTriangle className="h-5 w-5 text-error mr-2" />
          <span className="text-sm font-medium text-error">
            This action cannot be undone
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

        <div>
          <label htmlFor="rejectReason" className="block text-sm font-medium mb-2">
            Reason for Rejection *
          </label>
          <textarea
            id="rejectReason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="input-field min-h-[100px] resize-none w-full"
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
            className="flex-1 bg-error hover:bg-error/90"
          >
            Reject Request
          </Button>
        </div>
      </div>
    </Modal>
  );
};