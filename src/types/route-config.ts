import { UserRole } from "@/lib/api";
import { ReactNode } from "react";

export interface RouteConfig {
	path: string;
	element: ReactNode;
	layout?: "public" | "admin" | "none";
	seo?: boolean;
	protected?: boolean;
	requiredRoles?: UserRole[];
	children?: RouteConfig[];
}
