import axios from "axios";

const api = axios.create({
  baseURL: "https://your-backend-url.com/api", //Update with your backend's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
