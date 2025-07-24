import React, { useState,useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { SaveUserLocalUseCase } from '../../../../Domain/useCases/userLocal/SaveUserLocal';
import { UpdateUserUseCase } from '../../../../Domain/useCases/user/UpdateUser';
import { User } from '../../../../Domain/entities/User';
import { UpdateImageUserUseCase } from '../../../../Domain/useCases/user/UpdateWithImageUser';
import { ResponseAPIDelivery } from '../../../../Data/sources/remote/models/ResponseApiDelivery';
import { useUserLocal } from '../../../hooks/useUserLocal';
import { UserContext } from '../../../context/UserContext';



export const ProfileUpdateViewModel = (user: User) => {
  const [values, setValues] = useState(user);
  const [errorMessage, seterrorMessage] = useState('')
  const [sucessMessage, setSucessMessage] = useState('')
  
  
  const [loading, setloading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const {getUserSession} = useUserLocal();
  const {saveUserSession} = useContext(UserContext);

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
  const infoUpdate = (name: string, lastname: string, phone: string) => {
    setValues({ ...values, name, lastname, phone })
  }
  const update = async () => {
    if (isValidForm()) {
      setloading(true);
      let response = {} as ResponseAPIDelivery;
      if (values.image?.includes('https://')) {
        response = await UpdateUserUseCase(values);

      } else {
        response = await UpdateImageUserUseCase(values, file!);

      }

      setloading(false);
      console.log('Result: ' + JSON.stringify(response))

      if (response.success) {
        saveUserSession(response.data)
        setSucessMessage(response.message)
      }
      else {
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

    if (values.phone === '') {
      seterrorMessage('Ingresa tu teléfono');
      return false;
    }

    return true;
  }

  return {
    ...values,
    onChange,
    update,
    pickImage,
    takeImage,
    errorMessage,
    user,
    loading,
    infoUpdate,
    sucessMessage
  }


}

export default ProfileUpdateViewModel;
