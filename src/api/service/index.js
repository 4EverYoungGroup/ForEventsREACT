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

// Create Poster
export function createPoster(event, name, src) {
  const url = "/apiv1/medias";
  axios.defaults.headers.post["x-access-token"] = localStorage.getItem("token");
  return axios.post(url, {
    url: src,
    event,
    media_type: "picture",
    poster: true,
    name,
    description: ""
  });
}

// Update Poster
export function updatePoster(id, name, src) {
  const url = "/apiv1/medias/" + id;
  axios.defaults.headers.put["x-access-token"] = localStorage.getItem("token");
  return axios.put(url, {
    url: src,
    media_type: "picture",
    poster: "true",
    name
  });
}
