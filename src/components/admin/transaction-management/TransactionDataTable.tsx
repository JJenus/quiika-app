import React from "react";
import { useAdminStore } from "../../../stores/useAdminStore";
import {
	AdminTransaction,
	TransactionStatus,
	SortDirection,
} from "../../../types/api";
import { DataTable, Column, Pagination } from "../../ui/DataTable";
import { Eye, Edit, RefreshCw, Download, Ban, CheckCircle } from "lucide-react";
import { ActionItem } from "../../../types/table";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/utils/numberFormatter";

export const TransactionDataTable: React.FC = () => {
	const {
		transactions,
		loading,
		selectedTransactions,
		selectTransaction,
		selectAllTransactions,
		transactionListParams,
		setTransactionListParams,
		fetchTransactions,
		updateTransactionStatus,
		exportTransactions,
	} = useAdminStore();

	const formatDate = (dateString: string) => {
		return dateString
			? new Date(dateString).toLocaleString("en-US", {
					year: "numeric",
					month: "short",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
			  })
			: new Date().toLocaleString("en-US", {
					year: "numeric",
					month: "short",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
			  });
	};

	const getStatusVariant = (status: TransactionStatus) => {
		switch (status) {
			case "SUCCESS":
			case "COMPLETED":
				return "success";
			case "PENDING":
				return "warning";
			case "PROCESSING":
				return "processing";
			case "FAILED":
				return "error";
			default:
				return "default";
		}
	};

	const columns: Column<AdminTransaction>[] = [
		{
			key: "transactionId",
			header: "Transaction ID",
			render: (tx) => (
				<span className="font-mono text-xs">{tx.transactionId}</span>
			),
			sortable: true,
		},
		{
			key: "email",
			header: "Email",
			sortable: true,
		},
		{
			key: "amount",
			header: "Amount",
			render: (tx) => formatCurrency(tx.amount),
			sortable: true,
		},
		{
			key: "status",
			header: "Status",
			render: (tx) => (
				<Badge variant={getStatusVariant(tx.status)}>{tx.status}</Badge>
			),
			sortable: true,
		},
		{
			key: "quid",
			header: "QUID",
			render: (tx) => (
				<span className="font-mono text-xs">{tx.quid}</span>
			),
			sortable: true,
		},
		{
			key: "createdAt",
			header: "Date",
			render: (tx) => formatDate(tx.createdAt),
			sortable: true,
		},
	];

	const handleViewDetails = (transaction: AdminTransaction) => {
		console.log("View transaction details:", transaction);
		// navigate(`/admin/transactions/${transaction.id}`);
	};

	const handleRetry = (transaction: AdminTransaction) => {
		if (window.confirm(`Retry transaction ${transaction.transactionId}?`)) {
			updateTransactionStatus(transaction.id, "PROCESSING");
		}
	};

	const handleExport = (transaction: AdminTransaction) => {
		exportTransactions("csv");
	};

	const handleBlock = (transaction: AdminTransaction) => {
		if (window.confirm(`Block transaction ${transaction.transactionId}?`)) {
			console.log("Block transaction:", transaction);
		}
	};

	const handleApprove = (transaction: AdminTransaction) => {
		if (
			window.confirm(`Approve transaction ${transaction.transactionId}?`)
		) {
			updateTransactionStatus(transaction.id, "COMPLETED");
		}
	};

	const getTransactionActions = (transaction: AdminTransaction) => {
		const baseActions: ActionItem[] = [
			{
				label: "View Details",
				onClick: handleViewDetails,
				icon: <Eye className="h-4 w-4" />,
			},
			{
				label: "Export",
				onClick: handleExport,
				icon: <Download className="h-4 w-4" />,
			},
		];

		if (
			transaction.status === "FAILED" ||
			transaction.status === "PENDING"
		) {
			baseActions.push({
				label: "Retry",
				onClick: handleRetry,
				icon: <RefreshCw className="h-4 w-4" />,
			});
		}

		if (transaction.status === "PENDING") {
			baseActions.push({
				label: "Approve",
				onClick: handleApprove,
				icon: <CheckCircle className="h-4 w-4" />,
			});
		}

		if (transaction.status !== "BLOCKED") {
			baseActions.push({
				label: "Block",
				onClick: handleBlock,
				icon: <Ban className="h-4 w-4" />,
				variant: "destructive" as const,
			});
		}

		return baseActions;
	};

	const handleSort = (field: string, direction: SortDirection) => {
		setTransactionListParams({
			sort: { field: field as keyof AdminTransaction, direction },
			page: 1,
		});
		fetchTransactions();
	};

	const handlePageChange = (page: number) => {
		setTransactionListParams({ page });
		fetchTransactions();
	};

	const handleSelectItem = (transactionId: number) => {
		const isSelected = selectedTransactions.includes(transactionId);
		selectTransaction(transactionId, !isSelected);
	};

	const handleSelectAll = (selected: boolean) => {
		selectAllTransactions(selected);
	};

	// Safe data access
	const tableData = transactions?.data || [];
	const pagination = transactions || {
		total: 0,
		page: 1,
		limit: 10,
		totalPages: 0,
	};

	return (
		<div className="space-y-4">
			<DataTable
				data={tableData}
				columns={columns}
				loading={loading.isLoading}
				actions={getTransactionActions}
				onSort={handleSort}
				sortBy={transactionListParams.sort?.field as string}
				sortDirection={transactionListParams.sort?.direction}
				selectedItems={selectedTransactions}
				onSelectItem={handleSelectItem}
				onSelectAll={handleSelectAll}
				selectable={true}
				keyField="id"
			/>

			{tableData.length > 0 && (
				<Pagination
					currentPage={pagination.page}
					totalPages={pagination.totalPages}
					totalItems={pagination.total}
					itemsPerPage={pagination.limit}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	);
};
