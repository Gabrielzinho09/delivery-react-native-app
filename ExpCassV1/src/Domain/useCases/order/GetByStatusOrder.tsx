import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Order } from '../../entities/Order';

const { getByStatus} = new OrderRepositoryImpl();

export const GetByStatusOrderUseCase = async (status: string) => {
  try {
    return await getByStatus(status);
  } catch (error) {
    console.log('Error en listar', error)
  }
  
}
