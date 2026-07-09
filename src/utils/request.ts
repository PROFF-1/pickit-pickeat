import axios from "axios";
import environment from "../constants/environment";



export const apiUrl = axios.create({
  baseURL: `${environment.api.url}`
})