import { Text, View, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import CreditCard from 'react-native-credit-card-form-ui';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { ClientPaymentFormViewModel } from './ViewModel';
import styles from './Styles';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentFormScreen'> { }

export const ClientPaymentFormScreen = ({ navigation, route }: Props) => {
  const {
    handleSubmit,
    creditCardRef,
    cardDetails,
    
  } = ClientPaymentFormViewModel();


  const handlePaymentSubmission = async () => {
    await handleSubmit();

    
    navigation.replace('ClientPaymentStatusScreen',{cardDetails});
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <CreditCard
          ref={creditCardRef}
          background={'#e2e2e2'}
          textColor={'black'}
          labels={{
            holder: 'Titular',
            cvv: 'Código de seguridad',
            expiration: 'Expiración',
          }}
          placeholders={{
            number: '0000 0000 0000 0000',
            cvv: 'xxx',
            expiration: 'MM/YYYY',
            holder: 'NOMBRE DEL TITULAR',
          }}
          placeholderTextColor={'gray'}
        />
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
          onPress={handlePaymentSubmission}
          
          style={styles.button}
        >
          <Text style={styles.processText}>Procesar Pago</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};