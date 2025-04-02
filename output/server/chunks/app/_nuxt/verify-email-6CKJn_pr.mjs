import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-qGrmvVcF.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref, withCtx, createTextVNode } from 'vue';
import { u as useRuntimeConfig, d as useRoute } from '../server.mjs';
import { u as useSeoMeta } from './index-4S8gYkD_.mjs';
import { u as useAuth } from './authStates-UuGEqxuG.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import axios from 'axios';
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
import 'vue-router';
import 'currency.js';
import './cookie-LmZMIXX4.mjs';

const _imports_0 = "" + publicAssetsURL("assets/media/illustrations/sigma-1/17-dark.png");
const _imports_1 = "" + publicAssetsURL("assets/media/auth/verify-email.png");
const currentPage = "Verify Account";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "verify-email",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useRuntimeConfig();
    const CONFIG = useRuntimeConfig().public;
    useSeoMeta({
      title: `${CONFIG.APP} - ${currentPage}`
    });
    const id = useRoute().query["id"];
    console.log(id);
    ref(false);
    const loading = ref(false);
    const verifyEmail2 = () => {
      var _a;
      const axiosConfig = {
        method: "post",
        data: {
          id
        },
        url: `${appConfig.public.BE_API}/auth/verify-email`,
        timeout: 15e3,
        headers: {
          Authorization: "Bearer " + ((_a = useAuth().userData.value) == null ? void 0 : _a.token)
        }
      };
      axios.request(axiosConfig).then((response) => {
        const data = response.data;
        console.log(data);
      }).catch((error) => {
        console.log(error);
        error.response.data;
      }).finally(() => {
        loading.value = false;
      });
    };
    verifyEmail2();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "d-flex flex-column flex-root",
        id: "kt_app_root"
      }, _attrs))} data-v-7aaff423><div class="d-flex flex-column flex-center flex-column-fluid" data-v-7aaff423><div class="d-flex flex-column flex-center text-center p-10" data-v-7aaff423><div class="card card-flush w-lg-650px py-5" data-v-7aaff423><div class="card-body py-15 py-lg-20" data-v-7aaff423><div class="mb-14" data-v-7aaff423> QuiikaLogo /&gt; </div>`);
      if (!unref(loading)) {
        _push(`<h1 class="fw-bolder text-success mb-5" data-v-7aaff423> Verification Complete </h1>`);
      } else {
        _push(`<h1 class="fw-bolder text-muted mb-5" data-v-7aaff423> Verifying... </h1>`);
      }
      if (!unref(loading)) {
        _push(`<div class="fs-6 mb-8" data-v-7aaff423><span class="fw-semibold text-gray-500" data-v-7aaff423>Email verified, proceed to sign in. </span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-11" data-v-7aaff423>`);
      if (!unref(loading)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/sign-in",
          class: "btn btn-sm btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sign in `);
            } else {
              return [
                createTextVNode(" Sign in ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="spinner-border spinner-border-lg text-muted" data-v-7aaff423></span>`);
      }
      _push(`</div><div class="mb-0" data-v-7aaff423>`);
      if (!unref(loading)) {
        _push(`<img${ssrRenderAttr("src", _imports_0)} class="mw-100 mh-300px" alt="" data-v-7aaff423>`);
      } else {
        _push(`<img${ssrRenderAttr("src", _imports_1)} class="mw-100 mh-300px" alt="" data-v-7aaff423>`);
      }
      _push(`</div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/verify-email.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const verifyEmail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7aaff423"]]);

export { verifyEmail as default };
//# sourceMappingURL=verify-email-6CKJn_pr.mjs.map
