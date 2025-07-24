import axios, { AxiosHeaders } from 'axios'
import { LocalStorage } from '../../local/LocalStorage'
import { User } from '../../../../Domain/entities/User';

const ApiDelivery = axios.create({
    baseURL:'http://192.168.100.10:3000/api',
    headers:{
        'Content-Type':'application/json'
    }
})

const ApiDeliveryForImage = axios.create({
    baseURL:'http://192.168.100.10:3000/api',
    headers:{
        'Content-type':'multipart/form-data',
        'accept':'application/json'
    }
})
;
//interceptors = middleware - recibe token y peticion se envie con un parm mas

ApiDelivery.interceptors.request.use(
    async(config) => {
        const data = await LocalStorage().getItem('user');
            if (data){
                const user: User = JSON.parse(data as any)
                config.headers.set("Authorization", `${user?.session_token!}`);
            }
            return config;
    },
    async(error)=>{
        console.log(error)
    }
)
ApiDeliveryForImage.interceptors.request.use(
    async(config) => {
        const data = await LocalStorage().getItem('user');
            if (data){
                const user: User = JSON.parse(data as any)
                config.headers.set("Authorization", `${user?.session_token!}`);
            }
            return config;
    },
    async(error)=>{
        console.log(error)
    }
)


export {ApiDelivery, ApiDeliveryForImage}