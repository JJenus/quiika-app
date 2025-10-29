import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { Button } from "./Button";
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	MoreHorizontal,
	ChevronsUpDown,
} from "lucide-react";
import { SortDirection } from "../../types/api";
import { ActionDropdownProps, ActionItem } from "../../types/table";

// Modern Table Components with shadcn/ui styling
const Table = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableElement>) => (
	<div className="relative w-full overflow-auto">
		<table
			className="w-full caption-bottom text-sm"
			{...props}
		>
			{children}
		</table>
	</div>
);

const TableHeader = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
	<thead className="[&_tr]:border-b" {...props}>
		{children}
	</thead>
);

const TableBody = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
	<tbody className="[&_tr:last-child]:border-0" {...props}>
		{children}
	</tbody>
);

const TableRow = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
	<tr
		className="border-b transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50 data-[state=selected]:bg-gray-50 dark:data-[state=selected]:bg-gray-800"
		{...props}
	>
		{children}
	</tr>
);

const TableHead = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableCellElement>) => (
	<th
		className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0"
		{...props}
	>
		{children}
	</th>
);

const TableCell = ({
	children,
	...props
}: React.HTMLAttributes<HTMLTableCellElement>) => (
	<td
		className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
		{...props}
	>
		{children}
	</td>
);

