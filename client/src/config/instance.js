import axios from "axios";

const baseURL = "http://localhost:80";
const instance = axios.create({
  baseURL,
});

export default instance;
