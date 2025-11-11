// src/pages/admin/WithdrawalsPage.tsx
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
import { useWithdrawalStore } from "@/stores/useWithdrawalStore";
import { ApproveModal } from "@/components/admin/withdrawals/modals/ApproveModal";
import { DetailsModal } from "@/components/admin/withdrawals/modals/DetailsModal";
import { RejectModal } from "@/components/admin/withdrawals/modals/RejectModal";
import { WithdrawalRequest } from "@/types/api";

export const WithdrawalsPage = () => {
  const {
    withdrawals,
    loading,
    error,
    fetchWithdrawals,
    approve,
    reject,
    clearError,
  } = useWithdrawalStore();

  // UI state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<WithdrawalRequest | null>(null);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  // Load data
  useEffect(() => {
    fetchWithdrawals();
  }, [fetchWithdrawals]);

  // Filtering
  const filtered = useMemo(() => {
    return withdrawals.filter((w) => {
      const matchesFilter = filter === "all" || w.status.toLowerCase() === filter;
      const matchesSearch =
        debouncedSearch === "" ||
        w.quid.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        w.accountName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        w.transaction.email.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [withdrawals, filter, debouncedSearch]);

  // Pagination
  const { page, setPage, totalPages, paginated } = usePagination(filtered, 10);

  // Stats
  const pending = withdrawals.filter((w) => w.status === "PENDING");
  const pendingAmount = pending.reduce((s, w) => s + w.amount, 0);
  const today = new Date().toISOString().split("T")[0];
  const processedToday = withdrawals.filter(
    (w) => w.status === "COMPLETED" && w.updatedAt.startsWith(today)
  ).length;

  // Handlers
  const openDetails = (w: WithdrawalRequest) => {
    setSelected(w);
    setShowDetails(true);
  };
  const openApprove = (w: WithdrawalRequest) => {
    setSelected(w);
    setShowApprove(true);
  };
  const openReject = (w: WithdrawalRequest) => {
    setSelected(w);
    setShowReject(true);
  };
  const confirmApprove = async () => {
    if (selected) await approve(selected.id.toString());
    setShowApprove(false);
    setSelected(null);
  };
  const confirmReject = async () => {
    if (selected && rejectReason.trim()) {
      await reject(selected.id.toString(), rejectReason);
      setShowReject(false);
      setSelected(null);
      setRejectReason("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header + Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Withdrawal Management</h1>
          <p className="text-text-secondary mt-1">Review and process withdrawal requests</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="QUID, name, email…" />
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

      {error.hasError && <ErrorMessage message={error.message!} onDismiss={clearError} />}

      {/* Stats */}
      <WithdrawalStats
        pendingCount={pending.length}
        pendingAmount={pendingAmount}
        processedToday={processedToday}
      />

      {/* Table */}
      <DataTable
        data={paginated}
        loading={loading.isLoading && loading.action === "fetch"}
        loadingText={loading.message}
        renderRow={(w, idx) => (
          <WithdrawalRow
            key={w.id}
            withdrawal={w}
            onView={() => openDetails(w)}
            onApprove={() => openApprove(w)}
            onReject={() => openReject(w)}
            loading={{
              approve: loading.isLoading && loading.action === "approve" && loading.id === w.id.toString(),
              reject: loading.isLoading && loading.action === "reject" && loading.id === w.id.toString(),
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
        loading={loading.isLoading && loading.action === "approve"}
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
        loading={loading.isLoading && loading.action === "reject"}
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