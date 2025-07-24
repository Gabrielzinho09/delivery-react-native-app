import React, { useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, ToastAndroid, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { CustomTextInput } from '../../components/CustomTextInput';
import { StackScreenProps } from '@react-navigation/stack';
import useViewModel from './ViewModel';
import styles from './Styles'
import { ModalPickImage } from '../../components/ModalPickImage';
import { MyColors } from '../../theme/AppTheme';
import { RootStackParamList } from '../../navigator/MainStackNavigator';



//diseño registro user
interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> { };


export const RegisterScreen = ({ navigation, route }: Props) => {

    const { name, lastname, email, image, phone, password, conPassword, sucessMessage,errorMessage, loading,user, onChange, register, pickImage, takeImage,responseMessage } = useViewModel();
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

    useEffect(() => {
        if (user?.id !== null && user?.id !== undefined) {
            navigation.navigate('HomeScreen');
        }
    }, [user])

    return (
        <View style={styles.container}>

            <Image
                source={require('../../../../assets/fondous.jpg')}
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() =>
                    setModalVisible(true)}>
                    {
                        image == ''
                            ? <Image
                                source={require('../../../../assets/user_image.png')}
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
                    <Text style={styles.formText}>Registrarse</Text>
                    <CustomTextInput
                        image={require('../../../../assets/users.png')}
                        placeholder='Nombres'
                        keyboardType='default'
                        property='name'
                        onChangeText={onChange}
                        value={name}
                    />
                    <CustomTextInput
                        image={require('../../../../assets/apellido.png')}
                        placeholder='Apellidos'
                        keyboardType='default'
                        property='lastname'
                        onChangeText={onChange}
                        value={lastname}
                    />
                    <CustomTextInput
                        image={require('../../../../assets/email.png')}
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        property='email'
                        onChangeText={onChange}
                        value={email}
                    />
                    <CustomTextInput
                        image={require('../../../../assets/Phone.png')}
                        placeholder='Teléfono'
                        keyboardType='phone-pad'
                        property='phone'
                        onChangeText={onChange}
                        value={phone}
                    />
                    <CustomTextInput
                        image={require('../../../../assets/passwords.png')}
                        placeholder='Contraseña'
                        keyboardType='default'
                        property='password'
                        onChangeText={onChange}
                        value={password}
                        secureTextEntry={true}
                    />
                    <CustomTextInput
                        image={require('../../../../assets/confpass.png')}
                        placeholder='Confirmar contraseña'
                        keyboardType='default'
                        property='conPassword'
                        onChangeText={onChange}
                        value={conPassword}
                        secureTextEntry={true}
                    />

                    <View style={{ marginTop: 30 }}>
                        <RoundedButton text='Confirmar'
                            onPress={() => register()} />
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