// Modern Action Dropdown
const ActionDropdown = ({ actions, item }: ActionDropdownProps) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const dropdownRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 h-8 w-8 p-0"
			>
				<MoreHorizontal className="h-4 w-4" />
				<span className="sr-only">Open menu</span>
			</button>

			{isOpen && (
				<div className="absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-1 shadow-md">
					{actions.map((action, index) => (
						<button
							key={index}
							onClick={() => {
								action.onClick(item);
								setIsOpen(false);
							}}
							className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 dark:focus:bg-gray-800 dark:focus:text-gray-50 ${
								action.variant === "destructive"
									? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
									: "hover:bg-gray-100 dark:hover:bg-gray-800"
							}`}
						>
							{action.icon && (
								<span className="mr-2">{action.icon}</span>
							)}
							{action.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

// Main DataTable Component
export interface Column<T> {
	key: string;
	header: string;
	render?: (item: T) => React.ReactNode;
	sortable?: boolean;
	className?: string;
}

interface DataTableProps<T> {
	data: T[];
	columns: Column<T>[];
	loading?: boolean;
	emptyMessage?: string;
	emptyDescription?: string;
	actions?: (item: T) => ActionItem[];
	onSort?: (field: string, direction: SortDirection) => void;
	sortBy?: string;
	sortDirection?: SortDirection;
	selectedItems?: number[];
	onSelectItem?: (itemId: number) => void;
	onSelectAll?: (selected: boolean) => void;
	selectable?: boolean;
	keyField?: string;
}

export function DataTable<T extends { id: number }>({
	data,
	columns,
	loading = false,
	emptyMessage = "No data found",
	emptyDescription = "Try adjusting your filters or search terms.",
	actions,
	onSort,
	sortBy,
	sortDirection,
	selectedItems = [],
	onSelectItem,
	onSelectAll,
	selectable = false,
	keyField = "id",
}: DataTableProps<T>) {
	const allSelected = data.length > 0 && selectedItems.length === data.length;
	const someSelected =
		selectedItems.length > 0 && selectedItems.length < data.length;

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<LoadingSpinner text="Loading data..." />
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 text-center">
				<div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mb-4">
					<svg
						className="h-6 w-6 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
					{emptyMessage}
				</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
					{emptyDescription}
				</p>
			</div>
		);
	}

	const handleSort = (key: string) => {
		if (!onSort || !columns.find((col) => col.key === key)?.sortable)
			return;

		const direction =
			sortBy === key && sortDirection === "asc" ? "desc" : "asc";
		onSort(key, direction);
	};

	const handleSelectItem = (item: T) => {
		onSelectItem?.(item.id);
	};

	const isItemSelected = (item: T) => selectedItems.includes(item.id);

	return (
		<div className="rounded-md border border-gray-200 dark:border-gray-800  dark:text-gray-300">
			<Table>
				<TableHeader>
					<TableRow>
						{selectable && (
							<TableHead className="w-12">
								<input
									type="checkbox"
									className="h-4 w-4 input-check rounded border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300 focus:ring-offset-2"
									checked={allSelected}
									ref={(input) => {
										if (input) {
											input.indeterminate = someSelected;
										}
									}}
									onChange={(e) =>
										onSelectAll?.(e.target.checked)
									}
								/>
							</TableHead>
						)}
						{columns.map((column) => (
							<TableHead
								key={column.key}
								className={column.className}
							>
								{column.sortable && onSort ? (
									<button
										onClick={() => handleSort(column.key)}
										className="inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-medium"
									>
										<span>{column.header}</span>
										{sortBy === column.key ? (
											sortDirection === "asc" ? (
												<ChevronUp className="h-4 w-4" />
											) : (
												<ChevronDown className="h-4 w-4" />
											)
										) : (
											<ChevronsUpDown className="h-4 w-4 opacity-50" />
										)}
									</button>
								) : (
									<span className="font-medium">{column.header}</span>
								)}
							</TableHead>
						))}
						{actions && (
							<TableHead className="w-16">
								<span className="sr-only">Actions</span>
							</TableHead>
						)}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item) => (
						<TableRow
							key={item.id}
							data-state={
								isItemSelected(item) ? "selected" : undefined
							}
						>
							{selectable && (
								<TableCell>
									<input
										type="checkbox"
										className="h-4 w-4 rounded text-gray-900 dark:text-gray-100 focus:ring-0 focus:ring-gray-950 dark:focus:ring-gray-300 focus:ring-offset-2"
										checked={isItemSelected(item)}
										onChange={() => handleSelectItem(item)}
									/>
								</TableCell>
							)}
							{columns.map((column) => (
								<TableCell
									key={column.key}
									className={column.className+" dark:text-gray-300"}
								>
									{column.render
										? column.render(item)
										: (item as any)[column.key]}
								</TableCell>
							))}
							{actions && (
								<TableCell className=" dark:text-gray-300">
									<ActionDropdown
										actions={actions(item)}
										item={item}
									/>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

// Modern Pagination Component
interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
	onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
	onItemsPerPageChange,
}: PaginationProps) {
	const getPageNumbers = () => {
		const pages = [];
		const showPages = 5;

		let start = Math.max(1, currentPage - Math.floor(showPages / 2));
		let end = Math.min(totalPages, start + showPages - 1);

		if (end - start + 1 < showPages) {
			start = Math.max(1, end - showPages + 1);
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4 ">
			<div className="flex items-center gap-6">
				<div className="text-sm text-gray-700 dark:text-gray-300">
					Showing <span className="font-medium">{startItem}</span> to{" "}
					<span className="font-medium">{endItem}</span> of{" "}
					<span className="font-medium">{totalItems}</span> results
				</div>

				{onItemsPerPageChange && (
					<div className="flex items-center gap-2">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Rows per page
						</label>
						<select
							value={itemsPerPage}
							onChange={(e) =>
								onItemsPerPageChange(Number(e.target.value))
							}
							className="h-8 w-16 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300 focus:ring-offset-2"
						>
							{[10, 25, 50, 100].map((size) => (
								<option key={size} value={size}>
									{size}
								</option>
							))}
						</select>
					</div>
				)}
			</div>

			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="h-8 w-8 p-0"
				>
					<ChevronLeft className="h-4 w-4" />
					<span className="sr-only">Previous page</span>
				</Button>

				<div className="flex gap-1">
					{currentPage > 3 && (
						<>
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(1)}
								className="h-8 w-8 p-0"
							>
								1
							</Button>
							{currentPage > 4 && (
								<span className="flex h-8 w-8 items-center justify-center text-sm text-gray-500">
									...
								</span>
							)}
						</>
					)}

					{getPageNumbers().map((page) => (
						<Button
							key={page}
							variant={
								currentPage === page ? "primary" : "outline"
							}
							size="sm"
							onClick={() => onPageChange(page)}
							className="h-8 w-8 p-0"
						>
							{page}
						</Button>
					))}

					{currentPage < totalPages - 2 && (
						<>
							{currentPage < totalPages - 3 && (
								<span className="flex h-8 w-8 items-center justify-center text-sm text-gray-500">
									...
								</span>
							)}
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(totalPages)}
								className="h-8 w-8 p-0"
							>
								{totalPages}
							</Button>
						</>
					)}
				</div>

				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="h-8 w-8 p-0"
				>
					<ChevronRight className="h-4 w-4" />
					<span className="sr-only">Next page</span>
				</Button>
			</div>
		</div>
	);
}