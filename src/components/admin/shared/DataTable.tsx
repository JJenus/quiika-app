// src/components/admin/shared/DataTable.tsx
import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type Props<T> = {
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
  emptyMessage?: string;
  loading?: boolean;
  loadingText?: string;
};

export function DataTable<T>({
  data,
  renderRow,
  emptyMessage = "No records found",
  loading,
  loadingText,
}: Props<T>) {
  if (loading) {
    return (
      <Card className="p-12 text-center">
        <LoadingSpinner size="lg" text={loadingText} />
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="p-12 text-center text-text-secondary">
        {emptyMessage}
      </Card>
    );
  }

  return <div className="divide-y divide-gray-200 dark:divide-gray-700">{data.map(renderRow)}</div>;
}