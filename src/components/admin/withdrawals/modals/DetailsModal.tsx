import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatFractionalCurrency as formatCurrency } from "@/utils/ruleUtils"; 
import { getStatusIcon, getStatusColor } from "@/utils/statusHelpers"; 
import type { WithdrawalRequest as WithdrawalRequestDto } from "@/lib/api";

type Props = {
  open: boolean;
  onClose: () => void;
  withdrawal: WithdrawalRequestDto | null;
};

export const DetailsModal = ({ open, onClose, withdrawal }: Props) => {
  if (!withdrawal) return null;

  return (
    <Modal isOpen={open} onClose={onClose} title="Withdrawal Details" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">User Information</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="text-gray-600 dark:text-gray-400">Name:</span> {withdrawal.accountName || 'N/A'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="text-gray-600 dark:text-gray-400">Email:</span> {withdrawal.accountName || 'N/A'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="text-gray-600 dark:text-gray-400">Reference:</span>{" "}
                <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-900 dark:text-gray-100">
                  {withdrawal.reference || 'N/A'}
                </code>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Bank Details</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="text-gray-600 dark:text-gray-400">Bank:</span> {withdrawal.bank || 'N/A'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="text-gray-600 dark:text-gray-400">Account:</span>{" "}
                <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-900 dark:text-gray-100">
                  {withdrawal.accountNumber || 'N/A'}
                </code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="text-gray-600 dark:text-gray-400">Amount:</span>{" "}
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {withdrawal.amount ? formatCurrency(withdrawal.amount) : 'N/A'}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Timeline</h4>
          <div className="space-y-2 text-sm">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="text-gray-600 dark:text-gray-400">Requested:</span>{" "}
              {withdrawal.createdAt ? new Date(withdrawal.createdAt).toLocaleString() : 'Unknown'}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="text-gray-600 dark:text-gray-400">Status:</span>{" "}
              <span
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                  withdrawal.status || 'PENDING'
                )}`}
              >
                {getStatusIcon(withdrawal.status || 'PENDING')}
                <span className="ml-1">{withdrawal.status || 'PENDING'}</span>
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