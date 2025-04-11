import axios from "axios";
import type { AppSettings } from "~/utils/interfaces/AppSettings";
import currency from "currency.js";

export const useAppSettings = () => {
	const init: AppSettings = {
		id: 0,
		ethAddress: "",
		defaultLanguage: "",
		mintingFee: "",
		gasFee: "",
		createdAt: "",
		updatedAt: "",
	};
	const settings = useState<AppSettings>("app-settings", () => init);
	const isPageLoading = useState("load-page", () => true);
	const themeMode = useState("app-theme-mode", () => "light");

	const getMoney = (amount: string | number) => {
		const value = currency(amount);
		return value.value;
	};

	const getMoneyFromKobo = (amount: string | number) => {
		const value = currency(amount, { fromCents: true });
		return value.value;
	};

	const getFractionalCurrency = (amount: string | number) => {
		const value = currency(amount);
		return value.intValue;
	};
	const formatFractionalCurrency = (
		amount: string | number,
		sym = "NGN "
	) => {
		const value = currency(amount, { symbol: sym, fromCents: true });
		return value.format();
	};

	const load = () => {
		const axiosConfig: any = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}/settings`,
			timeout: 20000,
			// headers: {
			//     Authorization: "Bearer " + useAuth().userData.value?.token,
			// },
		};

		axios
			.request(axiosConfig)
			.then((response) => {
				settings.value = response.data;
				// console.log(settings.value);
			})
			.catch((error): void => {
				console.log(error);
			});
	};

	// load();

	return {
		settings,
		isPageLoading,
		themeMode,
		load,
		getMoney,
		getFractionalCurrency,
		formatFractionalCurrency,
		getMoneyFromKobo
	};
};
