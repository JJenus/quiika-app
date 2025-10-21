import React from "react";
import { useAdminStore } from "../../../stores/useAdminStore";
import { AdminQuid } from "../../../types/api";
import { Button } from "../../ui/Button";
import { MoreVertical } from "lucide-react";
import { LoadingSpinner } from "../../ui/LoadingSpinner";

// Mock components
const Table = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableElement>) => (
	<table
		className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
		{...props}
	>
		{children}
	</table>
);
const TableHeader = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
	<thead
		className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
		{...props}
	>
		{children}
	</thead>
);
const TableBody = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
	<tbody {...props}>{children}</tbody>
);
const TableRow = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
	<tr
		className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
		{...props}
	>
		{children}
	</tr>
);
const TableHead = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableCellElement>) => (
	<th scope="col" className="px-6 py-3" {...props}>
		{children}
	</th>
);
const TableCell = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableCellElement>) => (
	<td className="px-6 py-4" {...props}>
		{children}
	</td>
);

interface BadgeType {
	children: any;
	variant: "default" | "success" | "warning" | "error";
}

const Badge = ({ children, variant = "default", ...props }: BadgeType) => {
	const variantClasses = {
		default:
			"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
		success:
			"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
		warning:
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
		error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
	};

	return (
		<span
			className={`px-2 py-1 text-xs font-medium rounded-full ${variantClasses[variant]}`}
			{...props}
		>
			{children}
		</span>
	);
};

export const QuidDataTable: React.FC = () => {
	// Use individual selectors to avoid unnecessary re-renders
	const quids = useAdminStore((state) => state.quids);
	const loading = useAdminStore((state) => state.loading);

	if (loading.isLoading && !quids?.data) {
		return (
			<div className="flex justify-center items-center h-64">
				<LoadingSpinner text="Fetching QUIDs..." />
			</div>
		);
	}

	if (!quids || quids.data.length === 0) {
		return (
			<div className="text-center py-16">
				<h3 className="text-lg font-semibold">No QUIDs Found</h3>
				<p className="text-sm text-text-secondary dark:text-text-secondary-dark">
					Try adjusting your filters or search terms.
				</p>
			</div>
		);
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const formatCurrency = (amount: number, currency: string) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
			minimumFractionDigits: 2,
		}).format(amount / 100);
	};

	const getStatusVariant = (status: string) => {
		switch (status) {
			case "ACTIVE":
				return "success";
			case "CLAIMED":
				return "default";
			case "BLOCKED":
				return "error";
			case "EXPIRED":
				return "warning";
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
								<TableCell className="font-mono text-sm">
									{quid.quid}
								</TableCell>
								<TableCell className="font-medium">
									{formatCurrency(quid.amount, quid.currency)}
								</TableCell>
								<TableCell>
									<Badge
										variant={getStatusVariant(quid.status)}
									>
										{quid.status}
									</Badge>
								</TableCell>
								<TableCell>{quid.creatorEmail}</TableCell>
								<TableCell>
									{formatDate(quid.createdAt)}
								</TableCell>
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
		</div>
	);
};
