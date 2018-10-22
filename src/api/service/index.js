import axios from "axios";

// Service Base URL
const BASE_URL = "https://services.4events.net";

// Setup
export function setup() {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  console.log("<API> 4EVENTS.NET Axios Settings Ready!");
}
