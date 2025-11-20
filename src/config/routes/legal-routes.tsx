import { RouteConfig } from "@/types/route-config";

// Import components
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { TermsConditionsPage } from '@/pages/TermsConditionsPage';
import { CookiePolicyPage } from '@/pages/CookiePolicyPage';

// Legal routes configuration
export const legalRoutes: RouteConfig[] = [
	{
		path: "/privacy",
		element: <PrivacyPolicyPage />,
		layout: "public",
		seo: true,
	},
	{
		path: "/terms",
		element: <TermsConditionsPage />,
		layout: "public",
		seo: true,
	},
	{
		path: "/cookies",
		element: <CookiePolicyPage />,
		layout: "public",
		seo: true,
	},
];