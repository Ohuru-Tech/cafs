import { Action } from "react-sweet-state";
import { toast } from "react-toastify";

import { errorToastConfig } from "../../common/utils/general/configs";
import { SignupData, UserCredentials } from "../models/user";
import { UserState } from "../models/state";
import UserAPIs from "../utils/userApi";

export const login =
  (credentials: UserCredentials): Action<UserState> =>
  async ({ setState }) => {
    try {
      const { data: userInfo, status } = await UserAPIs().login(credentials);
      if (status === 200) {
        setState({ userInfo, loggedIn: true });
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: userInfo.user.name,
            email: userInfo.user.email,
            token: userInfo.key,
            profilePic: userInfo.user.profilePic,
            hasApps: userInfo.user.hasApps,
            appId: userInfo.user.appId,
          })
        );
      }
    } catch {
      toast.error(
        "Unable to login with the provided credentials",
        errorToastConfig
      );
    }
  };

export const register = (signupData: SignupData) => async () => {
  try {
    await UserAPIs().register(signupData);
    return true;
  } catch {
    toast.error("Could not sign up");
  }
};

export const logout =
  (t: any): Action<UserState> =>
  async ({ setState }) => {
    try {
      await UserAPIs().logout();
      localStorage.removeItem("user");
      setState({ userInfo: undefined, loggedIn: false });
    } catch {
      toast.error(t("alerts.logoutError"), errorToastConfig);
    }
  };

export const sync =
  (t: any): Action<UserState> =>
  async ({ setState, getState }) => {
    try {
      const user = getState().userInfo;
      const { data: newUserInfo, status } = await UserAPIs().getProfile();
      const userInfo = {
        key: user?.key as string,
        user: newUserInfo,
      };
      if (status === 200) {
        setState({ userInfo, loggedIn: true });
      }
    } catch {
      toast.error(t("alerts.syncError"), errorToastConfig);
    }
  };
