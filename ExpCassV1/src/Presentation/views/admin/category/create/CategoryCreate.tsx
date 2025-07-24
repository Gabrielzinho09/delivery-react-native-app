import React, { useState,useEffect } from 'react';
import { Image, Text, View, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import styles from './Styles'
import { CustomTextInput } from '../../../../components/CustomTextInput'
import useViewModel from './ViewModel'
import { RoundedButton } from '../../../../components/RoundedButton';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { MyColors, myStyles } from '../../../../theme/AppTheme';


export const AdminCategoryCreateScreen = () => {
  const { name, description, responseMessage ,createCategory, loading, image, takeImage, pickImage, onChange } = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if(responseMessage !== ''){
      ToastAndroid.show(responseMessage, ToastAndroid.LONG)
    }
    
  }, [responseMessage])
  
  return (
    <View style={styles.container}>

    <Image
        source={require('../../../../../../assets/categoriAdm.jpg')}
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

        <Text style={styles.logoText}>Selecciona una imágen</Text>
    </View>
    <View style={styles.form}>
        
            <Text style={styles.formText}>Ingresa una nueva categoría</Text>
            <CustomTextInput
                image={require('../../../../../../assets/namecat.png')}
                placeholder='Nombre'
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
            

            <View style={{ marginTop: 140 }}>
            <RoundedButton

              text='Crear Categoría'
              onPress={() => createCategory()}
              />
            </View>
        
    </View>
    <ModalPickImage
        openGalery={pickImage}
        openCamera={takeImage}
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



