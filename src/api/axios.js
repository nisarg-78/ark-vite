import {default as Axios} from "axios";
import { apiUrl } from "./urls";

 const axios = Axios.create({
  "Content-Type": "application/json",
  Accept: "application/json",
  withCredentials: true,
  baseURL: apiUrl,
});

export default axios
