import io from 'socket.io-client';


console.log('Conectando al socket delivery...');

// Conexión para manejar las posiciones del delivery
const deliverySocket = io('http://192.168.100.10:3000/orders/delivery');



console.log('Conectando al socket admin...');


const adminNotificationSocket = io('http://192.168.100.10:3000/orders/admin/notification');

console.log('Conectando al socket cliente...');

const clientNotificationSocket = io('http://192.168.100.10:3000/orders/client/notification')

export { deliverySocket, adminNotificationSocket, clientNotificationSocket };