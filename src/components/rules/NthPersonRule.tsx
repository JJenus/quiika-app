// components/rules/NthPersonRule.tsx
import { Dices } from "lucide-react";
import React, { useState, useEffect } from "react";

interface NthPersonRuleProps {
	nthPerson: number;
	onNthPersonChange: (value: number) => void;
}

export const NthPersonRule: React.FC<NthPersonRuleProps> = ({
	nthPerson,
	onNthPersonChange,
}) => {
	const [isRolling, setIsRolling] = useState(false);
	const [displayValue, setDisplayValue] = useState(nthPerson);

	// Sync display value with actual value
	useEffect(() => {
		if (!isRolling) {
			setDisplayValue(nthPerson);
		}
	}, [nthPerson, isRolling]);

	const randomPerson = async () => {
		if (isRolling) return;
		
		setIsRolling(true);
		
		// Animation settings
		const duration = 1500; // 1.5 seconds
		const interval = 100; // Update every 100ms
		const startTime = Date.now();
		
		const animate = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);
			
			if (progress < 1) {
				// Easing function for smooth animation
				const easeOut = 1 - Math.pow(1 - progress, 3);
				const speed = Math.max(50, 500 * (1 - easeOut)); // Slow down towards the end
				
				// Show random values during animation
				const tempRandom = Math.floor(Math.random() * 1000) + 1;
				setDisplayValue(tempRandom);
				
				setTimeout(animate, speed);
			} else {
				// Final value
				const finalRandom = Math.floor(Math.random() * 1000) + 1;
				onNthPersonChange(finalRandom);
				setDisplayValue(finalRandom);
				setIsRolling(false);
			}
		};
		
		animate();
	};

	return (
		<div className="space-y-4">
			<label
				htmlFor="nthPerson"
				className="block text-sm font-medium text-text-primary dark:text-text-primary-dark"
			>
				Which person can access this gift?
			</label>
			<div className="relative">
				<input
					type="number"
					id="nthPerson"
					value={displayValue}
					onChange={(e) => {
						const value = Number(e.target.value);
						onNthPersonChange(value);
						setDisplayValue(value);
					}}
					min="1"
					className={`input-field pr-16 transition-all duration-200 ${
						isRolling ? "bg-gray-100 dark:bg-gray-800" : ""
					}`}
					placeholder="e.g. 1 for first person"
					readOnly={isRolling}
				/>
				<button
					type="button"
					onClick={randomPerson}
					disabled={isRolling}
					className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-all duration-300 ${
						isRolling 
							? "text-gray-400 cursor-not-allowed animate-bounce top-1/3" 
							: "text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 hover:scale-110 hover:rotate-12"
					}`}
					title="Roll random number"
				>
					<Dices className="h-5 w-5" />
					{isRolling && (
						<span className="absolute top-0 -right-1 w-1 h-1 bg-red-500 rounded-full animate-ping" />
					)}
				</button>
			</div>
			{isRolling && (
				<div className="flex items-center space-x-2">
					<div className="w-3 h-3 bg-secondary-400 rounded-full animate-pulse" />
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Rolling... {displayValue}
					</p>
				</div>
			)}
		</div>
	);
};