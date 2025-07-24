import { StyleSheet } from "react-native";

const ClientPaymentFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center', 
  
    },
    form: {
        marginTop: 15,
        alignItems: 'center', // Centrar horizontalmente
        justifyContent: 'center', // Centrar verticalmente
        // flex: 1
    },
    buttonContainer: {
        width: '100%',
        padding: 20,
        alignItems: 'center', // Centrar horizontalmente
        justifyContent: 'flex-end', // Ajustar según sea necesario
        marginHorizontal: 20,
    },
    dropdown: {
        marginHorizontal: 20,
        marginTop: 30,
        flex: 1
    },
    check: {
        width: 40,
        height: 40,
        marginRight: 1,
        alignSelf: 'flex-end',
    },
    processText: {
        
        marginRight: 1,
        fontSize: 24,
        color: 'black'
    },
    errorTextColor: {
        color: '#F15A5B',
        
      },
      errorContainer: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
      },
    
      errorText: {
        color: 'white',
      },
      button: {
        backgroundColor: '#4B5320', // Color verde militar
        borderRadius: 10, // Bordes redondos
        padding: 15, // Espaciado interno
        alignItems: 'center',
      }
});

export default ClientPaymentFormStyles;