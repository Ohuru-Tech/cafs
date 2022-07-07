import axios from "axios";
import get from "lodash/get";
import { toast } from "react-toastify";

import deepMapKeys from "apps/common/utils/deepMapKeys";
import {
  snakeToCamel,
  camelToSnake,
} from "apps/common/utils/dataShaper/snakeToCamel";
import { authHeaders } from "apps/common/utils//axios/authHeader";
import { errorToastConfig } from "apps/common/utils/general/configs";

/**
 * Add { camelCase: true } to opt-in for snake to camel case on response
 * Add { snakeCase: true } to opt-in for camel to snake case on request
 * Add { authenticated: true } to add the authorization headers on request
 *
 * Add endpoint to apisToTransform if you would like this to happen automatically
 */

const apisToTransform: string[] = [];

declare module "axios" {
  export interface AxiosRequestConfig {
    camelCase?: boolean;
    snakeAndCamel?: boolean;
    snakeCase?: boolean;
    authenticated?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8001/api/v1",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (
      response.config.camelCase ||
      apisToTransform.some((api) => response.config.url!.includes(api))
    ) {
      response.data = deepMapKeys(response.data, snakeToCamel);
    }
    return Promise.resolve(response);
  },
  (error) => {
    switch (get(error, "response.status")) {
      // Handle main errors here, we can add toast fires here to handle them
      case 401:
        toast.error(
          "You are unauthorized to perform this action",
          errorToastConfig
        );
        break;
      case 403:
        toast.error(
          "You do not have the permission to perform this action",
          errorToastConfig
        );
        break;
      case 404:
        toast.error("The requested resource was not found", errorToastConfig);
        break;
      case 500:
        toast.error(
          "An error has occurred on the server, please try again later",
          errorToastConfig
        );
        break;
      default:
        if (
          error.response.hasOwnProperty("data") &&
          error.response.data.hasOwnProperty("detail")
        ) {
          toast.error(
            `An error has occurred on the server: ${error.response.data.detail}`,
            errorToastConfig
          );
        } else if (error.response.hasOwnProperty("data")) {
          // form a string from error messages
          let errorMessage = "";
          Object.keys(error.response.data).forEach((key) => {
            errorMessage += `${key}: ${error.response.data[key]}\n`;
          });
          toast.error(
            `An error has occurred on the server: ${errorMessage}`,
            errorToastConfig
          );
        }
        break;
    }
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const modifiedConfig = config;
    if (
      config.snakeCase ||
      apisToTransform.some((api) => config.url!.includes(api))
    ) {
      modifiedConfig.data = deepMapKeys(config.data, camelToSnake);
      // also modify the params
      modifiedConfig.params = deepMapKeys(config.params, camelToSnake);
    }
    if (config.authenticated) {
      modifiedConfig.headers = { Authorization: authHeaders() };
    }
    return modifiedConfig;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
