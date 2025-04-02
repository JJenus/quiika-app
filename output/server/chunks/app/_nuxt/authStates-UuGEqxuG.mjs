import { b as useState, n as navigateTo, u as useRuntimeConfig } from '../server.mjs';
import { u as useCookie } from './cookie-LmZMIXX4.mjs';
import axios from 'axios';

var NotificationStatus = /* @__PURE__ */ ((NotificationStatus2) => {
  NotificationStatus2["READ"] = "read";
  NotificationStatus2["UNREAD"] = "unread";
  return NotificationStatus2;
})(NotificationStatus || {});
const userData = () => {
  const initUser = {
    id: "",
    name: "",
    email: "",
    profileImg: "/assets/media/svg/avatars/blank.svg",
    phone: "",
    status: "",
    userRole: "",
    createdAt: "",
    ethAddress: "",
    balance: "",
    bannerImg: ""
  };
  const transactions = useState("user-transactions", () => []);
  const notifications = useState("notifications", () => []);
  const newNotification = useState("new-notifications", () => false);
  const data = useState("userData", () => initUser);
  const users = useState("users", () => []);
  const active = useState("active-user");
  const getUsers = () => {
    var _a, _b;
    if (!((_a = useAuth().userData.value) == null ? void 0 : _a.user)) {
      navigateTo("/sign-in");
    }
    const axiosConfig = {
      method: "get",
      url: `${useRuntimeConfig().public.BE_API}/users`,
      timeout: 2e4,
      headers: {
        Authorization: "Bearer " + ((_b = useAuth().userData.value) == null ? void 0 : _b.token)
      }
    };
    axios.request(axiosConfig).then((response) => {
      users.value = response.data.filter((e) => {
        return e.userRole !== "admin";
      }).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }).catch((error) => {
      const data2 = error.response.data;
      if (data2.message.includes("Access denied") || error.response.status === 401)
        ;
    });
  };
  const getNotifications = () => {
    var _a;
    const axiosConfig = {
      method: "get",
      url: `${useRuntimeConfig().public.BE_API}/notifications/${data.value.id}`,
      timeout: 15e3,
      headers: {
        Authorization: "Bearer " + ((_a = useAuth().userData.value) == null ? void 0 : _a.token)
      }
    };
    axios.request(axiosConfig).then((response) => {
      notifications.value = response.data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      notifications.value.forEach((notice) => {
        if (notice.status === NotificationStatus.UNREAD) {
          newNotification.value = true;
        }
      });
    }).catch((error) => {
    });
  };
  const showNotifications = () => {
    var _a;
    if (!newNotification.value) {
      return;
    }
    const axiosConfig = {
      method: "put",
      data: notifications.value,
      url: `${useRuntimeConfig().public.BE_API}/notifications/all`,
      timeout: 25e3,
      headers: {
        Authorization: "Bearer " + ((_a = useAuth().userData.value) == null ? void 0 : _a.token)
      }
    };
    axios.request(axiosConfig).then((response) => {
      notifications.value = response.data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      notifications.value.forEach((notice) => {
        if (notice.status === NotificationStatus.UNREAD) {
          newNotification.value = true;
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  };
  const loadUser = () => {
    var _a;
    const axiosConfig = {
      method: "get",
      url: `${useRuntimeConfig().public.BE_API}/users/${data.value.id}`,
      timeout: 2e4,
      headers: {
        Authorization: "Bearer " + ((_a = useAuth().userData.value) == null ? void 0 : _a.token)
      }
    };
    axios.request(axiosConfig).then((response) => {
      data.value = response.data;
    }).catch((error) => {
      const data2 = error.response.data;
      if (data2.message.includes("Access denied") || error.response.status === 401) {
        console.log("Access denied");
      }
    });
  };
  const isAdmin = () => {
    return data.value.userRole === "admin";
  };
  const checkBalance = (fee) => {
    if (isAdmin()) {
      return true;
    }
    const numFee = Number(fee);
    const numBalance = Number(data.value.balance);
    return numBalance >= numFee;
  };
  return {
    data,
    users,
    active,
    notifications,
    newNotification,
    transactions,
    getUsers,
    getNotifications,
    showNotifications,
    loadUser,
    isAdmin,
    checkBalance
  };
};
const useAuth = () => {
  const appUser = userData();
  const authData = useState("user", () => null);
  const authenticated = useState("isAuthenticated", () => false);
  const userAuth = useCookie("auth", {
    maxAge: 60 * 60 * 24
  });
  useState("authAction", () => "login");
  const login = async (auth) => {
    userAuth.value = auth;
    appUser.data.value = auth.user;
    authData.value = auth;
    authenticated.value = true;
    (void 0).location.href = "/account";
  };
  const logout = async () => {
    authData.value = null;
    authenticated.value = false;
    useCookie("auth").value = null;
    (void 0).location.href = "/";
  };
  const isAuthenticated = () => {
    if (authenticated.value) {
      return true;
    }
    const auth = useCookie("auth");
    if (auth.value == null || auth.value == void 0) {
      return false;
    }
    authenticated.value = true;
    authData.value = auth.value;
    appUser.data.value = auth.value.user;
    return true;
  };
  return {
    isAuthenticated,
    userData: authData,
    logout,
    login
  };
};

export { useAuth as u };
//# sourceMappingURL=authStates-UuGEqxuG.mjs.map
