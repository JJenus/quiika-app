import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import { DataTable } from "@/components/admin/shared/DataTable";
import { WithdrawalRow } from "@/components/admin/withdrawals/WithdrawalRow";
import { WithdrawalStats } from "@/components/admin/withdrawals/WithdrawalStats";
import { FilterPanel } from "@/components/admin/shared/FilterPanel";
import { SearchBar } from "@/components/admin/shared/SearchBar";
import { Pagination } from "@/components/admin/shared/Pagination";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useAdminStore } from "@/stores/useAdminStore";
import { ApproveModal } from "@/components/admin/withdrawals/modals/ApproveModal";
import { DetailsModal } from "@/components/admin/withdrawals/modals/DetailsModal";
import { RejectModal } from "@/components/admin/withdrawals/modals/RejectModal";
import { WithdrawalRequestDto } from "@/lib/api";

export const WithdrawalsPage = () => {
  const {
    withdrawals,
    withdrawalMetrics,
    loading,
    error,
    fetchWithdrawals,
    fetchWithdrawalMetrics,
    approveWithdrawal,
    rejectWithdrawal,
    clearError,
  } = useAdminStore();

  // UI state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<WithdrawalRequestDto | null>(null);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  // Load data
  useEffect(() => {
    fetchWithdrawals();
    fetchWithdrawalMetrics();
  }, []);

  // Filtering
  const filtered = useMemo(() => {
    const content = withdrawals?.content || [];
    return content.filter((w) => {
      const matchesFilter = filter === "all" || w.status?.toLowerCase() === filter;
      const matchesSearch =
        debouncedSearch === "" ||
        w.reference?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        w.accountName?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        w.email?.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [withdrawals, filter, debouncedSearch]);

  // Pagination
  const { page, setPage, totalPages, paginated } = usePagination(filtered, 10);

  // Handlers
  const openDetails = (w: WithdrawalRequestDto) => {
    setSelected(w);
    setShowDetails(true);
  };
  
  const openApprove = (w: WithdrawalRequestDto) => {
    setSelected(w);
    setShowApprove(true);
  };
  
  const openReject = (w: WithdrawalRequestDto) => {
    setSelected(w);
    setShowReject(true);
  };
  
  const confirmApprove = async () => {
    if (selected?.id) {
      await approveWithdrawal(selected.id.toString());
      // Refresh data after action
      fetchWithdrawals();
      fetchWithdrawalMetrics();
    }
    setShowApprove(false);
    setSelected(null);
  };
  
  const confirmReject = async () => {
    if (selected?.id && rejectReason.trim()) {
      await rejectWithdrawal(selected.id.toString(), rejectReason);
      // Refresh data after action
      fetchWithdrawals();
      fetchWithdrawalMetrics();
    }
    setShowReject(false);
    setSelected(null);
    setRejectReason("");
  };

  const isWithdrawalLoading = loading.isLoading && loading.message?.includes("withdrawal");
  const isMetricsLoading = loading.isLoading && loading.message?.includes("metrics");
  const isApproveLoading = loading.isLoading && loading.message?.includes("approve");
  const isRejectLoading = loading.isLoading && loading.message?.includes("reject");

  return (
    <div className="space-y-6">
      {/* Header + Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Withdrawal Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Review and process withdrawal requests</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Reference, name, email…" 
          />
          <FilterPanel
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "All Status" },
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
              { value: "failed", label: "Failed" },
            ]}
          />
        </div>
      </div>

      {error.hasError && (
        <ErrorMessage 
          message={error.message!} 
          onDismiss={clearError} 
        />
      )}

      {/* Stats */}
      <WithdrawalStats
        metrics={withdrawalMetrics}
        loading={isMetricsLoading}
      />

      {/* Table */}
      <DataTable
        data={paginated}
        loading={isWithdrawalLoading}
        loadingText={loading.message}
        renderRow={(w, idx) => (
          <WithdrawalRow
            key={w.id}
            withdrawal={w}
            onView={() => openDetails(w)}
            onApprove={() => openApprove(w)}
            onReject={() => openReject(w)}
            loading={{
              approve: isApproveLoading || false,
              reject: isRejectLoading || false,
            }}
          />
        )}
        emptyMessage={
          search || filter !== "all"
            ? "No withdrawals match your filters."
            : "All withdrawal requests will appear here."
        }
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        />
      )}

      {/* Modals */}
      <ApproveModal
        open={showApprove}
        onClose={() => {
          setShowApprove(false);
          setSelected(null);
        }}
        withdrawal={selected}
        onConfirm={confirmApprove}
        loading={isApproveLoading || false}
      />
      <RejectModal
        open={showReject}
        onClose={() => {
          setShowReject(false);
          setSelected(null);
          setRejectReason("");
        }}
        withdrawal={selected}
        reason={rejectReason}
        setReason={setRejectReason}
        onConfirm={confirmReject}
        loading={isRejectLoading || false}
      />
      <DetailsModal
        open={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelected(null);
        }}
        withdrawal={selected}
      />
    </div>
  );
};