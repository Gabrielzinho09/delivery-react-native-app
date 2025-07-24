import { AuthRepositoryImp } from "../../../Data/repositories/AuthRepository"; 
import { User } from "../../entities/User";

const {register} = new AuthRepositoryImp();

export const RegisterAuthUseCase= async(user: User)=>{
    return await register(user);
}