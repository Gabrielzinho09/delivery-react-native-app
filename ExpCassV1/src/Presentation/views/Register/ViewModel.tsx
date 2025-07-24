import React, { useState } from 'react'
import { RegisterAuthUseCase } from '../../../Domain/useCases/Auth/RegisterAuth';
import { RegisterWithImageAuthUseCase } from '../../../Domain/useCases/Auth/RegisterWithImageAuth copy';
import * as ImagePicker from 'expo-image-picker';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';


export const RegisterViewModel = () => {

  const [errorMessage, seterrorMessage] = useState('')
  const [sucessMessage, setSucessMessage] = useState('')
  const [values, setValues] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    image: '',
    password: '',
    conPassword: '',


  });
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setloading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
  const {user , getUserSession} = useUserLocal();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {


    let result = await ImagePicker.launchImageLibraryAsync({

      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1

    });
    if (!result.canceled) {
      onChange('image', result.assets[0].uri);
      setFile(result.assets[0]);
    }
  }
  const takeImage = async () => {

    if (status && !status.granted) {
      await requestPermission();
    }
    let result = await ImagePicker.launchCameraAsync({

      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1

    })
    if (!result.canceled) {
      onChange('image', result.assets[0].uri);
      setFile(result.assets[0]);

    }


  }

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value })
  }
  const register = async () => {
    if (isValidForm()) {
      setloading(true);
      const response = await RegisterWithImageAuthUseCase(values, file!);
      setloading(false);
      setResponseMessage(response.message);
      console.log('Result: ' + JSON.stringify(response))

      if(response.success){
        await SaveUserLocalUseCase(response.data);
        setSucessMessage('registro exitoso, inicia sesión')
        getUserSession();
      }
      else{
        seterrorMessage(response.message);
      }
    }


  }
  const isValidForm = (): boolean => {

    
    if (values.name === '') {
      seterrorMessage('Ingresa tu nombre');
      return false;
    }
    if (values.lastname === '') {
      seterrorMessage('Ingresa tu apellido');
      return false;
    }
    if (values.email === '') {
      seterrorMessage('Ingresa tu correo electrónico');
      return false;
    }
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expresionRegular.test(values.email)) {
      seterrorMessage('Formato de email inválido');
      return false;
    }
    if (values.phone === '') {
      seterrorMessage('Ingresa tu teléfono');
      return false;
    }
    if (values.password === '') {
      seterrorMessage('Ingresa tu contraseña');
      return false;
    }
    if (values.conPassword === '') {
      seterrorMessage('Ingresa la confirmación de la contraseña');
      return false;
    }
    if (values.password !== values.conPassword) {
      seterrorMessage('Las contraseñas no coinciden')
      return false
    }
    if (values.image === '') {
      seterrorMessage('Seleccione una imágen')
      return false
    }
    return true;
  }

  return {
    ...values,
    onChange,
    register,
    pickImage,
    takeImage,
    errorMessage,
    user,
    loading,
    getUserSession,
    responseMessage,
    sucessMessage
  }


}

export default RegisterViewModel;
