import axios from "axios";

const API = axios.create({
  // baseURL: "https://legalrights-9glt.onrender.com",
  baseURL: "http://localhost:5000",
});

export default API;
  