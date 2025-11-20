import { RouteConfig } from "@/types/route-config";

import { HomePage } from '@/pages/HomePage';
import { CreateGiftPage } from '@/pages/CreateGiftPage';
import { ClaimGiftPage } from '@/pages/ClaimGiftPage';
import { TransactionsPage } from '@/pages/TransactionsPage';
import { WithdrawPage } from '@/pages/WithdrawPage';
import { RulesPage } from '@/pages/RulesPage';

import { HelpPage } from '@/pages/HelpPage';


// Public routes configuration
export const publicRoutes: RouteConfig[] = [
	{
		path: "/",
		element: <HomePage />,
		layout: "public",
		seo: true,
	},
	{
		path: "/create",
		element: <CreateGiftPage />,
		layout: "public",
		seo: true,
	},
	{
		path: "/rules",
		element: <RulesPage />,
		layout: "public",
		seo: true,
	},
	{
		path: "/claim",
		element: <ClaimGiftPage />,
		layout: "public",
		seo: true,
	},
	{
		path: "/claim/:quid",
		element: <ClaimGiftPage />,
		layout: "public",
		seo: true,
	},
	{
		path: "/transactions",
		element: <TransactionsPage />,
		layout: "public",
		seo: true,
	},
	{
		path: "/withdraw",
		element: <WithdrawPage />,
		layout: "public",
		seo: true,
	},
	{
		path: "/help",
		element: <HelpPage />,
		layout: "public",
		seo: true,
	},
];
