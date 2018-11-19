import axios from "axios";
import { HttpError } from "./errors";

// Handle HTTP errors.
export default () => {
  // Request interceptor
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem("token");

      const newConfig = config;

      // When a 'token' is available set as Bearer token.
      if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
      }
      console.log("<APIClient> Request: newConfig=%o", newConfig);
      return newConfig;
    },
    err => Promise.reject(err)
  );

  // Response interceptor
  axios.interceptors.response.use(
    response => response,
    error => {
      const { status, data } = error.response;

      console.log("<APIClient> Response: error.response=%o", error.response);
      if (status < 200 || status >= 300) {
        return Promise.reject(new HttpError(data, status));
      }

      return Promise.reject(error);
    }
  );
};
