// Badge Component (same as before)
interface BadgeProps {
	children: React.ReactNode;
	variant:
		| "default"
		| "success"
		| "warning"
		| "error"
		| "processing"
		| "info";
	className?: string;
}

export const Badge = ({
	children,
	variant = "default",
	className = "",
}: BadgeProps) => {
	const variantClasses = {
		default:
			"bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
		success:
			"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
		warning:
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
		error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
		processing:
			"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
		info: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
	};

	return (
		<span
			className={`px-2 py-1 text-xs font-medium rounded-full ${variantClasses[variant]} ${className}`}
		>
			{children}
		</span>
	);
};