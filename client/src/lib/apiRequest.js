import axios from "axios";

const apiRequest = axios.create({
  baseURL:
    "https://rentifyapi-68jb7cfts-anshul-kumar-godiwars-projects.vercel.app/",
  withCredentials: true,
});

export default apiRequest;
