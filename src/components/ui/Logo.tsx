import React from "react";
import { Gift } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
	size?: "sm" | "md" | "lg";
	className?: string;
	showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
	size = "md", 
	className = "", 
	showText = false 
}) => {
	const sizeClasses = {
		sm: "p-1.5 rounded-lg",
		md: "p-2 rounded-xl", 
		lg: "p-3 rounded-2xl"
	};

	const iconSizes = {
		sm: "h-4 w-4",
		md: "h-6 w-6",
		lg: "h-8 w-8"
	};

	const textSizes = {
		sm: "text-sm",
		md: "text-lg",
		lg: "text-xl"
	};

	return (
		<Link 
			to="/" 
			className={`flex items-center gap-2 ${className}`}
			aria-label="Quiika - Home"
		>
			<div className={`flex-shrink-0 bg-gradient-to-br from-primary to-secondary ${sizeClasses[size]} transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
				<Gift className={`text-white ${iconSizes[size]}`} />
			</div>
			{showText && (
				<span className={`font-bold text-text-primary dark:text-text-primary-dark ${textSizes[size]}`}>
					Quiika
				</span>
			)}
		</Link>
	);
};