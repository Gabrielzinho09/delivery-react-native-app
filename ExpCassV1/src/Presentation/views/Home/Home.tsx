import { useNavigation } from '@react-navigation/native'
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import useViewModel from './ViewModel';
import { CustomTextInput } from '../../components/CustomTextInput';
import styles from './Styles';
import { useEffect } from 'react';
import { RootStackParamList } from '../../navigator/MainStackNavigator';
import * as Notifications from 'expo-notifications';
import { NotificationPush } from '../../utils/NotificationPush';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

//diseño login

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'> { };
export const HomeScreen = ({ navigation, route }: Props) => {



    const { email, password, onChange, login, user, ErrorMessage, updateNotificationToken } = useViewModel();
    const { notification, notificationListener, responseListener, registerForPushNotificationsAsync, setNotification } = NotificationPush();




    useEffect(() => {
        if (ErrorMessage !== '') {
            ToastAndroid.show(ErrorMessage, ToastAndroid.LONG)
        }
    }, [ErrorMessage])

    useEffect(() => {
        if (user?.id !== null && user?.id !== undefined && user?.id !== '') {

            registerForPushNotificationsAsync().then(token => {

                //const { data: { projectId } } = await Notifications.getExpoPushTokenAsync();


                console.log('TOKEN: ' + token);

                updateNotificationToken(user?.id!, token!);

                if (Array.isArray(user.roles) && user.roles.length > 0) {
                    if (user.roles.length > 1) {
                        navigation.replace('RolesScreen');
                    } else {
                        const roleName = user.roles[0].id;
                        console.log('El rol del usuario es:', roleName);
                        switch (roleName) {
                            case '1':
                                navigation.replace('AdminTabsNavigator');
                                break;
                            case '2':
                                navigation.replace('DeliveryTabsNavigator');
                                break;
                            case '3':
                                navigation.replace('ClientTabsNavigator');
                                break;
                            default:
                                console.log('Rol no reconocido');
                        }
                    }
                } else {
                    console.log('El usuario no tiene roles asignados');
                }
                
                
                
                


            });

            // This listener is fired whenever a notification is received while the app is foregrounded
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

            // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            });

            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
            };
        }
    }, [user])


    return (
        <View style={styles.container}>

            <Image
                source={require('../../../../assets/pexelsFondo.jpg')}
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <Image style={styles.logoImage}
                    source={require('../../../../assets/logo.jpeg')} />
                <Text style={styles.logoText}>Sin fronteras
                </Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.formText}>Iniciar Sesión
                </Text>
                <CustomTextInput
                    image={require('../../../../assets/users.png')}
                    placeholder='Correo electrónico'
                    keyboardType='email-address'
                    property='email'
                    onChangeText={onChange}
                    value={email}

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

                <View style={{ marginTop: 30 }}>
                    <RoundedButton text='Ingresar' onPress={() =>
                        login()
                    } />
                </View>
                <View style={styles.formRegister}>
                    <Text >No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.formRegisterText}
                        >Regístrate</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

 