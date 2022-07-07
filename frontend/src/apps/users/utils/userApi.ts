import axios from "../../common/utils/axios/defaults";
import {
  authenticatedCamelCase,
  authenticatedSnakeAndCamelCase,
  snakeAndCamelCase,
} from "../../common/utils/axios/configs";
import { LogoutResponse } from "../models/api";
import { UserCredentials, SignupData, User, UserProfile } from "../models/user";

// ToDo add mocks for tests here later

const AUTH_API_BASE = "v1/accounts";
const PROFILE_API_BASE = "v1/profile";

const UserAPIs = () => {
  return {
    register: (signupData: SignupData) =>
      axios.post<User>(
        `${AUTH_API_BASE}/registration/`,
        signupData,
        snakeAndCamelCase
      ),
    login: (userCredentials: UserCredentials) => {
      const response = axios.post<User>(
        `${AUTH_API_BASE}/login/`,
        userCredentials,
        snakeAndCamelCase
      );
      return response;
    },
    logout: () =>
      axios.post<LogoutResponse>(
        `${AUTH_API_BASE}/logout/`,
        {},
        authenticatedCamelCase
      ),
    validateLogin: () =>
      axios.get(`${AUTH_API_BASE}/login_validate/`, authenticatedCamelCase),
    // We can hardcode the id, we don't use that for the call
    getProfile: () =>
      axios.get<UserProfile>(
        `${PROFILE_API_BASE}/1/`,
        authenticatedSnakeAndCamelCase
      ),
  };
};

export default UserAPIs;
