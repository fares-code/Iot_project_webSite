import axios from "axios";
import Cookie from 'cookie-universal'
const cookies = Cookie();
const token =cookies.get("Iot_Project");
export const Axios = axios.create({
    baseURL:"https://iot-web-site-server.vercel.app",
headers:{
    Authorization:token
}
}

)
