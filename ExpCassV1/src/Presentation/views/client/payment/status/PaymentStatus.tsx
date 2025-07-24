import React ,{useState,useEffect,useContext}from 'react'
import { View, Text, Image, ActivityIndicator  } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import styles from './Styles';
import { RoundedButton } from '../../../../components/RoundedButton';
//import { ClientPaymentFormViewModel } from '../form/ViewModel';
//import { DataCreditCardContext } from '../../../../context/DataCreditCardContext';


interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentStatusScreen'> { }

export const ClientPaymentStatusScreen = ({ navigation, route }: Props) => {
  const { cardDetails } = route.params || {};


  //const { paymentData } = route.params;
  //console.log('Payment data: ' + JSON.stringify(paymentData, null, 3));
  useEffect(() => {
    console.log('Card details vista:', cardDetails);
  }, [cardDetails]);

  const handleFinalizePurchase = async () => {
    navigation.replace('ClientCategoryListScreen');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../../../../../assets/checked.png')} />

      <Text style={styles.description}>
      Tu orden fue procesada exitosamente 
      {/* usando {cardDetails?.brand} ****{cardDetails?.lastFourDigits} */}
        {/* {cardValues.brand} ****{lastFourDigits} */}
      </Text>

      <Text style={styles.info}>Mira el estado de tu compra en la sección de MIS PEDIDOS</Text>

      <View style={styles.button}>
        <RoundedButton text="Finalizar compra" onPress={handleFinalizePurchase} />
      </View>
    </View>
  );
};