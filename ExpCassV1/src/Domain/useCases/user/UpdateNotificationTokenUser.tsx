import { UserRepositoryImp } from "../../../Data/repositories/UserRepository";
import { User } from "../../entities/User";

const { updateNotificationToken } = new UserRepositoryImp();

export const UpdateNotificationTokenUserUseCase = async(id: string, token: string) => {
    return await updateNotificationToken(id, token);
}