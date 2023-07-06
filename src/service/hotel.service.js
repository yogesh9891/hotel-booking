import axios from "axios";
import { url } from "./url.service";

let serverUrl = `${url}/hotel`;


export const getAllHotelApi = async (query,source) => {
    return axios.get(`${serverUrl}/getHotels/?${query}`,{cancelToken: source?.token,})
}

export const getHotelBySlugApi = async (slug) => {
    return axios.get(`${serverUrl}/getHotelBySlug/${slug}`)
}

export const getHotelByIdApi = async (slug) => {
    return axios.get(`${serverUrl}/getHotelById/${slug}`)
}

export const getRoomById = async (id) => {
    return axios.get(`${url}/room/getRoomById/${id}`)
}

export const getRoomsAvailablesApi  = (query,source =null) => {
    return axios.get(`${url}/room/getRoomsAvailables?${query}`,{cancelToken: source?.token});
};

export const getAmenityCategory = (query) => {
    return axios.get(`${url}/amenityCategory/getAmenityCategory?${query}`);
};

