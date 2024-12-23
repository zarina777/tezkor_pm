import { UserType } from "@/types";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
console.log("base ur", baseURL);

const api = axios.create({
  baseURL: baseURL,
});

// Adds bearer token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;
  if (!error.config.retryCount) {
    error.config.retryCount = 0;
  }

  const refreshToken = getRefreshToken();

  if (
    error.response.status === 401 &&
    refreshToken &&
    error.config.retryCount < 1
  ) {
    error.config.retryCount++;
    try {
      const {
        data: {
          token: { accessToken },
        },
      } = await axios.post<{ token: { accessToken: string } }>(
        `${baseURL}user/token/refresh`,
        undefined,
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        }
      );

      addTokenToAxios(accessToken);
      return api(originalRequest);
    } catch (e) {
      console.error(e);
    }
  }

  return Promise.reject(error);
});

export const addTokenToAxios = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeTokenFromAxios = () => {
  localStorage.removeItem("token");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh-token");
};

export const addRefreshToken = (token: string) => {
  localStorage.setItem("refresh-token", token);
};

export const removeRefreshTokenFromAxios = () => {
  localStorage.removeItem("refresh-token");
};
export const addOrganizationUser = (organizationUser: UserType) => {
  localStorage.setItem("user", JSON.stringify(organizationUser));
};
export const removeOrganizationUser = () => {
  localStorage.removeItem("user");
};
export const removeAll = () => {
  removeRefreshTokenFromAxios();
  removeTokenFromAxios();
  removeOrganizationUser();
};

export { api };
