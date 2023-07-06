import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/order`;

export const createOrder = async () => {
  return await axiosApiInstance.post(`${serverUrl}/createOrder`);
};

export const createGuestOrder = async (obj) => {
  return await axios.post(`${serverUrl}/createGuestOrder`,obj);
};
export const orderCallback = async (obj, id) => {
  return await axiosApiInstance.get(`${serverUrl}/paymentCallback/${id}?${obj}`);
};

export const phonepePayment = async (id, obj) => {
  return await axiosApiInstance.post(`${serverUrl}/phonepePayment/${id}?${obj}`);
};

export const phonepePaymentStatusCheck = async (id) => {
  return await axiosApiInstance.get(`${serverUrl}/phonepePaymentStatusCheck/${id}`);
};


export const getAllActiveOrdersByUserId = async () => {
  return await axiosApiInstance.get(`${serverUrl}/getAllActiveOrdersByUserId`);
};
export const getOrderByIdApi= async (id) => {
  return await axiosApiInstance.get(`${serverUrl}/getOrderById/${id}`);
};