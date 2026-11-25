import axios from "axios"
export const api=axios.create({
    baseURL:import.meta.env.NODE_API ||"http://localhost:5000",
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
},
withCredentials:false
})