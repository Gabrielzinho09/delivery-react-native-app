import { StackScreenProps } from '@react-navigation/stack';
import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { RoundedButton } from '../../../../components/RoundedButton';
import { CategoryStackParamList } from '../../../../navigator/AdminCategoryNavigator';
import { MyColors, myStyles } from '../../../../theme/AppTheme';
import styles from './Styles';
import useViewModel from './ViewModel';
import { Alert } from 'react-native';

interface Props extends StackScreenProps<CategoryStackParamList, 'AdminCategoryUpdateScreen'>{};

export const AdminCategoryUpdateScreen = ({navigation, route}: Props) => {

  const { category } = route.params;
  const { name, description, responseMessage, loading, image, onChange, takePhoto, pickImage, updateCategory } = useViewModel(category);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage])
  const confirmUpdate = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas actualizar?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Actualizar',
          onPress: () => updateCategory(),
        },
      ],
      { cancelable: false }
    );
  }
  

  return (
    <View style={styles.container}>

    <Image
        source={require('../../../../../../assets/fondous.jpg')}
        style={styles.imageBackground}
    />
    <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() =>
            setModalVisible(true)}>
            {
                image == ''
                    ? <Image
                        source={require('../../../../../../assets/add.png')}
                        style={styles.logoImage}
                    />
                    : <Image
                        source={{ uri: image }}
                        style={styles.logoImage}

                    />
            }

        </TouchableOpacity>

        <Text style={styles.logoText}>Nueva imágen</Text>
    </View>
    <View style={styles.form}>
        
            <Text style={styles.formText}>Ingresa una nueva categoría</Text>
            <CustomTextInput
                image={require('../../../../../../assets/namecat.png')}
                placeholder='Nombres'
                keyboardType='default'
                property='name'
                onChangeText={onChange}
                value={name}
            />

            <CustomTextInput
                image={require('../../../../../../assets/desc.png')}
                placeholder='Descripción'
                keyboardType='default'
                property='description'
                onChangeText={onChange}
                value={description}
            />
            

        <View style={{marginTop: 150}}>
            <RoundedButton 
                text='Actualizar'
                onPress={() => confirmUpdate()}
            />
        </View>


        </View>
    <ModalPickImage
        openGalery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
    />
    {
        loading &&
        <ActivityIndicator 
        style={styles.loading}
        size="large"
        color={MyColors.primary} 
        />
        
        
    }
    

</View>
    //---------------------------------------------------///
    
  )
}