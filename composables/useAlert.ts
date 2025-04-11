import Swal from "sweetalert2"

export const useAlert = () => {
	const error = (text?: string) => {
		return Swal.fire({
			text: text || "Sorry, looks like there are some errors detected, please try again.",
			icon: "error",
			buttonsStyling: false,
			confirmButtonText: "Ok, got it!",
			customClass: {
				confirmButton: "btn btn-primary",
			},
		})
	}

	const success = (text: string) => {
		return Swal.fire({
			text,
			icon: "success",
			buttonsStyling: false,
			confirmButtonText: "Ok, got it!",
			timer: 5000,
			customClass: {
				confirmButton: "btn btn-primary",
			},
		})
	}

	const warning = (text: string) => {
		return Swal.fire({
			text,
			icon: "warning",
			buttonsStyling: false,
			confirmButtonText: "Ok, got it!",
			customClass: {
				confirmButton: "btn btn-primary",
			},
		})
	}

	const info = (text: string) => {
		return Swal.fire({
			text,
			icon: "info",
			buttonsStyling: false,
			confirmButtonText: "Ok, got it!",
			customClass: {
				confirmButton: "btn btn-primary",
			},
		})
	}

	return {
		error,
		success,
		warning,
		info,
	}
}
