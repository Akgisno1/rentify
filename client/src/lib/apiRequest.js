import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://rentifysocket.onrender.com",
  withCredentials: true,
});

export default apiRequest;
