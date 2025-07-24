import React, { useState, useContext, useEffect } from 'react'
import { GetByUserAddressUseCase } from '../../../../../Domain/useCases/address/GetByUserAddress';
import { Address } from '../../../../../Domain/entities/Address';
import { UserContext } from '../../../../context/UserContext';
import { CreateOrderUseCase } from '../../../../../Domain/useCases/order/CreateOrder';
import { Order } from '../../../../../Domain/entities/Order';
import { ShoppingBagContext } from '../../../../context/ShoppingBagContext';
import { adminNotificationSocket } from '../../../../utils/SocketIO';
const ClientAddressListViewModel = () => {

    const [address, setAddress] = useState<Address[]>([]);
    const { user, saveUserSession, getUserSession } = useContext(UserContext);
    const { shoppingBag } = useContext(ShoppingBagContext);
    const [checked, setChecked] = useState('');
    const [responseMessage, setResponseMessage] = useState('');


    useEffect(() => {
        getAddress();
        if (user.address !== null && user.address !== undefined) {
            changeRadioValue(user.address!);
            console.log('USUARIO CON DIRECCION: ' + JSON.stringify(user));
        }
        const socket = adminNotificationSocket;
        socket.connect();

        const handleConnect = () => {
            console.log('------SOCKET IO CONNECTION----- CLIENT');
        };

        socket.on('connect', handleConnect);

        return () => {
            socket.off('connect', handleConnect);
            socket.disconnect();
        };
    }, [user])

    const createOrder = async () => {
        const order: Order = {
            id_client: user.id!,
            id_address: user.address?.id!,
            products: shoppingBag
        }

        const result = await CreateOrderUseCase(order);

        if (result.success) {
            const orderId = result.data;
            adminNotificationSocket.emit('newOrderNotification', { id_order: orderId });
            setResponseMessage(result.message);
            console.log('RESULT:', result.message);
        } else {
            console.error('Error al crear la orden:', result.message);
            setResponseMessage(result.message);
        }
    };

    const changeRadioValue = async (address: Address) => {
        setChecked(address.id!);
        user.address = address;
        saveUserSession(user);
    }

    const getAddress = async () => {
        const result = await GetByUserAddressUseCase(user.id!);
        setAddress(result);
    }

    return {
        address,
        checked,
        responseMessage,
        getAddress,
        changeRadioValue,
        createOrder
    }
}

export default ClientAddressListViewModel;
