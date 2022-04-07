import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:6100",
});

export default axiosInstance;
