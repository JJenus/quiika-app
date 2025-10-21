import React from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { AdminTransaction } from '../../../types/api';
import { Button } from '../../ui/Button';
import { MoreVertical } from 'lucide-react';
import { LoadingSpinner } from '../../ui/LoadingSpinner';

// Using the same mock components from QuidDataTable for now.
const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...props}>{children}</table>;
const TableHeader = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" {...props}>{children}</thead>;
const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props}>{children}</tbody>;
const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" {...props}>{children}</tr>;
const TableHead = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => <th scope="col" className="px-6 py-3" {...props}>{children}</th>;
const TableCell = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => <td className="px-6 py-4" {...props}>{children}</td>;

interface BadgeType {
	children: any;
	variant: "default" | "success" | "warning" | "error" | "processing";
}
const Badge = ({ children, variant = "default", ...props }: BadgeType) => {
	const variantClasses = {
		default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
		success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
		warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
		error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
	};
	return (
		<span className={`px-2 py-1 text-xs font-medium rounded-full ${variantClasses[variant]}`} {...props}>
			{children}
		</span>
	);
};


export const TransactionDataTable: React.FC = () => {
	const { transactions, loading } = useAdminStore();

	if (loading.isLoading && !transactions?.data) {
		return <div className="flex justify-center items-center h-64"><LoadingSpinner text="Fetching transactions..." /></div>;
	}

	if (!transactions || transactions.data.length === 0) {
		return (
			<div className="text-center py-16">
				<h3 className="text-lg font-semibold">No Transactions Found</h3>
				<p className="text-sm text-text-secondary dark:text-text-secondary-dark">
					Try adjusting your filters or search terms.
				</p>
			</div>
		);
	}
	
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString('en-US', {
			year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
		});
	};
	
	const formatCurrency = (amount: number, currency: string) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100);
	};

	const getStatusVariant = (status: string): BadgeType['variant'] => {
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

	return (
		<div className="space-y-4">
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Transaction ID</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>QUID</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transactions.data.map((tx: AdminTransaction) => (
							<TableRow key={tx.id}>
								<TableCell className="font-mono text-xs">{tx.transactionId}</TableCell>
								<TableCell>{tx.email}</TableCell>
								<TableCell>{formatCurrency(tx.amount, tx.currency)}</TableCell>
								<TableCell>
									<Badge variant={getStatusVariant(tx.status)}>
										{tx.status}
									</Badge>
								</TableCell>
								<TableCell className="font-mono text-xs">{tx.quid}</TableCell>
								<TableCell>{formatDate(tx.createdAt)}</TableCell>
								<TableCell>
									<Button variant="ghost" size="sm">
										<MoreVertical className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{/* Pagination will go here */}
		</div>
	);
};
