// src/components/admin/withdrawals/modals/DetailsModal.tsx
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatFractionalCurrency as  formatCurrency} from "@/utils/ruleUtils"; 
import { getStatusIcon, getStatusColor } from "@/utils/statusHelpers"; 
import type { WithdrawalRequest } from "@/types/api";

type Props = {
  open: boolean;
  onClose: () => void;
  withdrawal: WithdrawalRequest | null;
};

export const DetailsModal = ({ open, onClose, withdrawal }: Props) => {
  if (!withdrawal) return null;

  return (
    <Modal isOpen={open} onClose={onClose} title="Withdrawal Details" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">User Information</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-text-secondary">Name:</span> {withdrawal.accountName}
              </p>
              <p>
                <span className="text-text-secondary">Email:</span> {withdrawal.transaction.email}
              </p>
              <p>
                <span className="text-text-secondary">QUID:</span>{" "}
                <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {withdrawal.quid}
                </code>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Bank Details</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-text-secondary">Bank:</span> {withdrawal.bank}
              </p>
              <p>
                <span className="text-text-secondary">Account:</span>{" "}
                <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {withdrawal.accountNumber}
                </code>
              </p>
              <p>
                <span className="text-text-secondary">Amount:</span>{" "}
                <span className="font-semibold text-success">
                  {formatCurrency(withdrawal.amount)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Timeline</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-text-secondary">Requested:</span>{" "}
              {new Date(withdrawal.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="text-text-secondary">Status:</span>{" "}
              <span
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                  withdrawal.status
                )}`}
              >
                {getStatusIcon(withdrawal.status)}
                <span className="ml-1">{withdrawal.status}</span>
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};