import React from "react";
import { Gift } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo: React.FC = () => {
	return (
		<Link to="/" className="flex-shrink-0 bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
			<Gift className="h-6 w-6 text-white" />
		</Link>
	);
};
