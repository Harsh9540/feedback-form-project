import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api", // ✅ Add /api here
  withCredentials: false,
});


export default instance;
