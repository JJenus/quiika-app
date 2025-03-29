export const navs = ref([
	{
		name: "App",
		path: "/",
		icon: "ki-outline ki-home-3",
		paths: [],
	},
	{
		name: "About",
		path: "/about",
		icon: "ki-solid ki-send",
		paths: [],
	},
	{
		name: "Contact Us",
		path: "/contact-us",
		icon: "ki-duotone ki-scan-barcode",
		paths: [
			"path1",
			"path2",
			"path3",
			"path4",
			"path5",
			"path6",
			"path7",
			"path8",
		],
	},
]);

export const closeDrawer = () => {
	const body = document.querySelector(".drawer-overlay") as HTMLElement;
	if (body !== null) body.click();
};
