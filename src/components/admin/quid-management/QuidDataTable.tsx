import React from 'react';
import { useAdminStore } from '../../../stores/useAdminStore';
import { AdminQuid } from '../../../types/api';
// Assuming these UI components exist.
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/Table';
// import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { MoreVertical } from 'lucide-react';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
// import QuidPagination from './QuidPagination';

// Mock components if they don't exist, to make the file compile.
const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...props}>{children}</table>;
const TableHeader = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" {...props}>{children}</thead>;
const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props}>{children}</tbody>;
const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" {...props}>{children}</tr>;
const TableHead = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => <th scope="col" className="px-6 py-3" {...props}>{children}</th>;
const TableCell = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => <td className="px-6 py-4" {...props}>{children}</td>;
const Badge = ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" {...props}>{children}</span>;


export const QuidDataTable: React.FC = () => {
	const { quids, loading } = useAdminStore(state => ({
		quids: state.quids,
		loading: state.loading,
	}));

	if (loading.isLoading && !quids?.data) {
		return <div className="flex justify-center items-center h-64"><LoadingSpinner text="Fetching QUIDs..." /></div>;
	}

	if (!quids || quids.data.length === 0) {
		return <div className="text-center py-16">
			<h3 className="text-lg font-semibold">No QUIDs Found</h3>
			<p className="text-sm text-text-secondary dark:text-text-secondary-dark">Try adjusting your filters.</p>
		</div>;
	}
	
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};
	
	const formatCurrency = (amount: number, currency: string) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100);
	};

	return (
		<div className="space-y-4">
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>QUID</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Creator Email</TableHead>
							<TableHead>Created At</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{quids.data.map((quid: AdminQuid) => (
							<TableRow key={quid.id}>
								<TableCell className="font-mono">{quid.quid}</TableCell>
								<TableCell>{formatCurrency(quid.amount, quid.currency)}</TableCell>
								<TableCell>
									<Badge>{quid.status}</Badge>
								</TableCell>
								<TableCell>{quid.creatorEmail}</TableCell>
								<TableCell>{formatDate(quid.createdAt)}</TableCell>
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
			{/* <QuidPagination /> */}
		</div>
	);
};
