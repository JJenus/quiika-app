import { Button } from "@/components/ui/Button";
import { formatFractionalCurrency as formatCurrency } from "@/utils/ruleUtils"; 
import { getStatusIcon, getStatusColor } from "@/utils/statusHelpers";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import type { WithdrawalRequest as WithdrawalRequestDto } from "@/lib/api";

type Props = {
  withdrawal: WithdrawalRequestDto;
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
  const { accountName, accountName: email, amount, bank, accountNumber, reference, createdAt, status } = withdrawal;

  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{accountName || 'N/A'}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{email || 'No email'}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status || 'PENDING')}`}>
              {getStatusIcon(status || 'PENDING')}
              <span className="ml-1">{status || 'PENDING'}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Reference:</span>
              <p className="font-mono text-gray-900 dark:text-gray-100">{reference || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Amount:</span>
              <p className="font-semibold text-green-600 dark:text-green-400">
                {amount ? formatCurrency(amount) : 'N/A'}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Bank:</span>
              <p className="text-gray-900 dark:text-gray-100">{bank || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Account:</span>
              <p className="font-mono text-gray-900 dark:text-gray-100">{accountNumber || 'N/A'}</p>
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Requested: {createdAt ? new Date(createdAt).toLocaleString() : 'Unknown'}
          </div>
        </div>

        {status === "PENDING" && (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onView} 
              aria-label="View details"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Eye className="h-4 w-4 mr-1" /> View
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onApprove}
              loading={loading.approve}
              disabled={loading.approve || loading.reject}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onReject}
              className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-red-500 dark:text-red-400"
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