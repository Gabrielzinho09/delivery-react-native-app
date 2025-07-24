import { UserRepositoryImp } from "../../../Data/repositories/UserRepository";
import { User } from "../../entities/User";

const {update} = new UserRepositoryImp();

export const UpdateUserUseCase =async (user: User) => {
    return await update(user)
}