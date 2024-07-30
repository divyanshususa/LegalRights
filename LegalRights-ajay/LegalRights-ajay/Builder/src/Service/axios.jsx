import axios from "axios";

const API = axios.create({
  // baseURL: "https://legalrights-1.onrender.com",
  baseURL: "http://localhost:5000",
});

export default API;
