import axios from "axios"
import { toast } from "react-toastify"
import { fromStorage, inStorage } from "../lib"

const http = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})

http.interceptors.request.use(config => {
    const token = fromStorage('mern-ncit-token')

    if(token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        }
    }
    
    return config
}, error => Promise.reject(error))

http.interceptors.response.use(response => {
    if('message' in response.data) {
        toast.success(response.data.message)
    }

    return response
}, (error) => {
    if('message' in error.response.data) {
        toast.error(error.response.data.message)
    }

    return Promise.reject(error)
})

export default http