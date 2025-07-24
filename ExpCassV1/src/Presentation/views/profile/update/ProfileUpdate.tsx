import React, { useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, ToastAndroid, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import useViewModel from './ViewModel';
import styles from './Styles'
import { ModalPickImage } from '../../../components/ModalPickImage';

import { MyColors } from '../../../theme/AppTheme';
import { RoundedButton } from '../../../components/RoundedButton';
import { CustomTextInput } from '../../../components/CustomTextInput';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';


//diseño registro user
interface Props extends StackScreenProps<RootStackParamList, 'ProfileUpdateScreen'> { };


export const ProfileUpdateScreen = ({ navigation, route }: Props) => {
    
    const {user} = route.params
    const { name, lastname, image, phone, errorMessage, sucessMessage,update,loading, onChange, pickImage, takeImage } = useViewModel(user);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (errorMessage != '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        }

    }, [errorMessage])

    useEffect(() => {
        if (sucessMessage != '') {
            ToastAndroid.show(sucessMessage, ToastAndroid.LONG);
        }

    }, [sucessMessage])
    
 

  

    return (
        <View style={styles.container}>

            <Image
                source={require('../../../../../assets/fondous.jpg')}
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() =>
                    setModalVisible(true)}>
                    {
                        image == ''
                            ? <Image
                                source={{uri: user?.image}}
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
                <ScrollView>
                    <Text style={styles.formText}>Actualizar mi perfil</Text>
                    <CustomTextInput
                        image={require('../../../../../assets/users.png')}
                        placeholder='Nombres'
                        keyboardType='default'
                        property='name'
                        onChangeText={onChange}
                        value={name}
                    />
                    <CustomTextInput
                        image={require('../../../../../assets/apellido.png')}
                        placeholder='Apellidos'
                        keyboardType='default'
                        property='lastname'
                        onChangeText={onChange}
                        value={lastname}
                    />

                    <CustomTextInput
                        image={require('../../../../../assets/Phone.png')}
                        placeholder='Teléfono'
                        keyboardType='phone-pad'
                        property='phone'
                        onChangeText={onChange}
                        value={phone}
                    />


                    <View style={{ marginTop: 30 }}>
                        <RoundedButton text='Confirmar'
                            onPress={() => update()} />
                    </View>
                </ScrollView>
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
    );
}

