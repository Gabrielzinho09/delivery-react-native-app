import { CategoryRepositoryImp } from "../../../Data/repositories/CategoryRepository";

const { remove } = new CategoryRepositoryImp();
export const DeleteCategoryUseCase = async (id: string) => {
    return await remove(id);
  }