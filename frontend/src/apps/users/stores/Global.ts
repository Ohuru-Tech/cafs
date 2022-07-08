import { defaults, createStore, createHook } from "react-sweet-state";

import { register, login, logout, sync } from "../actions/UserActions";
import { UserState } from "../models/state";

defaults.devtools = true;

function loadInitialState(): UserState {
  if (localStorage.getItem("user")) {
    let currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    return {
      userInfo: {
        user: {
          name: currentUser.name,
          email: currentUser.email,
          profilePic: currentUser.profilePic,
          accountType: currentUser.accountType,
          hasApps: currentUser.hasApps,
          appId: currentUser.appId,
        },
        key: currentUser.token,
      },
      loggedIn: true,
    };
  }
  return {
    userInfo: null,
    loggedIn: false,
  };
}

const Store = createStore({
  name: "UserStore",
  initialState: loadInitialState(),
  actions: {
    register,
    login,
    logout,
    sync,
  },
});

export default createHook(Store);
