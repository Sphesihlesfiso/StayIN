import axios from "axios"
export const api=axios.create({
    baseURL:import.meta.env.NODE_API ||"http://localhost:5000",
    headers: { "Content-Type": "multipart/form-data" },
withCredentials:false
})