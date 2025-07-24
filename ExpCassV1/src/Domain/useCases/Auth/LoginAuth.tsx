import { AuthRepositoryImp } from "../../../Data/repositories/AuthRepository";
const {login}= new AuthRepositoryImp();

export const LoginAuthUseCase = async(email:string, password:string)=>{
    return await login(email,password);
}