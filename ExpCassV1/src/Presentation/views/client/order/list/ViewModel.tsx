import React, { useState, useContext, useEffect } from 'react'
import { GetByStatusOrderUseCase } from '../../../../../Domain/useCases/order/GetByStatusOrder';
import { Order } from '../../../../../Domain/entities/Order';
import { OrderContext } from '../../../../context/OrderContext';
import { UserContext } from '../../../../context/UserContext';



const ClientOrderListViewModel = () => {

    // const [orders, setOrders] = useState<Order[]>([]);
    const { 
        ordersPayed,
        ordersDispatched,
        ordersOnTheWay,
        ordersDelivery,
        getOrdersByClientAndStatus,
        updateToDispatched
     } = useContext(OrderContext);

    const [selectedOrderStatus, setSelectedOrderStatus] = useState<string | null>(null);
    const [isOrderPaid, setIsOrderPaid] = useState(false);

    const [isOrderDispatched, setIsOrderDispatched] = useState(false);
    const { user } = useContext(UserContext);
    const [responseMessage, setResponseMessage] = useState('');


    const dispatchOrder = async (order: Order) => {
        const result = await updateToDispatched(order);
        setResponseMessage(result.message);
        if (result.success) {
            setIsOrderDispatched(true);
            setSelectedOrderStatus(order.status!); // Guardar el estado actual de la orden seleccionada
            console.log('Orden despachada:', order);
        }
    };


    const getOrders = async (idClient: string, status: string) => {
        try {
            await getOrdersByClientAndStatus(idClient, status);
            console.log('ÓRDENES ACTUALIZADAS', ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery);
        } catch (error) {
            console.error('Error al obtener órdenes:', error);
        }
    };
    // useEffect(() => {
    //     if (isOrderDispatched) {
    //         // Recargar órdenes despachadas una vez que se haya despachado una orden
    //         getOrders(user?.id!, 'PAGADO');
    //         setIsOrderDispatched(false); // Reiniciar el estado después de cargar las órdenes
    //     }
    // }, [isOrderDispatched, user]);

    return {
        ordersPayed,
        ordersDispatched,
        ordersOnTheWay,
        ordersDelivery,
        user,
        getOrders,
        dispatchOrder,
        responseMessage,
        isOrderDispatched,
        setIsOrderDispatched,
        isOrderPaid,
        setIsOrderPaid,
        selectedOrderStatus,
    }
}

export default ClientOrderListViewModel;
