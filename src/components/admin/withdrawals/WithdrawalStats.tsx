// src/components/admin/withdrawals/WithdrawalStats.tsx
import { Card } from "@/components/ui/Card";
import { Clock, Banknote, CheckCircle } from "lucide-react";
import { formatFractionalCurrency as formatCurrency } from "@/utils/ruleUtils";  

type Props = {
  pendingCount: number;
  pendingAmount: number;
  processedToday: number;
};

export const WithdrawalStats = ({ pendingCount, pendingAmount, processedToday }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">Pending Requests</p>
          <p className="text-2xl font-bold mt-2">{pendingCount}</p>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-r from-warning to-orange-500">
          <Clock className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>

    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">Total Amount Pending</p>
          <p className="text-2xl font-bold mt-2">{formatCurrency(pendingAmount)}</p>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
          <Banknote className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>

    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">Processed Today</p>
          <p className="text-2xl font-bold mt-2">{processedToday}</p>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-r from-success to-green-500">
          <CheckCircle className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  </div>
);