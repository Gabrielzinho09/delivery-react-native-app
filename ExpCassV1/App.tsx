import  React ,{useEffect}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackNavigator } from './src/Presentation/navigator/MainStackNavigator';
import Toast ,{BaseToast,ErrorToast,BaseToastProps} from 'react-native-toast-message';

const toastConfig = {
  
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor:'green',
        borderLeftWidth: 7,
        width:'90%',
        height:70,
        borderRightColor:'green',
        borderRightWidth:7
      }}
      contentContainerStyle={{
        paddingHorizontal: 15
      }}
      text1Style={{
        fontSize:17,
        fontWeight:'700'
      }}
      text2Style={{
        fontSize:14
      }}
    />
  ),

  error: (props:BaseToastProps) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={3}
      style={{
        borderLeftColor:'red',
        borderLeftWidth:7,
        width:'90%',
        height:70,
        borderRightColor:'red',
        borderRightWidth:7
      }}
      contentContainerStyle={{
        paddingHorizontal:15
      }}
      text1Style={{
        fontSize: 17,
        fontWeight:'700'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),

};

const App = () => {

  

  return (
    <NavigationContainer>
      <MainStackNavigator />
      <Toast config={toastConfig}/>
    </NavigationContainer>
  );
};



export default App;