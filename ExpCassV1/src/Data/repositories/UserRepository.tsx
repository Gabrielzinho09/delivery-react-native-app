import { ImagePickerAsset } from "expo-image-picker";
import { User } from "../../Domain/entities/User";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { ResponseAPIDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery";
import { AxiosError } from "axios";
import mime from "mime";

export class UserRepositoryImp implements UserRepository {

    async getDeliveryMen(): Promise<User[]> {
        try {
            const response = await ApiDelivery.get<User[]>('/users/findDeliveryMen');
            return Promise.resolve(response.data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }
    async updateNotificationToken(id: string, token: string): Promise<ResponseAPIDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseAPIDelivery>('/users/updateNotificationToken', {
                id: id,
                token: token
            });
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async update(user: User): Promise<ResponseAPIDelivery> {
        try {
            
            const response = await ApiDelivery.put<ResponseAPIDelivery>('/users/updateWithOutImage', user)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (  error as AxiosError );
            console.log('Error ' + e.response?.data )
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data)) 
            return Promise.resolve(apiError)
        }
        
    }
    async updateWithImage(user: User, file: ImagePickerAsset): Promise<ResponseAPIDelivery> {
        try {
            let data = new FormData();
            data.append('user', JSON.stringify(user))
            data.append('image',{uri: file.uri,
                type: mime.getType(file.uri)!,
                name: file.uri.split('/').pop()
            } as any)

            const response = await ApiDeliveryForImage.put<ResponseAPIDelivery>('/users/update', data)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (  error as AxiosError );
            console.log('Error ' + e.response?.data )
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data)) 
            return Promise.resolve(apiError)
        }
    }
}