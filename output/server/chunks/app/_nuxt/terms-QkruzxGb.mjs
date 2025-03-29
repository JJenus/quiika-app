import { _ as __nuxt_component_0 } from './nuxt-link-qGrmvVcF.mjs';
import { u as useRuntimeConfig } from '../server.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _imports_0 } from './quiika-logo-TgDY_-sO.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'axios';
import 'currency.js';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "QuiikaLogoMini",
  __ssrInlineRender: true,
  props: {
    classes: {},
    appClass: {},
    appClassDark: {}
  },
  setup(__props) {
    useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: "/",
        class: "d-flex align-items-center justify-content-center position-relative m-0 p-0"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img alt="Logo"${ssrRenderAttr("src", _imports_0)} class="${ssrRenderClass([_ctx.classes, ""])}" class=""${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                alt: "Logo",
                src: _imports_0,
                class: [_ctx.classes, ""]
              }, null, 2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuiikaLogoMini.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "terms",
  __ssrInlineRender: true,
  setup(__props) {
    const details = ref({
      lastUpdate: "2025-03-29",
      jurisdiction: "Port Harcourt",
      country: "Nigerian",
      version: "1.0"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_QuiikaLogoMini = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "content d-flex flex-column flex-column-fluid fs-6",
        id: "kt_content"
      }, _attrs))}><div class="container-xxl" id="kt_content_container"><div class="card" aria-labelledby="main-terms-title"><div class="card-body p-lg-15"><div class="mb-15 text-center">`);
      _push(ssrRenderComponent(_component_QuiikaLogoMini, { classes: "h-80px mb-8" }, null, _parent));
      _push(`<h1 class="fs-2x text-gray-800 fw-bolder mb-6" id="main-terms-title">Quiika Terms and Conditions</h1><p class="fw-semibold fs-4 text-gray-600 mb-2"> Last Updated: ${ssrInterpolate(unref(details).lastUpdate)}</p></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">1. Acceptance of Terms</h2><p class="fw-semibold fs-5 text-gray-600 mb-6"> By accessing or using the Quiika platform (&quot;Service&quot;), you agree to be bound by these Terms and Conditions (&quot;Terms&quot;). If you disagree with any part, you may not access the Service. </p></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">2. Service Description</h2><p class="fw-semibold fs-5 text-gray-600 mb-6"> Quiika provides: <ul class="mb-6"><li>A giveaway management system that randomly selects winners based on transparent criteria</li><li>A financial transaction platform using the QUID system</li><li>Verification services for giveaway legitimacy</li></ul></p></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">3. User Responsibilities</h2><div class="mb-6"><h3 class="fs-3 text-gray-800 fw-bold mb-4">3.1 Giveaway Hosts</h3><p class="fw-semibold fs-5 text-gray-600 mb-4"> You must: <ul><li>Clearly state all participation requirements</li><li>Honor all promised prizes</li><li>Not manipulate or bias the selection process</li><li>Pre-fund giveaways before activation</li></ul></p></div><div class="mb-6"><h3 class="fs-3 text-gray-800 fw-bold mb-4">3.2 Participants</h3><p class="fw-semibold fs-5 text-gray-600 mb-4"> You must: <ul><li>Follow all stated entry requirements</li><li>Provide accurate information for prize fulfillment</li><li>Not use multiple accounts to enter giveaways</li><li>Claim prizes within 14 days of selection</li></ul></p></div></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">4. Financial Transactions</h2><p class="fw-semibold fs-5 text-gray-600 mb-6"><ul class="mb-6"><li>All QUID transactions are final unless proven fraudulent</li><li>Monetary transactions processed by third-party providers (including Paystack) are subject to their respective terms</li><li>You are responsible for any tax implications of prizes received</li><li>Quiika may charge service fees as disclosed at time of transaction</li><li>Maximum QUID balance: \u20A6500,000 per user</li></ul></p></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">5. Regulatory Compliance</h2><p class="fw-semibold fs-5 text-gray-600 mb-6"><ul class="mb-6"><li>Quiika operates in accordance with all applicable ${ssrInterpolate(unref(details).country)} regulations regarding digital value transfer services</li><li>Users must comply with local laws governing giveaways and prizes</li><li>KYC verification required for transactions exceeding regulatory thresholds</li></ul></p></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">6. Prohibited Conduct</h2><p class="fw-semibold fs-5 text-gray-600 mb-6"> You may not: <ul><li>Use the Service for illegal activities including money laundering</li><li>Create fake giveaways or misrepresent prizes</li><li>Attempt to manipulate the winner selection process</li><li>Harass other users or Quiika staff</li><li>Reverse engineer or disrupt the Service</li><li>Use QUID for commercial payments or money transmission services</li></ul></p></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">7. Intellectual Property</h2><p class="fw-semibold fs-5 text-gray-600 mb-6"><ul class="mb-6"><li>Quiika owns all rights to the platform and QUID system</li><li>You retain rights to your content but grant Quiika a license to use it for Service operation</li><li>Unauthorized use of Quiika trademarks is prohibited</li><li>All giveaway results and verification data are Quiika proprietary information</li></ul></p></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">8. Dispute Resolution</h2><p class="fw-semibold fs-5 text-gray-600 mb-6"><ol><li>Giveaway disputes must be reported within 7 days of winner selection</li><li>Quiika may investigate but is not obligated to mediate</li><li>Technical disputes will be resolved through platform verification tools</li><li>Legal disputes shall be resolved in ${ssrInterpolate(unref(details).jurisdiction)} under ${ssrInterpolate(unref(details).country)} Law</li><li>Binding arbitration required before litigation</li></ol></p></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">9. Limitation of Liability</h2><p class="fw-semibold fs-5 text-gray-600 mb-6"> Quiika is not responsible for: <ul><li>Prizes not delivered by giveaway hosts</li><li>User-generated content accuracy</li><li>Service interruptions beyond our reasonable control</li><li>Indirect damages from Service use</li><li>Third-party payment processor failures</li><li>Tax liabilities arising from prizes or transactions</li></ul></p></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">10. Modifications</h2><p class="fw-semibold fs-5 text-gray-600 mb-6"><ul class="mb-6"><li>We may update these Terms at any time</li><li>Continued use after changes constitutes acceptance</li><li>Material changes will be notified via email or in-app notice</li><li>Users will be presented with new Terms for re-acceptance when logging in after major updates</li></ul></p></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">11. Termination</h2><p class="fw-semibold fs-5 text-gray-600 mb-6"><ul class="mb-6"><li>Quiika may suspend or terminate accounts for violations of these Terms</li><li>Terminated accounts forfeit pending prizes</li><li>Outstanding QUID balances will be refunded within 30 days minus any fees</li><li>You may terminate your account at any time through the app settings</li></ul></p></div><div class="mb-13"><h2 class="fs-1 text-gray-800 fw-bold mb-6">12. Contact</h2><p class="fw-semibold fs-5 text-gray-600 mb-6"> For questions about these Terms:<br><br><strong>Quiika Legal Department</strong><br> Email: legal@quiika.com<br> Address: [Your Registered Office Address]<br> Disputes must include: Username, Giveaway ID (if applicable), and Transaction Reference </p></div><div class="text-center mt-10"><p class="text-gray-500 fs-6"><strong>Version ${ssrInterpolate(unref(details).version)}</strong> | Effective ${ssrInterpolate(unref(details).lastUpdate)} | \xA9 2025 Quiika Technologies </p></div><div class="card bg-light-primary rounded border-0 p-6 mt-10"><div class="card-body text-center"><h3 class="fs-3 text-gray-800 fw-bold mb-4">Acceptance</h3><p class="fw-semibold fs-5 text-gray-600 mb-6"> By using Quiika, you acknowledge that you have read, understood, and agree to be bound by these Terms. </p><p class="fw-semibold fs-6 text-gray-600"> Last accepted version will be recorded in your account settings. </p></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=terms-QkruzxGb.mjs.map
