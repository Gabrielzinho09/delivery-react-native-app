import React, { useRef, useState, useEffect, useContext } from 'react'
//@ts-ignore
import stripe from 'react-native-stripe-client'
import { createPaymentStripeUseCase } from '../../../../../Domain/useCases/Stripe/CreatePaymentStripe';
import { ShoppingBagContext } from '../../../../context/ShoppingBagContext';
import { UserContext } from '../../../../context/UserContext';
//import { adminNotificationSocket } from '../../../../utils/SocketIO';
//import { PaymentStatusContext } from '../../../../context/DataCreditCar';
  
interface DropDownProps {
  label: string,
  value: string
}
export const ClientPaymentFormViewModel = () => {
  const { total, shoppingBag, clearShoppingBag } = useContext(ShoppingBagContext);
  const { user } = useContext(UserContext);
  const [cardDetails, setCardDetails] = useState<any | null>(null);

  const creditCardRef = useRef() as any;
  const updateCardDetails = (newCardDetails: any) => {
    setCardDetails(newCardDetails);
  };


  const [values, setValues] = useState({
    brand: '',
    cvv: '',
    expiration: '',
    holder: '',
    number: '',
  });


  const stripeClient = 
  stripe("pk_test_51NlPJfB5gojcRHJM6TbdR9fMzkNiNVMlw4vKkcQE4um6vN3RytH9jEjBwOAJtAs6dt7JFpMK8BwKGdhhDXKuI1dM00aQjMI52Q");

  useEffect(() => {

    console.log('RESPONSE STRIPE' + JSON.stringify(values,null,3))
      if(values.number !== '' && values.expiration !== '' && values.cvv !== ''){
        createTokenPayment();
      }
      else{
        console.log('Datos inválidos')
      }
      
  }, [values]);
  
  const handleSubmit = React.useCallback(() => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      if (error == null) {
        // Setea los valores de la tarjeta
        
        setValues(data);
      }
      console.log('ERROR: ', error);
      console.log('CARD DATA: ', data);
    }
  }, []);

  const createTokenPayment = async () => {

    const response = await stripeClient.createPaymentMethod("card",{
      number: values.number.replace(/\s/g, ''),
      exp_month: parseInt(values.expiration.split('/')[0]),
      exp_year:parseInt(values.expiration.split('/')[1]),
      cvc: values.cvv
    })
    console.log('RESPONSE STRIPE two' + JSON.stringify(response,null,3))
    if(response.id !==undefined && response.id != null){
      const result = await createPaymentStripeUseCase(response.id, total,{
        id_client: user.id!,
        id_address: user.address?.id!,
        products: shoppingBag
      })
      console.log('RESPONSE' + JSON.stringify(result,null,3))
      if(result.success){
        updateCardDetails({
          brand: values.brand,
          lastFourDigits: values.number.slice(-4),
          
        });
        //limpiar bolsa una vez generado el pago
        clearShoppingBag();
        //notificacion al ADMIN
        //adminNotificationSocket.emit('newOrderNotification', { id_order: result.data });

      }
    }
  };



  return {
    
    creditCardRef,
    handleSubmit,
    createTokenPayment,
    cardDetails,
    updateCardDetails,
    
    
    
  };
};

export default ClientPaymentFormViewModel;