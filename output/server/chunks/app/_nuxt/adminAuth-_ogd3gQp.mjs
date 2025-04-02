import { e as defineNuxtRouteMiddleware } from '../server.mjs';
import { u as useCookie } from './cookie-LmZMIXX4.mjs';
import { u as useAuth } from './authStates-UuGEqxuG.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'axios';
import 'currency.js';

const adminAuth = defineNuxtRouteMiddleware((to, from) => {
  var _a;
  const cookie = useCookie("auth");
  if (cookie.value == null || cookie.value == void 0) {
    return useAuth().logout();
  }
  const auth = useAuth();
  if (!auth.isAuthenticated() || ((_a = auth.userData.value) == null ? void 0 : _a.user.userType) !== "admin") {
    return auth.logout();
  }
});

export { adminAuth as default };
//# sourceMappingURL=adminAuth-_ogd3gQp.mjs.map
