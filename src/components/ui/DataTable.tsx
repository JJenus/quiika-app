import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Button } from './Button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { SortDirection } from '../../types/api';
import { ActionDropdownProps, ActionItem } from '../../types/table';

// Table Components (same as before)
const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...props}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props}>{children}</tbody>
);

const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th scope="col" className="px-4 py-3" {...props}>
    {children}
  </th>
);

const TableCell = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className="px-4 py-4" {...props}>
    {children}
  </td>
);

// Badge Component (same as before)
interface BadgeProps {
  children: React.ReactNode;
  variant: 'default' | 'success' | 'warning' | 'error' | 'processing' | 'info';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    info: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};



const ActionDropdown = ({ actions, item }: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 z-20 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="py-1">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick(item);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                  action.variant === 'destructive'
                    ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main DataTable Component (Updated to match your types)
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
  keyField = 'id'
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && selectedItems.length === data.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < data.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading data..." />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
          {emptyMessage}
        </h3>
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1">
          {emptyDescription}
        </p>
      </div>
    );
  }

  const handleSort = (key: string) => {
    if (!onSort || !columns.find(col => col.key === key)?.sortable) return;
    
    const direction = sortBy === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, direction);
  };

  const handleSelectItem = (item: T) => {
    onSelectItem?.(item.id);
  };

  const isItemSelected = (item: T) => selectedItems.includes(item.id);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {selectable && (
            <TableHead className="w-12">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={allSelected}
                ref={input => {
                  if (input) {
                    input.indeterminate = someSelected;
                  }
                }}
                onChange={(e) => onSelectAll?.(e.target.checked)}
              />
            </TableHead>
          )}
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className={column.className}
            >
              <div className="flex items-center gap-1">
                <span>{column.header}</span>
                {column.sortable && onSort && (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="inline-flex flex-col hover:text-primary transition-colors"
                  >
                    <ChevronLeft 
                      className={`h-3 w-3 rotate-90 transition-colors ${
                        sortBy === column.key && sortDirection === 'asc' 
                          ? 'text-primary' 
                          : 'text-gray-400'
                      }`}
                    />
                    <ChevronRight 
                      className={`h-3 w-3 -rotate-90 transition-colors ${
                        sortBy === column.key && sortDirection === 'desc' 
                          ? 'text-primary' 
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                )}
              </div>
            </TableHead>
          ))}
          {actions && <TableHead className="w-16">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {selectable && (
              <TableCell>
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={isItemSelected(item)}
                  onChange={() => handleSelectItem(item)}
                />
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell key={column.key} className={column.className}>
                {column.render ? column.render(item) : (item as any)[column.key]}
              </TableCell>
            ))}
            {actions && (
              <TableCell>
                <ActionDropdown actions={actions(item)} item={item} />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Pagination Component (Updated to match your pagination structure)
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
  onItemsPerPageChange
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

  const startItem = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
      <div className="text-sm text-text-secondary dark:text-text-secondary-dark">
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex gap-1">
          {getPageNumbers().map(page => (
            <Button
              key={page}
              variant={currentPage === page ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              className="w-10 h-10 p-0"
            >
              {page}
            </Button>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {onItemsPerPageChange && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-secondary dark:text-text-secondary-dark">
            Rows per page:
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800"
          >
            {[10, 25, 50, 100].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}