import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeStore } from "../../stores/useThemeStore";

interface ThemeToggleProps {
	switchOnMobile?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ switchOnMobile }) => {
	const { theme, setTheme } = useThemeStore();

	const themes = [
		{ key: "light" as const, icon: Sun, label: "Light" },
		{ key: "dark" as const, icon: Moon, label: "Dark" },
		{ key: "system" as const, icon: Monitor, label: "System" },
	];

	return (
		<div className="flex justify-center items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
			{themes.map(({ key, icon: Icon, label }) => (
				<button
					key={key}
					onClick={() => setTheme(key)}
					className={`
            flex items-center justify-center p-2 rounded-md transition-all duration-200
            ${
				theme === key
					? "bg-white dark:bg-gray-700 text-primary shadow-sm"
					: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
			}
          ${switchOnMobile && "hidden md:flex"}`}
					title={`Switch to ${label.toLowerCase()} theme`}
					aria-label={`Switch to ${label.toLowerCase()} theme`}
				>
					<Icon className="h-4 w-4" />
				</button>
			))}

			{switchOnMobile && (
				<div className="m-0 pr-1">
					<button
						onClick={() => setTheme(themes[0].key)}
						className={`hidden dark:flex md:dark:hidden
              flex items-center justify-center p-2 rounded-md transition-all duration-200
              bg-white dark:bg-gray-700 text-primary shadow-sm 
              hover:text-gray-900 dark:hover:text-gray-200
            `}
						title={`Switch to ${themes[0].label.toLowerCase()} theme`}
						aria-label={`Switch to ${"light"} theme`}
					>
						<Sun className="h-4 w-4" />
					</button>

					<button
						onClick={() => setTheme(themes[1].key)}
						className={` dark:hidden md:hidden
              flex items-center justify-center p-2 rounded-md transition-all duration-200
              bg-white dark:bg-gray-700 text-primary shadow-sm 
              hover:text-gray-900 dark:hover:text-gray-200
            `}
						title={`Switch to ${themes[1].label.toLowerCase()} theme`}
						aria-label={`Switch to ${"dark"} theme`}
					>
						<Moon className="h-4 w-4" />
					</button>
				</div>
			)}
		</div>
	);
};
