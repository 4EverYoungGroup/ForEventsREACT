import axios from "axios";

// Setup
export function setup(serviceConfig) {
  axios.defaults.baseURL = serviceConfig.baseURL;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  console.log(
    "<API> 4EVENTS.NET Axios Settings Ready. serviceConfig=%o",
    serviceConfig
  );
}

// Login
export function login(email, password) {
  const url = "/apiv1/users/login";
  return axios.post(url, {
    email,
    password
  });
}
