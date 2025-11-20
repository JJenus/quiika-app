import { RouteConfig } from "@/types/route-config";
import { PaymentCallbackPage } from "@/pages/PaymentCallbackPage";

// Special routes (no layout, callbacks, etc.)
export const specialRoutes: RouteConfig[] = [
	{
		path: "/payment/callback",
		element: <PaymentCallbackPage />,
		layout: "none",
	},
];
