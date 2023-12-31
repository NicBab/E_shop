import axios from "axios";

const BASE_URL = process.env.BASE_URL
const TOKEN = process.env.TOKEN

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
});

export const axiosInstance = axios.create({
    baseURL : BASE_URL
})