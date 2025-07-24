import { UserRepositoryImp } from "../../../Data/repositories/UserRepository";
import { User } from "../../entities/User";
import * as ImagePicker from 'expo-image-picker';

const {updateWithImage} = new UserRepositoryImp();

export const UpdateImageUserUseCase =async (user: User, file: ImagePicker.ImagePickerAsset) => {
    return await updateWithImage(user,file)
}