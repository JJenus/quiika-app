// Improved Badge Component
interface BadgeProps {
	children: React.ReactNode;
	variant?:
	  | "default"
	  | "success"
	  | "warning"
	  | "error"
	  | "processing"
	  | "info"
	  | "primary"
	  | "secondary"
	  | "destructive";
	className?: string;
	size?: "sm" | "md" | "lg";
  }
  
  export const Badge = ({
	children,
	variant = "default",
	className = "",
	size = "md",
  }: BadgeProps) => {
	const baseClasses = "inline-flex items-center font-medium rounded-full";
	
	const sizeClasses = {
	  sm: "px-1.5 py-0.5 text-xs",
	  md: "px-2.5 py-0.5 text-sm",
	  lg: "px-3 py-1 text-base",
	};
  
	const variantClasses = {
	  default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
	  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
	  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
	  error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
	  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
	  info: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
	  primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
	  secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
	  destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
	};
  
	return (
	  <span
		className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
	  >
		{children}
	  </span>
	);
  };