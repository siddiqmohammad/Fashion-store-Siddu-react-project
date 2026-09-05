import axios from "axios";

const api = axios.create({
  baseURL: "https://siddu-sthread-backend-2.onrender.com",
});

export default api;
