import { Order } from '../../Domain/entities/Order';
import { ResponseAPIDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Children, createContext, useState, useEffect } from 'react';
import { GetByStatusOrderUseCase } from '../../Domain/useCases/order/GetByStatusOrder';
import { UpdateToDispatchedOrderUseCase } from '../../Domain/useCases/order/UpdateToDispatchedOrder';
import { GetByDeliveryAndStatusOrderUseCase } from '../../Domain/useCases/order/GetByDeliveryAndStatusOrder';
import { UpdateToOnTheWayOrderUseCase } from '../../Domain/useCases/order/UpdateToOnTheWayOrder';
import { UpdateToDeliveredOrderUseCase } from '../../Domain/useCases/order/UpdateToDeliveredOrder';
import { GetByClientAndStatusOrderUseCase } from '../../Domain/useCases/order/GetByClientAndStatusOrder';

export interface OrderContextProps {
    ordersPayed: Order[],
    ordersDispatched: Order[],
    ordersOnTheWay: Order[],
    ordersDelivery: Order[],
    getOrdersByStatus(status: string): Promise<void>,
    getOrdersByDeliveryAndStatus(idDelivery: string, status: string): Promise<void>,
    getOrdersByClientAndStatus(idClient: string, status: string): Promise<void>,
    updateToDispatched(order: Order): Promise<ResponseAPIDelivery>,
    updateToOnTheWay(order: Order): Promise<ResponseAPIDelivery>,
    updateToDelivered(order: Order): Promise<ResponseAPIDelivery>,

}
export interface ExtendedOrderContextProps extends OrderContextProps {
    subscribeToOrderUpdates(callback: () => void): () => void;
    unsubscribeFromOrderUpdates(callback: () => void): void;
  }

export const OrderContext = createContext({}  as ExtendedOrderContextProps);

export const OrderProvider = ({ children }: any) => {

    const [ordersPayed, setOrdersPayed] = useState<Order[]>([]);
    const [ordersDispatched, setOrdersDispatched] = useState<Order[]>([]);
    const [ordersOnTheWay, setOrdersOnTheWay] = useState<Order[]>([]);
    const [ordersDelivery, setOrdersDelivery] = useState<Order[]>([]);
    const [orderUpdateSubscribers, setOrderUpdateSubscribers] = useState<(() => void)[]>([]);
    const subscribeToOrderUpdates = (callback: () => void) => {
        setOrderUpdateSubscribers((prev) => [...prev, callback]);
    };

    // Función para desuscribirse de las actualizaciones
    const unsubscribeFromOrderUpdates = (callback: () => void) => {
        setOrderUpdateSubscribers((prev) => prev.filter((cb) => cb !== callback));
    };

    // Función para notificar actualizaciones
    const notifyOrderUpdates = () => {
        orderUpdateSubscribers.forEach((cb) => cb());
    };
    useEffect(() => {
        setOrdersPayed([]);
        setOrdersDispatched([]);
        setOrdersOnTheWay([]);
        setOrdersDelivery([]);
    }, [])

    const getOrdersByStatus = async (status: string) => {
        try {
            const result = await GetByStatusOrderUseCase(status);
            if (result !== undefined && Array.isArray(result)) {
                if (status === 'PAGADO') {
                    setOrdersPayed(result);
                }
                else if (status === 'DESPACHADO') {
                    setOrdersDispatched(result);
                }
                else if (status === 'EN CAMINO') {
                    setOrdersOnTheWay(result);
                }
                else if (status === 'ENTREGADO') {
                    setOrdersDelivery(result);
                }
            }
        } catch (error) {
            // Manejar el error aquí
            console.error('Error al obtener órdenes:', error);
        }
    }

    const getOrdersByDeliveryAndStatus = async (idDelivery: string, status: string) => {
        try {
            const result = await GetByDeliveryAndStatusOrderUseCase(idDelivery, status);
            if (status === 'PAGADO') {
                setOrdersPayed(result);
            }
            else if (status === 'DESPACHADO') {
                setOrdersDispatched(result);
            }
            else if (status === 'EN CAMINO') {
                setOrdersOnTheWay(result);
            }
            else if (status === 'ENTREGADO') {
                setOrdersDelivery(result);
            }
        } catch (error) {
            // Manejar el error aquí
            console.error('Error al obtener órdenes por entrega y estado:', error);
        }
    }


    const getOrdersByClientAndStatus = async (idClient: string, status: string) => {
        try {
            const result = await GetByClientAndStatusOrderUseCase(idClient, status);
            if (status === 'PAGADO') {
                setOrdersPayed(result);
            }
            else if (status === 'DESPACHADO') {
                setOrdersDispatched(result);
            }
            else if (status === 'EN CAMINO') {
                setOrdersOnTheWay(result);
            }
            else if (status === 'ENTREGADO') {
                setOrdersDelivery(result);
            }
            notifyOrderUpdates();
        } catch (error) {
            // Manejar el error aquí
            console.error('Error al obtener órdenes por cliente y estado:', error);
        }
    }


    const updateToDispatched = async (order: Order) => {
        const result = await UpdateToDispatchedOrderUseCase(order);

        try {
            // Obtener las órdenes actualizadas
            const updatedOrders = await Promise.all([
                GetByStatusOrderUseCase('PAGADO'),
                GetByStatusOrderUseCase('DESPACHADO'),
            ]);

            // Actualizar los estados locales directamente
            setOrdersPayed(updatedOrders[0] || []);
            setOrdersDispatched(updatedOrders[1] || []);

            // Notificar a los suscriptores
            notifyOrderUpdates();
        } catch (error) {
            // Manejar el error aquí
            console.error('Error al obtener órdenes actualizadas:', error);
        }

        return result;
    };

    const updateToOnTheWay = async (order: Order) => {
        const result = await UpdateToOnTheWayOrderUseCase(order);

        await Promise.all([
            getOrdersByDeliveryAndStatus(order.id_delivery!, 'DESPACHADO'),
            getOrdersByDeliveryAndStatus(order.id_delivery!, 'EN CAMINO'),
        ]);
        return result;
    };

    const updateToDelivered = async (order: Order) => {
        const result = await UpdateToDeliveredOrderUseCase(order);

        await Promise.all([
            getOrdersByDeliveryAndStatus(order.id_delivery!, 'EN CAMINO'),
            getOrdersByDeliveryAndStatus(order.id_delivery!, 'ENTREGADO'),
        ]);
        return result;
    };

    return (
        <OrderContext.Provider
            value={{
                ordersPayed,
                ordersDispatched,
                ordersOnTheWay,
                ordersDelivery,
                getOrdersByStatus,
                getOrdersByDeliveryAndStatus,
                getOrdersByClientAndStatus,
                updateToDispatched,
                updateToOnTheWay,
                updateToDelivered,
                subscribeToOrderUpdates: (callback: () => void) => {
                    setOrderUpdateSubscribers((prev) => [...prev, callback]);
          
                    // Devolver la función de desuscripción
                    return () => {
                      unsubscribeFromOrderUpdates(callback);
                    };
                  },
                  unsubscribeFromOrderUpdates,

            }}
        >
            {children}
        </OrderContext.Provider>
    )
}