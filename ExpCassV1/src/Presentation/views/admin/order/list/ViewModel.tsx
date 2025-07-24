import { useState, useContext, useEffect } from 'react'
import { GetByStatusOrderUseCase } from '../../../../../Domain/useCases/order/GetByStatusOrder';
import { Order } from '../../../../../Domain/entities/Order';
import { OrderContext } from '../../../../context/OrderContext';
import { adminNotificationSocket } from '../../../../utils/SocketIO';
const AdminOrderListViewModel = () => {

  //const [orders, setOrders] = useState<Order[]>([]);
  const { ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrdersByStatus } = useContext(OrderContext);

  useEffect(() => {



    adminNotificationSocket.connect()

    adminNotificationSocket.on('connect', () => {
      console.log('------SOCKET IO CONNECTION----- ADMIN')
    })
    adminNotificationSocket.on('newOrderNotification', (data) => {
      console.log('Notificación de nuevo pedido:', data);


      getOrdersByStatus(data.status);
    });
    adminNotificationSocket.on('disconnect', () => {
      console.log('Desconectado del servidor de Socket.IO');
    });


    return () => {
      adminNotificationSocket.disconnect();
    };
  }, [getOrdersByStatus]); 

  const getOrders = async (status: string) => {
    try {
      const result = await getOrdersByStatus(status)
      console.log('ORDENES ' + JSON.stringify(result, null, 3));
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
    }



  }

  return {
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    getOrders,
    getOrdersByStatus
  }
}

export default AdminOrderListViewModel;
