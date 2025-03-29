import { u as useRuntimeConfig, b as useRoute, a as useAppSettings } from '../server.mjs';
import { useSSRContext, ref, defineComponent, mergeProps, unref, watch, withCtx, createVNode, toDisplayString, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _imports_0 } from './quiika-logo-TgDY_-sO.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-qGrmvVcF.mjs';
import { useRoute as useRoute$1 } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
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
import 'axios';
import 'currency.js';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "QuiikaLogo",
  __ssrInlineRender: true,
  props: {
    classes: {},
    appClass: {},
    textClass: {}
  },
  setup(__props) {
    const { APP } = useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: "/",
        class: "d-flex algin-items-center gap-3 justify-content-center"
      }, _attrs))}><img alt="Logo"${ssrRenderAttr("src", _imports_0)} class="${ssrRenderClass(_ctx.classes)}"><span class="${ssrRenderClass([_ctx.textClass, "fw-bold theme-dark-show fs-1 text-white mt-2"])}">${ssrInterpolate(unref(APP))}</span><span class="${ssrRenderClass([_ctx.textClass, "fw-bold theme-light-show fs-1 text-primary mt-2"])}">${ssrInterpolate(unref(APP))}</span></a>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuiikaLogo.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const navs = ref([
  {
    name: "App",
    path: "/",
    icon: "ki-outline ki-home-3",
    paths: []
  },
  {
    name: "About",
    path: "/about",
    icon: "ki-solid ki-send",
    paths: []
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
      "path8"
    ]
  }
]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const activePath = ref(route.path);
    watch(
      () => route.path,
      (newPath) => {
        activePath.value = newPath;
        console.log("Path changed:", newPath);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-none d-md-block" }, _attrs))}><ul class="nav nav-stretch nav-pills nav-pills-custom d-flex mt-4 align-items-center fs-5 fw-bold"><!--[-->`);
      ssrRenderList("navs" in _ctx ? _ctx.navs : unref(navs), (nav) => {
        _push(`<li class="nav-item p-0 ms-0" role="presentation">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: ["nav-link btn btn-color-gray-500 flex-center px-3", {
            active: unref(activePath) === nav.path
          }],
          to: nav.path,
          "aria-selected": unref(activePath) === nav.path,
          tabindex: "-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="nav-text mb-3"${_scopeId}>${ssrInterpolate(nav.name)}</span><span class="bullet-custom position-absolute z-index-2 w-100 h-3px top-100 bottom-n100 bg-primary rounded"${_scopeId}></span>`);
            } else {
              return [
                createVNode("span", { class: "nav-text mb-3" }, toDisplayString(nav.name), 1),
                createVNode("span", { class: "bullet-custom position-absolute z-index-2 w-100 h-3px top-100 bottom-n100 bg-primary rounded" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    useAppSettings();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_QuiikaLogo = _sfc_main$4;
      const _component_Navbar = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "kt_app_header",
        class: "app-header d-flex border-0 py-10",
        "data-kt-sticky": false,
        "data-kt-sticky-name": "app-header-sticky",
        "data-kt-sticky-offset": "{default: 'false', lg: '300px'}"
      }, _attrs))}><div class="app-container container-fluid d-flex align-items-center justify-content-between" id="kt_app_header_container"><div class="d-flex d-lg-none align-items-center me-auto">`);
      _push(ssrRenderComponent(_component_QuiikaLogo, { classes: "h-40px ms-n3" }, null, _parent));
      _push(`</div><div class="d-none d-lg-flex align-items-center">`);
      _push(ssrRenderComponent(_component_QuiikaLogo, { classes: "h-50px" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
      _push(`<div class="app-navbar flex-shrink-0" id="kt_app_aside_navbar"><div class="app-navbar-item ms-n3w"><button class="btn btn-icon theme-dark-show rounded-circle btn-light-primary btn-active-light-primary"><i class="ki-duotone ki-moon fs-2x"><span class="path1"></span><span class="path2"></span></i></button><button class="btn btn-icon theme-light-show rounded-circle btn-light-warning btn-active-light-warning"><i class="ki-duotone ki-night-day fs-4x fs-md-3x"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span></i></button></div></div><div class="d-flex d-lg-none align-items-center me-n1 ms-3 d-none" title="Show sidebar menu"><button class="btn btn-icon btn-icon-white btn-active-icon-white btn-active-color-white w-35px h-35px" id="kt_app_sidebar_mobile_toggle"><i class="ki-solid ki-burger-menu-5 fs-3x"></i></button></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "app-container card container-fluid fs-5 pt-10 mt-10 py-3",
        style: { "border-radius": "0" }
      }, _attrs))}><div class="row row-cols-1 row-cols-md-2 g-5 justify-content-between"><div class="col-md-4 order-2 order-md-1"><div class="d-flex flex-column align-items-center mb-6"><div class="d-flex flex-row align-items-center justify-content-center mb-3">`);
      _push(ssrRenderComponent(_sfc_main$4, {
        classes: "h-50px",
        "text-class": "mt-3"
      }, null, _parent));
      _push(`</div><p class="text-center p-4"> At <strong>Quiika</strong>, we empower individuals and businesses to send and receive funds effortlessly, fostering financial inclusion and enabling seamless transactions across diverse communities. Our innovative QUID system ensures secure, fast, and reliable access to funds, helping build a more connected and equitable financial ecosystem. </p></div></div><div class="col-md-5"><h2 class="fs-2qx text-danger mb-4">Stay Informed</h2><p class="mb-3"> Reach us on <br><strong>support@quiika.com</strong></p><p class="mb-4"> Don\u2019t miss out! Subscribe to our newsletter for updates. </p><div class="d-flex align-items-center"><div class="position-relative me-3 flex-grow-1"><i class="ki-outline ki-sms fs-3 position-absolute top-50 translate-middle-y ms-4"></i><input type="email" class="form-control w-100 ps-12" placeholder="Enter your email" aria-label="Email"></div><button class="btn btn-danger">Subscribe</button></div></div></div><div class="d-flex flex-column flex-md-row mt-9 align-items-center justify-content-between border-top pt-4"><div class="px-md-2 fs-6 text-center text-md-start"><span>Copyright \xA9 2023 ${ssrInterpolate(unref(config).APP)}. All rights reserved.</span></div><ul class="menu menu-gray-600 menu-hover-primary fw-semibold d-flex flex-wrap justify-content-center gap-3 mt-3 mt-md-0"><li class="menu-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "menu-link px-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` About `);
          } else {
            return [
              createTextVNode(" About ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="menu-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact-us",
        class: "menu-link px-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact Us `);
          } else {
            return [
              createTextVNode(" Contact Us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="menu-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/faqs",
        class: "menu-link px-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` FAQs `);
          } else {
            return [
              createTextVNode(" FAQs ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="menu-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms",
        class: "menu-link px-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Terms and Conditions `);
          } else {
            return [
              createTextVNode(" Terms and Conditions ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$1;
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute$1();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = __nuxt_component_0;
      const _component_Footer = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "kt_app_body",
        "data-kt-app-header-fixed-mobile": "true",
        "data-kt-app-sidebar-enabled": "true",
        "data-kt-app-sidebar-push-header": "true",
        "data-kt-app-sidebar-push-toolbar": "true",
        "data-kt-app-sidebar-push-footer": "true",
        class: "app-default w-100 overflow-hidden"
      }, _attrs))} data-v-7f4dbd5f><div class="d-flex flex-column flex-root app-root" id="kt_app_root" data-v-7f4dbd5f><div class="app-page flex-column flex-column-fluid" id="kt_app_page" data-v-7f4dbd5f>`);
      _push(ssrRenderComponent(_component_Header, { class: "mb-5" }, null, _parent));
      _push(`<div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper" data-v-7f4dbd5f><div class="app-main flex-column flex-row-fluid" id="kt_app_main" data-v-7f4dbd5f><div class="d-flex flex-column flex-column-fluid" data-v-7f4dbd5f><div id="kt_app_content" class="app-content flex-column-fluid" data-v-7f4dbd5f><div class="mb-3 container" data-v-7f4dbd5f></div><div style="${ssrRenderStyle({ "position": "relative" })}" id="kt_app_content_container" class="app-container position-relative" data-v-7f4dbd5f>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div></div></div></div><div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true" data-v-7f4dbd5f><i class="ki-outline ki-arrow-up" data-v-7f4dbd5f></i></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7f4dbd5f"]]);

export { _default as default };
//# sourceMappingURL=default-eK5OyG3V.mjs.map
