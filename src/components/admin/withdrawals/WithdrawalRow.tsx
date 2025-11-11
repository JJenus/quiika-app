// src/components/admin/withdrawals/WithdrawalRow.tsx
import { Button } from "@/components/ui/Button";
import { formatFractionalCurrency as formatCurrency } from "@/utils/ruleUtils"; 
import { getStatusIcon, getStatusColor } from "@/utils/statusHelpers";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import type { WithdrawalRequest } from "@/types/api";

type Props = {
  withdrawal: WithdrawalRequest;
  onView: () => void;
  onApprove: () => void;
  onReject: () => void;
  loading: { approve: boolean; reject: boolean };
};

export const WithdrawalRow = ({
  withdrawal,
  onView,
  onApprove,
  onReject,
  loading,
}: Props) => {
  const { accountName, transaction, amount, bank, accountNumber, quid, createdAt, status } = withdrawal;

  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <h4 className="font-semibold">{accountName}</h4>
              <p className="text-sm text-text-secondary">{transaction.email}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {getStatusIcon(status)}
              <span className="ml-1">{status}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">QUID:</span>
              <p className="font-mono">{quid}</p>
            </div>
            <div>
              <span className="text-text-secondary">Amount:</span>
              <p className="font-semibold text-success">{formatCurrency(amount)}</p>
            </div>
            <div>
              <span className="text-text-secondary">Bank:</span>
              <p>{bank}</p>
            </div>
            <div>
              <span className="text-text-secondary">Account:</span>
              <p className="font-mono">{accountNumber}</p>
            </div>
          </div>

          <div className="text-xs text-text-secondary">
            Requested: {new Date(createdAt).toLocaleString()}
          </div>
        </div>

        {status === "PENDING" && (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" onClick={onView} aria-label="View details">
              <Eye className="h-4 w-4 mr-1" /> View
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onApprove}
              loading={loading.approve}
              disabled={loading.approve || loading.reject}
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onReject}
              className="text-error border-error hover:bg-error/10"
              disabled={loading.approve || loading.reject}
            >
              <XCircle className="h-4 w-4 mr-1" /> Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};