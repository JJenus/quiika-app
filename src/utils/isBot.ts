// utils/isBot.ts
export const isBot = (): boolean => {
	const ua = navigator.userAgent.toLowerCase();

	return /bot|crawl|slurp|spider|mediapartners|facebook|twitter|whatsapp|preview|headless/.test(
		ua
	);
};
