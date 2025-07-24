module.exports = (io) => {

    const deliveryNamespace = io.of('/orders/delivery');
    deliveryNamespace.on('connection', (socket) => {
        console.log('UN CLIENTE SE CONECTÓ A SOCKET IO SERVER-> /orders/delivery');
        socket.on('position', (data) => {
            console.log('CLIENTE EMITIÓ: ', data);
            deliveryNamespace.emit(`position/${data.id_order}`, { id_order: data.id_order, lat: data.lat, lng: data.lng });
        });
        socket.on('disconnect', (data) => {
            console.log('UN CLIENTE SE DESCONECTÓ DE SOCKET IO');
        });
    });

    const adminNotificationNamespace = io.of('/orders/admin/notification');
    adminNotificationNamespace.on('connection', (socket) => {
        console.log('UN ADMINISTRADOR SE CONECTÓ A SOCKET IO SERVER-> /orders/admin/notification');
        socket.on('newOrderNotification', (data) => {
            console.log('ADMINISTRADOR EMITIÓ NOTIFICACIÓN DE NUEVO PEDIDO: ', data);
            console.log('Nuevo pedido recibido. ID de la orden:', data.id_order);
            adminNotificationNamespace.emit(`newOrderNotification/${data.id_order}`, { success: true, message: 'Notificación recibida correctamente' });
        });
        socket.on('disconnect', (data) => {
            console.log('UN ADMINISTRADOR SE DESCONECTÓ DE SOCKET IO');
        });
    });
    const clientNotificationNamespace = io.of('/orders/client/notification');

    clientNotificationNamespace.on('connection', (socket) => {
        console.log('UN CLIENTE SE CONECTÓ A SOCKET IO SERVER-> /orders/client/notification');
        socket.on('newOrderNotification', (data) => {
            console.log('CLIENTE EMITIÓ NOTIFICACIÓN DE NUEVO PEDIDO: ', data);
            console.log('Nuevo pedido recibido. ID de la orden:', data.id_order);
            clientNotificationNamespace.to(data.client_id).emit(`newOrderNotification/${data.id_order}`, { success: true, message: 'Notificación recibida correctamente' });
        });
        socket.on('disconnect', (data) => {
            console.log('UN CLIENTE SE DESCONECTÓ DE SOCKET IO');
        });
    });
};  