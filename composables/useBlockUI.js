import { ref, onMounted } from "vue";

export function useBlockUI(targetId) {
	const blockUI = ref(null);

	const toggleBlock = () => {
		if (blockUI.value?.isBlocked()) {
			blockUI.value.release();
		} else {
			blockUI.value?.block();
		}
	};

	const releaseBtn = () => {
		const closeButton = document.querySelector("#blockui-close-btn-kt");
		if (closeButton) {
			closeButton.addEventListener("click", () => {
				toggleBlock();
			});
		}
	};

	onMounted(() => {
		const target = document.querySelector(`#${targetId}`);
		if (target) {
			blockUI.value = new KTBlockUI(target, {
				message: `
                    <div class="blockui-messagei fs-4 fw-bold">
                        <span class="spinner-border text-primary"></span>
                        Processing transaction...
                        <button id="blockui-close-btn-kt" class="ms-2 btn-sm btn btn-light p-1 px-2 d-nonei">
                            <i class="fas fa-times m-0 p-0"></i>
                        </button>
                    </div>
                `,
			});

			blockUI.value.on("kt.blockui.block", function () {
				console.log("before block");
				releaseBtn();
			});

			// Manually attach a click event listener to the button
			setTimeout(() => {
				releaseBtn();
			}, 4000);
		}
	});

	return {
		toggleBlock,
	};
}
