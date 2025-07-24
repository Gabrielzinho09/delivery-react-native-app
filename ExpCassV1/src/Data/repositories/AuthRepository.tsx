import {AxiosError} from 'axios';
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { ImagePickerAsset } from 'expo-image-picker';
import mime from 'mime'

export class AuthRepositoryImp implements AuthRepository{
    async register(user: User): Promise<ResponseAPIDelivery>{
        try {
            
            const response = await ApiDelivery.post<ResponseAPIDelivery>('/users/create', user)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (  error as AxiosError );
            console.log('Error ' + e.response?.data )
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data)) 
            return Promise.resolve(apiError)
        }
    }
    async registerWithImage(user: User, file: ImagePickerAsset): Promise<ResponseAPIDelivery> {
        try {
            let data = new FormData();
            data.append('user', JSON.stringify(user))
            data.append('image',{uri: file.uri,
                type: mime.getType(file.uri)!,
                name: file.uri.split('/').pop()
            } as any)

            const response = await ApiDeliveryForImage.post<ResponseAPIDelivery>('/users/createWithImage', data)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (  error as AxiosError );
            console.log('Error ' + e.response?.data )
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data)) 
            return Promise.resolve(apiError)
        }
    }
    async login(email: string, password: string): Promise<ResponseAPIDelivery>{
        try {
            
            const response = await ApiDelivery.post<ResponseAPIDelivery>('/users/login', {
                email,
                password
            });
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (  error as AxiosError );
            console.log('Error ' + JSON.stringify(e.response?.data ))
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data)) 
            return Promise.resolve(apiError)
        }
    }
}   