import axios from "axios";
import Cookie from 'cookie-universal'
const cookies = Cookie();
const token =cookies.get("Iot_Project");
export const Axios = axios.create({
    baseURL:"http://localhost:5000/api/v1/auth",
headers:{
    Authorization:token
}
}

)