import axios from "axios";

const apiRequest = axios.create({
  baseURL:
    "https://rentifyapi-c3263bk9n-anshul-kumar-godiwars-projects.vercel.app/api",
  withCredentials: true,
});

export default apiRequest;
