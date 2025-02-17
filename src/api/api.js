import axios from "axios";
import config from "../config";

const apiClient = axios.create({
  baseURL: config.apiBaseUrl, // Use the centralized base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
