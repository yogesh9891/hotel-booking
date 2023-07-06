import axios from "axios";
import { url } from "./url.service";

export const getAllBannerApi = async (query) => {
    return axios.get(`${url}/banner/getBanner?${query}`)
}

export const getAllLocationApi =  async (query,source =null) => {
    return axios.get(`${url}/location/getLocation?${query}`,{cancelToken: source?.token})
}

export const getHomePageApi = async (query) => {
    return axios.get(`${url}/homepage/getHomePage?${query}`)
}

export const getCollectionApi = async (query,source =null) => {

        return axios.get(`${url}/collection/getCollection?${query}`,{cancelToken: source?.token})
}

export const getBlogApi = async (query) => {
    return axios.get(`${url}/blog?${query}`)
}

export const getFaqApi = async (query) => {
    return axios.get(`${url}/FAQ?${query}`)
}

export const getOfferApi = async (query) => {
    return axios.get(`${url}/coupon?${query}`)
}

export const ApplyCouponApi = async (data) => {
    return axios.post(`${url}/coupon/checkValidCoupon`,data)
}


export const getBlogCategoryApi = async (query) => {
    return axios.get(`${url}/blogCategory?${query}`)
}

export const getTestimonialApi = async (query) => {
    return axios.get(`${url}/testimonial/getTestimonials?${query}`)
}

export const getGalleryApi = async (query) => {
    return axios.get(`${url}/gallery/getGallerys?${query}`)
}
export const getAmenityApi = async (query) => {
    return axios.get(`${url}/amenity/getAmenity?${query}`)
}
export const getBlogBySlugApi = async (slug) => {
    return axios.get(`${url}/blog/getBlogBySlug/${slug}`)
}


export const getRoomByIdApi = async (query) => {
    return axios.get(`${url}/room/getRooms?${query}`)
}

export const postContactEnquiry = async (formaData) => {
    return axios.post(`${url}/contact`,formaData)
}

export const postPropertyEnquiry = async (formaData) => {
    return axios.post(`${url}/property`,formaData)
}

export const getSeoBySlugApi = async (slug) => {
    return axios.get(`${url}/seo/getSeoByUrl?url=${slug}`)
}
