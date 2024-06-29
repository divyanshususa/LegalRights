import axios from "axios";

const API = axios.create({
  baseURL: "https://legalrights-1.onrender.com",
});

export default API;
