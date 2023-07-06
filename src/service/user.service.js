import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";
import jwt_decode from "jwt-decode";
const serverUrl = url + "/users";

export const loginApi = (formData) => {
  return axios.post(serverUrl + "/login", formData);
};

export const registerUserApi = (formData) => {
    return axios.post(serverUrl + "/register", formData);
  };

  export const setToken = (token) => {
    localStorage.setItem("Auth-token-sundaysforever", token);
}
export const getUserById = async () => {
    let decoded = getDecodedToken()
    return axiosApiInstance.get(`${serverUrl}/getById/${decoded.userId}`)
}

export const getToken = () => {
    return localStorage.getItem("Auth-token-sundaysforever");
}
export const getDecodedToken = () => {
    let token = localStorage.getItem("Auth-token-sundaysforever");
    if(!token){
        return 0;
    }
    let decodedToken = jwt_decode(token)
    return decodedToken
}

export const removeToken = () => {
    localStorage.removeItem("Auth-token-sundaysforever");
}

export const refreshToken = async (obj) => {
    return axios.post(`${serverUrl}/refreshToken`, obj)
}

