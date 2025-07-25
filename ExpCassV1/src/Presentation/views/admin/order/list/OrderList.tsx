import React, { useEffect } from 'react'
import { Text, View, Dimensions, useWindowDimensions, FlatList } from 'react-native';
import useViewModel from './ViewModel';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { OrderListItem } from './Item';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdminOrderStackParamList } from '../../../../navigator/AdminOrderStackNavigator';
import { adminNotificationSocket } from '../../../../utils/SocketIO';
import Toast,{BaseToast,ErrorToast}from 'react-native-toast-message';


interface Props {
  status: string
}
const OrderListView = ({ status }: Props) => {

  const {
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    getOrders,
    getOrdersByStatus
  } = useViewModel();

  const navigation = useNavigation<StackNavigationProp<AdminOrderStackParamList, 'AdminOrderListScreen'>>();


  useEffect(() => {
    try {
      getOrders(status);
      adminNotificationSocket.on('newOrderNotification', (data) => {
        console.log('Notificación del cliente recibida por el admin:', data);
        const orderId = data.id_order;
        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: 'Genial',
            text2: `Se ha recibido una nueva orden con ID: ${orderId}`,
            visibilityTime:5000
          })
        },2000)



      });

    } catch (error) {
      console.error('Error al obtener órdenes en use effect:', error);
    }




    return () => {

      adminNotificationSocket.off('newOrderNotification');
    };
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={
          status === 'PAGADO'
            ? ordersPayed
            : status === 'DESPACHADO'
              ? ordersDispatched
              : status === 'EN CAMINO'
                ? ordersOnTheWay
                : status === 'ENTREGADO'
                  ? ordersDelivery
                  : []
        }
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <OrderListItem order={item} navigation={navigation} />}
      />
    </View>
  )
}

const renderScene = ({ route }: any) => {
  switch (route.key) {
    case 'first':
      return <OrderListView status='PAGADO' />;
    case 'second':
      return <OrderListView status='DESPACHADO' />;
    case 'third':
      return <OrderListView status='EN CAMINO' />;
    case 'fourth':
      return <OrderListView status='ENTREGADO' />;
    default:
      return <OrderListView status='PAGADO' />;
  }
};

export const AdminOrderListScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'PAGADO' },
    { key: 'second', title: 'DESPACHADO' },
    { key: 'third', title: 'EN CAMINO' },
    { key: 'fourth', title: 'ENTREGADO' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#c2c2c2', }}
          activeColor='black'
          inactiveColor='gray'
          scrollEnabled={true}
          style={{ paddingTop: 23, backgroundColor: '#EAEDED', height: 60, alignItems: 'center', justifyContent: 'center' }}
        />
      )}
    />
  );
}

