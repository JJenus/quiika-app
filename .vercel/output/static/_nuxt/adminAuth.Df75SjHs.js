import{bM as a}from"./entry.ZpkgtNy5.js";import{u as r}from"./cookie.EJVXnNVP.js";import{u as o}from"./authStates.6oguzW_w.js";const d=a((i,s)=>{var e;const u=r("auth");if(u.value==null||u.value==null)return o().logout();const t=o();if(!t.isAuthenticated()||((e=t.userData.value)==null?void 0:e.user.userType)!=="admin")return t.logout()});export{d as default};
