import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-qGrmvVcF.mjs';
import { u as useRuntimeConfig, a as useAppSettings } from '../server.mjs';
import { u as useSeoMeta } from './index-4S8gYkD_.mjs';
import * as vue from 'vue';
import { useSSRContext, ref, watch, mergeProps, withCtx, createVNode, defineComponent, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import * as cleave from 'cleave.js';
import moment from 'moment';
import { useRoute } from 'vue-router';
import 'vue-bundle-renderer/runtime';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'axios';
import 'currency.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : "undefined" !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

var vueCleave = {exports: {}};

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(cleave);

const require$$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(vue);

(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory(require$$0, require$$1);
	})(commonjsGlobal, (__WEBPACK_EXTERNAL_MODULE__144__, __WEBPACK_EXTERNAL_MODULE__976__) => {
	return /******/ (() => { // webpackBootstrap
	/******/ 	var __webpack_modules__ = ({

	/***/ 144:
	/***/ ((module) => {

	module.exports = __WEBPACK_EXTERNAL_MODULE__144__;

	/***/ }),

	/***/ 976:
	/***/ ((module) => {

	module.exports = __WEBPACK_EXTERNAL_MODULE__976__;

	/***/ })

	/******/ 	});
	/************************************************************************/
	/******/ 	// The module cache
	/******/ 	var __webpack_module_cache__ = {};
	/******/ 	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/ 		// Check if module is in cache
	/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
	/******/ 		if (cachedModule !== undefined) {
	/******/ 			return cachedModule.exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = __webpack_module_cache__[moduleId] = {
	/******/ 			// no module.id needed
	/******/ 			// no module.loaded needed
	/******/ 			exports: {}
	/******/ 		};
	/******/ 	
	/******/ 		// Execute the module function
	/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
	/******/ 	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/ 	
	/************************************************************************/
	/******/ 	/* webpack/runtime/compat get default export */
	/******/ 	(() => {
	/******/ 		// getDefaultExport function for compatibility with non-harmony modules
	/******/ 		__webpack_require__.n = (module) => {
	/******/ 			var getter = module && module.__esModule ?
	/******/ 				() => (module['default']) :
	/******/ 				() => (module);
	/******/ 			__webpack_require__.d(getter, { a: getter });
	/******/ 			return getter;
	/******/ 		};
	/******/ 	})();
	/******/ 	
	/******/ 	/* webpack/runtime/define property getters */
	/******/ 	(() => {
	/******/ 		// define getter functions for harmony exports
	/******/ 		__webpack_require__.d = (exports, definition) => {
	/******/ 			for(var key in definition) {
	/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
	/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
	/******/ 				}
	/******/ 			}
	/******/ 		};
	/******/ 	})();
	/******/ 	
	/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
	/******/ 	(() => {
	/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
	/******/ 	})();
	/******/ 	
	/************************************************************************/
	var __webpack_exports__ = {};
	// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
	(() => {

	// EXPORTS
	__webpack_require__.d(__webpack_exports__, {
	  "default": () => (/* binding */ src)
	});

	// EXTERNAL MODULE: external {"commonjs":"cleave.js","commonjs2":"cleave.js","amd":"cleave.js","root":"Cleave"}
	var external_commonjs_cleave_js_commonjs2_cleave_js_amd_cleave_js_root_Cleave_ = __webpack_require__(144);
	var external_commonjs_cleave_js_commonjs2_cleave_js_amd_cleave_js_root_Cleave_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_cleave_js_commonjs2_cleave_js_amd_cleave_js_root_Cleave_);
	// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","amd":"vue","root":"Vue"}
	var external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_ = __webpack_require__(976);


	/* harmony default export */ const component = ((0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.defineComponent)({
	  name: 'cleave',
	  compatConfig: {
	    MODE: 3
	  },
	  render() {
	    return (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.h)('input', {
	      type: 'text',
	      value: this.cleave ? this.cleave.properties.result : this.modelValue,
	      // Cleave.js will set this as initial value
	      onBlur: this.onBlur
	    });
	  },
	  props: {
	    modelValue: {
	      default: null,
	      required: true,
	      validator(value) {
	        return value === null || typeof value === 'string' || value instanceof String || typeof value === 'number';
	      }
	    },
	    // https://github.com/nosir/cleave.js/blob/master/doc/options.md
	    options: {
	      type: Object,
	      default: () => ({})
	    },
	    // Set this prop as `false` to emit masked value
	    raw: {
	      type: Boolean,
	      default: true
	    }
	  },
	  emits: ['blur', 'update:modelValue'],
	  data() {
	    return {
	      // cleave.js instance
	      cleave: null,
	      // callback backup
	      onValueChangedFn: null
	    };
	  },
	  mounted() {
	    /* istanbul ignore if */
	    if (this.cleave) return;
	    this.cleave = new (external_commonjs_cleave_js_commonjs2_cleave_js_amd_cleave_js_root_Cleave_default())(this.$el, this.getOptions(this.options));
	  },
	  methods: {
	    /**
	     * Inject our method in config options
	     */
	    getOptions(options) {
	      // Preserve original callback
	      this.onValueChangedFn = options.onValueChanged;
	      return Object.assign({}, options, {
	        onValueChanged: this.onValueChanged
	      });
	    },
	    /**
	     * Watch for value changed by cleave and notify parent component
	     */
	    onValueChanged(event) {
	      let value = this.raw ? event.target.rawValue : event.target.value;
	      this.$emit('update:modelValue', value);

	      // Call original callback method
	      if (typeof this.onValueChangedFn === 'function') {
	        this.onValueChangedFn.call(this, event);
	      }
	    },
	    onBlur() {
	      this.$emit('blur', this.modelValue);
	    }
	  },
	  watch: {
	    /**
	     * Watch for any changes in options and redraw
	     */
	    options: {
	      deep: true,
	      handler(newOptions) {
	        this.cleave.destroy();
	        this.cleave = new (external_commonjs_cleave_js_commonjs2_cleave_js_amd_cleave_js_root_Cleave_default())(this.$el, this.getOptions(newOptions));
	        this.cleave.setRawValue(this.modelValue);
	      }
	    },
	    /**
	     * Watch for changes from parent component and notify cleave instance
	     */
	    modelValue(newValue) {
	      /* istanbul ignore if */
	      if (!this.cleave) return;

	      // when v-model is not masked (raw)
	      if (this.raw && newValue === this.cleave.getRawValue()) return;
	      //  when v-model is masked (NOT raw)
	      if (!this.raw && newValue === this.$el.value) return;
	      // Lastly set newValue
	      this.cleave.setRawValue(newValue);
	    }
	  },
	  beforeUnmount() {
	    /* istanbul ignore if */
	    if (!this.cleave) return;
	    this.cleave.destroy();
	    this.cleave = null;
	    this.onValueChangedFn = null;
	  }
	}));

	const src_plugin = (app, params) => {
	  let name = 'cleave';
	  /* istanbul ignore else */
	  if (typeof params === 'string') name = params;
	  app.component(name, component);
	};
	component.install = src_plugin;
	/* harmony default export */ const src = (component);
	})();

	__webpack_exports__ = __webpack_exports__["default"];
	/******/ 	return __webpack_exports__;
	/******/ })()
	;
	}); 
} (vueCleave));

