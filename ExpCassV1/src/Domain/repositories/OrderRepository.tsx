import { ResponseAPIDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Order } from '../entities/Order';
export interface OrderRepository {

    create(order: Order): Promise<ResponseAPIDelivery>;
    getByStatus(status: string): Promise<Order[]>;
    getByDeliveryAndStatus(id_delivery: string, status: string): Promise<Order[]>;
    getByClientAndStatus(id_client: string, status: string): Promise<Order[]>;
    updateToDispatched(order: Order): Promise<ResponseAPIDelivery>;
    updateToOnTheWay(order: Order): Promise<ResponseAPIDelivery>;
    updateToDelivered(order: Order): Promise<ResponseAPIDelivery>;

}