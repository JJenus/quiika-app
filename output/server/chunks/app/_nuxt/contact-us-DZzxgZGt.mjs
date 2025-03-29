import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
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

const _imports_0 = "" + publicAssetsURL("assets/media/svg/brand-logos/twitter.svg");
const _imports_1 = "" + publicAssetsURL("assets/media/svg/brand-logos/facebook-3.svg");
const _imports_2 = "" + publicAssetsURL("assets/media/svg/brand-logos/telegram.svg");
const _imports_3 = "" + publicAssetsURL("assets/media/svg/brand-logos/instagram-2016.svg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "kt_app_content",
    class: "app-content flex-column-fluid container"
  }, _attrs))}><div id="kt_app_content_container" class="app-container container-fluid"><div class="d-flex flex-column flex-xl-row"><div class="card bg-body flex-row-fluid mb-9 mb-xl-0 me-xl-9"><div class="card-body"><form action="#" class="form mb-15" method="post" id="kt_contact_form"><div class="d-flex flex-column mb-9 fv-row"><h1 class="fw-bold text-gray-900 mb-7"> Contact Quiika Support </h1><span class="fs-4 fw-semibold text-gray-600 d-block"> Need help with giveaways or transactions? Our team is here to assist you 24/7. <br> Average response time: under 2 hours for priority issues. </span></div><div class="row mb-5"><div class="col-md-6 fv-row"><label class="fs-5 fw-semibold mb-2">Name</label><input type="text" class="form-control form-control-solid" placeholder="Your name" name="name"></div><div class="col-md-6 fv-row"><label class="fs-5 fw-semibold mb-2">Email</label><input type="text" class="form-control form-control-solid" placeholder="Your email" name="email"></div></div><div class="d-flex flex-column mb-5 fv-row"><label class="fs-5 fw-semibold mb-2">Subject</label><select class="form-select form-select-solid" name="subject"><option value=""> Select an issue type </option><option value="giveaway"> Giveaway Support </option><option value="transaction"> Transaction Issue </option><option value="verification"> Account Verification </option><option value="business"> Business Inquiry </option><option value="other">Other</option></select></div><div class="d-flex flex-column mb-10 fv-row"><label class="fs-6 fw-semibold mb-2">Message</label><textarea class="form-control form-control-solid" rows="6" name="message" placeholder="Describe your issue in detail..."></textarea></div><button type="submit" class="btn btn-primary" id="kt_contact_submit_button"><span class="indicator-label"> Submit Request</span><span class="indicator-progress"> Sending... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span></button></form><div id="kt_contact_map" class="w-100 rounded mb-2 mb-lg-0 mt-2" style="${ssrRenderStyle({ "height": "486px" })}"></div></div></div><div class="flex-column flex-lg-row-auto w-100 w-xl-350px"><div class="card card-flush bg-body mb-9"><div class="card-header"><h2 class="card-title fs-2 fw-bold text-gray-900"> Quick Support Channels </h2><div class="card-toolbar"><button type="button" class="btn btn-sm btn-icon btn-color-primary"><i class="ki-outline ki-phone fs-1"></i></button></div></div><div class="card-body pt-2"><div class="mb-5"><div class="d-flex flex-stack mb-5"><span class="text-gray-500 fs-4 fw-bold">Twitter Support</span><a href="https://twitter.com/QuiikaSupport" class="text-gray-700 fs-4 fw-bold"> @QuiikaSupport </a></div><div class="d-flex flex-stack mb-5"><span class="text-gray-500 fs-4 fw-bold">Giveaway Help</span><a href="mailto:giveaways@quiika.com" class="text-gray-700 fs-4 fw-bold"> giveaways@quiika.com </a></div><div class="d-flex flex-stack"><span class="text-gray-500 fs-4 fw-bold">App Support</span><span class="text-gray-700 fs-4 fw-bold"> In-app chat </span></div></div><span class="text-gray-800 fs-6 fw-semibold d-block mb-9"> For urgent giveaway disputes or transaction issues, please use Twitter support for fastest response. Include giveaway tweet links for verification. </span><div class="d-flex flex-stack mb-6"><h2 class="card-title fs-2 fw-bold text-gray-900"> Business Inquiries </h2><div class="card-toolbar"><button type="button" class="btn btn-sm btn-icon btn-color-primary"><i class="ki-outline ki-sms fs-2hx"></i></button></div></div><div class="mb-4"><div class="d-flex flex-stack mb-5"><span class="text-gray-500 fs-4 fw-bold">Partnerships</span><a href="mailto:partners@quiika.com" class="text-gray-700 text-hover-primary fs-4 fw-bold">partners@quiika.com</a></div><div class="d-flex flex-stack"><span class="text-gray-500 fs-4 fw-bold">Enterprise</span><a href="mailto:enterprise@quiika.com" class="text-gray-700 text-hover-primary fs-4 fw-bold">enterprise@quiika.com</a></div></div></div></div><div class="card card-flush bg-body"><div class="card-header"><h4 class="card-title fw-bold text-"> Join Our Community </h4></div><div class="card-body pt-2"><div class="mb-6"><a href="https://twitter.com/QuiikaApp" class="mb-6"><img${ssrRenderAttr("src", _imports_0)} class="h-20px me-2" alt="Twitter"><span class="text-gray-700 text-hover-primary fs-5 mb-6">Twitter</span></a></div><div class="mb-6"><a href="https://facebook.com/quiika" class="mb-6"><img${ssrRenderAttr("src", _imports_1)} class="h-20px me-2" alt="Discord"><span class="text-gray-700 text-hover-primary fs-5 mb-6">Facebook</span></a></div><div class="mb-6"><a href="https://t.me/quiika" class="mb-6"><img${ssrRenderAttr("src", _imports_2)} class="h-20px me-2" alt="Telegram"><span class="text-gray-700 text-hover-primary fs-5 mb-6">Telegram</span></a></div><div class=""><a href="https://instagram.com/quiikaapp" class="mb-6"><img${ssrRenderAttr("src", _imports_3)} class="h-20px me-2" alt="Instagram"><span class="text-gray-700 text-hover-primary fs-5 mb-6">Instagram</span></a></div></div></div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contactUs = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { contactUs as default };
//# sourceMappingURL=contact-us-DZzxgZGt.mjs.map