var vueCleaveExports = vueCleave.exports;
const Cleave = /*@__PURE__*/getDefaultExportFromCjs(vueCleaveExports);

const _imports_0 = "" + publicAssetsURL("assets/media/illustrations/misc/credit-card.png");
function useBlockUI(targetId) {
  const blockUI = ref(null);
  const toggleBlock = () => {
    var _a, _b;
    if ((_a = blockUI.value) == null ? void 0 : _a.isBlocked()) {
      blockUI.value.release();
    } else {
      (_b = blockUI.value) == null ? void 0 : _b.block();
    }
  };
  return {
    toggleBlock
  };
}
var TransactionStatus = /* @__PURE__ */ ((TransactionStatus2) => {
  TransactionStatus2["PENDING"] = "PENDING";
  TransactionStatus2["COMPLETED"] = "COMPLETED";
  TransactionStatus2["FAILED"] = "FAILED";
  TransactionStatus2["CANCELLED"] = "CANCELLED";
  TransactionStatus2["SUCCESS"] = "SUCCESS";
  return TransactionStatus2;
})(TransactionStatus || {});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MakePayment",
  __ssrInlineRender: true,
  setup(__props) {
    const CONFIG = useRuntimeConfig().public;
    CONFIG.BE_API;
    const { getFractionalCurrency, getMoney, formatFractionalCurrency } = useAppSettings();
    const email = ref("");
    const amount = ref("");
    const showForm = ref(true);
    ref();
    const transactionResponse = ref({
      quid: "TZIOMSUY",
      currency: "NGN",
      amount: 80800,
      status: TransactionStatus.COMPLETED,
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
      transactionId: "Wie94ijEURI-kdiUU80"
    });
    useBlockUI();
    const loader = ref({
      initiating: false,
      processing: false
    });
    const checkAmount = () => {
      const inputAmount = getMoney(amount.value);
      const is = inputAmount > 1e5;
      return is;
    };
    useSeoMeta({
      title: `${CONFIG.APP} - Share freely`
    });
    const statusColor = (status) => {
      return status === TransactionStatus.COMPLETED ? "success" : status === TransactionStatus.PENDING ? "light-warning" : "light-danger";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div id="tokenize-form" class="card card-custom bg-light-successi border-0 h-md-100 mb-5 mb-lg-10">`);
      if (showForm.value) {
        _push(`<div class="card-body d-flex align-items-center justify-content-center flex-wrap ps-xl-15 pe-0 gap-8 gap-md-10"><div class="flex-grow-1 mt-2 me-9 me-md-6 mb-8"><div class="mb-5"><h1 class="display-6"><span class="text-success">Gift</span> Easily </h1><h6 class="text-muted">Be anonymous.</h6></div><div class="position-relative text-gray-800 fs-2 z-index-2 fw-bold mb-5"> Send With Ease </div><form class="h-100"><div class="mb-5"><label for="amount" class="form-label required fw-bold"> Amount </label>`);
        _push(ssrRenderComponent(unref(Cleave), {
          type: "text",
          name: "amount",
          class: [
            "form-control form-control-solidi form-control-lg text-centeri fw-bold",
            checkAmount() ? "border-danger border-3 is-invalid" : ""
          ],
          options: {
            numeral: true,
            numeralThousandsGroupStyle: "thousand",
            numeralDecimalMark: ".",
            // Specifies the decimal mark
            numeralDecimalScale: 2,
            // Allows up to 8 decimal places
            numeralIntegerScale: 15
            // Adjust as needed (max integer length)
          },
          placeholder: "Enter amount",
          modelValue: amount.value,
          "onUpdate:modelValue": ($event) => amount.value = $event
        }, null, _parent));
        _push(`</div><div class="mb-5"><label for="email" class="form-label required fw-bold"> Email </label><input type="email" id="email" name="email"${ssrRenderAttr("value", email.value)} class="form-control form-control-solidi form-control-lg"></div><button${ssrIncludeBooleanAttr(loader.value.initiating) ? " disabled" : ""} class="btn btn-primary w-100">`);
        if (!loader.value.initiating) {
          _push(`<span> Proceed </span>`);
        } else {
          _push(`<span> Please wait... <span class="spinner-border spinner-border-sm"></span></span>`);
        }
        _push(`</button></form></div><img${ssrRenderAttr("src", _imports_0)} class="h-175px me-auto" alt=""></div>`);
      } else if (transactionResponse.value) {
        _push(`<div class="card-body min-w-500px"><div class="d-print-none border border-dashed border-gray-300 card-rounded h-lg-100 min-w-md-350px p-9 bg-lighten" bis_skin_checked="1"><div class="mb-8"><span class="${ssrRenderClass([
          "badge-" + statusColor(transactionResponse.value.status),
          "badge me-2"
        ])}">${ssrInterpolate(transactionResponse.value.status)}</span></div><h6 class="mb-8 fw-bolder text-capitalize text-gray-600 text-hover-primary"> TRANSACTION DETAILS </h6><div class="mb-6" bis_skin_checked="1"><div class="fw-semibold text-gray-600 fs-7" bis_skin_checked="1"> Amount: </div><div class="fw-bold text-gray-800 fs-6" bis_skin_checked="1">${ssrInterpolate(transactionResponse.value.currency)} ${ssrInterpolate(unref(formatFractionalCurrency)(
          transactionResponse.value.amount,
          ""
        ))}</div></div><div class="mb-6" bis_skin_checked="1"><div class="fw-semibold text-gray-600 fs-7" bis_skin_checked="1"> QUID: </div><div class="fw-bold text-gray-800 fs-6" bis_skin_checked="1">${ssrInterpolate(transactionResponse.value.quid)}</div></div><div class="mb-6" bis_skin_checked="1"><div class="fw-semibold text-gray-600 fs-7" bis_skin_checked="1"> Transaction ID: </div><div class="fw-bold fs-6 text-gray-800 d-flex align-items-center" bis_skin_checked="1">${ssrInterpolate(transactionResponse.value.transactionId)}</div></div><div class="mb-15" bis_skin_checked="1"><div class="fw-semibold text-gray-600 fs-7" bis_skin_checked="1"> Transaction Date: </div><div class="fw-bold fs-6 text-gray-800 d-flex align-items-center" bis_skin_checked="1">${ssrInterpolate(transactionResponse.value.timestamp)} <span class="fs-7 text-success d-flex align-items-center"><span class="bullet bullet-dot bg-danger mx-2"></span> ${ssrInterpolate(unref(moment)(
          transactionResponse.value.timestamp
        ).fromNow())}</span></div></div><h6 class="mb-2 fw-bolder text-gray-600 text-hover-primary"> Seamlessly withdraw access funds with the Quiika Pay Unique ID (QUID) </h6><div class="fw-bold fs-6 text-gray-800" bis_skin_checked="1"><a href="#" class="link-primary ps-1">Withdraw to local bank account</a></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MakePayment.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Withdraw",
  __ssrInlineRender: true,
  setup(__props) {
    const CONFIG = useRuntimeConfig().public;
    CONFIG.BE_API;
    useAppSettings();
    const form = ref({
      quid: "",
      accountName: "",
      accountNumber: "",
      amount: "",
      bankCode: "",
      bankName: ""
    });
    const showForm = ref(false);
    const banks = ref([]);
    const quidResponse = ref(null);
    useBlockUI();
    const loader = ref({
      fetchingBanks: false,
      verifyingQuid: false,
      processing: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)}><div id="withdrawal-form" class="card card-custom border-0 h-md-100 mb-5 mb-lg-10"><div class="card-body d-flex align-items-center justify-content-center flex-wrap ps-xl-15 pe-0 gap-8 gap-md-10"><div class="flex-grow-1 mt-2 me-auto mb-8"><div class="text-centeri mb-10"><h1 class="display-6"><span class="text-success">Withdraw</span> Funds </h1><h6 class="text-muted"> Transfer funds to your bank account. </h6></div><div class="position-relative text-gray-800 fs-2 z-index-2 fw-bold mb-5 d-none"> Withdraw Funds </div>`);
      if (!showForm.value) {
        _push(`<form class="h-100"><div class="mb-5"><label for="quid" class="form-label required fw-bold"> QUID </label><input type="text" id="quid" name="quid"${ssrRenderAttr("value", form.value.quid)} class="form-control form-control-solid form-control-lg" placeholder="Enter QUID"><small class="text-muted"> Enter your QUID to verify and proceed. </small></div><button${ssrIncludeBooleanAttr(loader.value.verifyingQuid) ? " disabled" : ""} class="btn btn-primary w-100">`);
        if (!loader.value.verifyingQuid) {
          _push(`<span> Submit </span>`);
        } else {
          _push(`<span> verifying... <span class="spinner-border spinner-border-sm"></span></span>`);
        }
        _push(`</button></form>`);
      } else if (((_a = quidResponse.value) == null ? void 0 : _a.status) === unref(TransactionStatus).SUCCESS) {
        _push(`<form class="h-100"><div class="mb-5"><label for="quid" class="form-label required fw-bold"> QUID </label><input disabled type="text" id="quid" name="quid"${ssrRenderAttr("value", form.value.quid)} class="form-control form-control-solidi form-control-lg" placeholder="Enter QUID"><small class="text-muted"> Verified QUID. </small></div><div class="mb-5"><label for="amount" class="form-label required fw-bold"> Amount </label>`);
        _push(ssrRenderComponent(unref(Cleave), {
          disabled: "",
          type: "text",
          name: "amount",
          class: "form-control disabled form-control-solidi form-control-lg text-center fw-bold",
          options: {
            numeral: true,
            numeralThousandsGroupStyle: "thousand",
            numeralDecimalMark: ".",
            numeralDecimalScale: 2,
            numeralIntegerScale: 15
          },
          placeholder: "Enter amount",
          modelValue: form.value.amount,
          "onUpdate:modelValue": ($event) => form.value.amount = $event
        }, null, _parent));
        _push(`</div><div class="mb-5"><label for="accountName" class="form-label required fw-bold"> Account Name </label><input type="text" id="accountName" name="accountName"${ssrRenderAttr("value", form.value.accountName)} class="form-control form-control-solid form-control-lg" placeholder="Enter account name"></div><div class="mb-5"><label for="accountNumber" class="form-label required fw-bold"> Account Number </label><input type="text" id="accountNumber" name="accountNumber"${ssrRenderAttr("value", form.value.accountNumber)} class="form-control form-control-solid form-control-lg" placeholder="Enter account number"></div><div class="mb-5"><label for="bank" class="form-label required fw-bold"> Bank </label><select id="bank" name="bank" class="form-control form-control-solid form-control-lg"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(form.value.bankCode) ? ssrLooseContain(form.value.bankCode, "") : ssrLooseEqual(form.value.bankCode, "")) ? " selected" : ""}> Select your bank </option><!--[-->`);
        ssrRenderList(banks.value, (bank) => {
          _push(`<option${ssrRenderAttr("value", bank.code)}>${ssrInterpolate(bank.name)}</option>`);
        });
        _push(`<!--]--></select></div><button${ssrIncludeBooleanAttr(loader.value.processing) ? " disabled" : ""} class="btn btn-primary w-100">`);
        if (!loader.value.processing) {
          _push(`<span> Submit </span>`);
        } else {
          _push(`<span> Processing... <span class="spinner-border spinner-border-sm"></span></span>`);
        }
        _push(`</button></form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="h-175px me-auto"><i class="ki-duotone ki-shield-tick text-primary" style="${ssrRenderStyle({ "font-size": "13rem" })}"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></i></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Withdraw.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const activeTab = ref("send");
    watch(
      () => route.hash,
      // Watch the hash value in the route
      (newHash) => {
        const hash = newHash.replace("#", "");
        if (hash === "send" || hash === "claim") {
          activeTab.value = hash;
        }
      },
      { immediate: true }
      // Trigger the watcher immediately on mount
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_MakePayment = _sfc_main$2;
      const _component_Withdraw = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-fluid" }, _attrs))}><div class="d-flex justify-content-center"><div class="card min-h-md-600px min-w-md-700px" bis_skin_checked="1"><div class="card-header position-relative min-h-50px p-0 border-bottom-2" bis_skin_checked="1"><ul class="nav nav-pills nav-pills-custom d-flex position-relative w-100" role="tablist"><li class="nav-item mx-0 p-0 w-50" role="presentation">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: ["nav-link btn btn-color-muted border-0 h-100 px-0", { active: activeTab.value === "send" }],
        to: "#send",
        role: "tab"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nav-text fw-bold fs-4 mb-3"${_scopeId}> Send </span><span class="bullet-custom position-absolute z-index-2 w-100 h-2px top-100 bottom-n100 bg-primary rounded"${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", { class: "nav-text fw-bold fs-4 mb-3" }, " Send "),
              createVNode("span", { class: "bullet-custom position-absolute z-index-2 w-100 h-2px top-100 bottom-n100 bg-primary rounded" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item mx-0 px-0 w-50" role="presentation">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: ["nav-link btn btn-color-muted border-0 h-100 px-0", { active: activeTab.value === "claim" }],
        to: "#claim",
        role: "tab"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nav-text fw-bold fs-4 mb-3"${_scopeId}> Claim </span><span class="bullet-custom position-absolute z-index-2 w-100 h-2px top-100 bottom-n100 bg-primary rounded"${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", { class: "nav-text fw-bold fs-4 mb-3" }, " Claim "),
              createVNode("span", { class: "bullet-custom position-absolute z-index-2 w-100 h-2px top-100 bottom-n100 bg-primary rounded" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="card-body" bis_skin_checked="1"><div class="tab-content" bis_skin_checked="1"><div class="${ssrRenderClass([{ "active show": activeTab.value === "send" }, "tab-pane fade"])}" role="tabpanel" bis_skin_checked="1">`);
      _push(ssrRenderComponent(_component_MakePayment, null, null, _parent));
      _push(`</div><div class="${ssrRenderClass([{ "active show": activeTab.value === "claim" }, "tab-pane fade"])}" role="tabpanel" bis_skin_checked="1">`);
      _push(ssrRenderComponent(_component_Withdraw, null, null, _parent));
      _push(`</div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-iWlBg-FT.mjs.map
