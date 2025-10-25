// Action Dropdown Component (same as before)
export interface ActionItem {
	label: string;
	onClick: (item: any) => void;
	variant?: "default" | "destructive";
	icon?: React.ReactNode;
}

export interface ActionDropdownProps {
	actions: ActionItem[];
	item: any;
}
