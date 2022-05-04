import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const InitialForm = {
    "keyCode": process.env.REACT_APP_API_KEY_SERVICE,
}
const apiGoogleUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
const apiGoogleKey = "&key="+ process.env.REACT_APP_API_GOOGLE;

export const getProducts = (data) =>{
    return axios.post(`${API_URL}productos`,{...InitialForm, ...data})
}
export const getDetailProduct = (data) =>{
    return axios.post(`${API_URL}detalle`,{...InitialForm, ...data})
}
export const getPriceByProduct = (data) =>{
    return axios.post(`${API_URL}precios`,{...InitialForm, ...data})
}
export const getDitricts = (data) =>{
    return axios.post(`${API_URL}distritos`,{...InitialForm, ...data})
}
export const getLocal = (data) =>{
    return axios.post(`${API_URL}locales`,{...InitialForm, ...data})
}
export const getGeolocate = (coords) =>{
    return axios.get(apiGoogleUrl + coords.latitude + "," + coords.longitude + apiGoogleKey)
}
