import { View, Text, Pressable } from 'react-native'
import useViewModel from './ViewModel';
import { StackNavigationProp } from '@react-navigation/stack';

import styles from './Styles'
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../../components/RoundedButton';
import { useEffect } from 'react';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';


export const ProfileInfoScreen = () => {
    //navegacion entre pantallas 
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { user, removeUserSession } = useViewModel();
    useEffect(() => {
        if (user.id === '') {

            navigation.replace('HomeScreen');
        }
    }, [user])

    return (

        <View style={styles.container}>

            <Image
                source={require('../../../../../assets/fondoperfil.jpg')}
                style={styles.imageBackground}
            />
            <Pressable

                style={styles.logout}
                onPress={() => {
                    removeUserSession();

                }}>
                <Image
                    source={require('../../../../../assets/power.png')}
                    style={styles.logoutImage}
                />
            </Pressable>
            <Pressable

                style={styles.change}
                onPress={() => navigation.replace('RolesScreen') 

                }>
                <Image
                    source={require('../../../../../assets/coordinar.png')}
                    style={styles.logoutImage}
                />
            </Pressable>

            <View style={styles.logoContainer}>
                {
                    user?.image !== ''
                    &&
                    <Image style={styles.logoImage}
                        source={{ uri: user?.image }} />
                }

            </View>
            <View style={styles.form}>
                <View style={styles.formInfo}>
                    <Image
                        source={require('../../../../../assets/users.png')}
                        style={styles.formImage}

                    />
                    <View style={styles.formContent}>
                        <Text>{user?.name} {user?.lastname}</Text>
                        <Text style={styles.formDescrip}>Nombre del usuario</Text>
                    </View>
                </View>
                <View style={{ ...styles.formInfo, marginTop: 25 }}>
                    <Image
                        source={require('../../../../../assets/email.png')}
                        style={styles.formImageEmail}

                    />
                    <View style={styles.formContent}>
                        <Text>{user?.email}</Text>
                        <Text style={styles.formDescrip}>Correo electrónico</Text>
                    </View>

                </View>
                <View style={{ ...styles.formInfo, marginTop: 25, marginBottom: 105 }}>
                    <Image
                        source={require('../../../../../assets/Phone.png')}
                        style={styles.formImageEmail}

                    />
                    <View style={styles.formContent}>
                        <Text>{user?.phone}</Text>
                        <Text style={styles.formDescrip}>Teléfono</Text>
                    </View>

                </View>
                <RoundedButton
                    onPress={() => {
                        navigation.navigate('ProfileUpdateScreen', { user: user! })

                    }}
                    text='Actualizar información'
                />
            </View>

        </View>
    )
}


{/*<Button
                onPress={()=>{
                    removeSession();
                    navigation.navigate('HomeScreen');
                }}
                title='cerrar Sesion'
                />
            */}