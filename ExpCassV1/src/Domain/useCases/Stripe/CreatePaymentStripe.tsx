import { StripeRepositoryImp } from "../../../Data/repositories/StripeRepository";
import { Order } from "../../entities/Order";
const {createPayment} = new StripeRepositoryImp();

export const createPaymentStripeUseCase =async (id:string,amount:number, order:Order) => {

    return await createPayment(id,amount,order)
    
}