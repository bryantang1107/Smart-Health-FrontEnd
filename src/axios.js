import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://smarthealthserver.herokuapp.com/",
});

export default axiosInstance;
