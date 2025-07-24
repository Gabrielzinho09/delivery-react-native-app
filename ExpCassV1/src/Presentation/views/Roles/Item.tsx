import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { Rol } from '../../../Domain/entities/Rol';
import { MyColors } from '../../theme/AppTheme';
import { RootStackParamList } from '../../navigator/MainStackNavigator';



interface Props {
    rol: Rol;
    height: number,
    width: number,
    navigation: StackNavigationProp<RootStackParamList, "RolesScreen", undefined>;
    

}



export const RolesItem = ({rol, height, width, navigation }: Props) => {
  const roleRoutes: Record<string, keyof RootStackParamList> = {
    1: 'AdminTabsNavigator',
    2: 'DeliveryTabsNavigator',
    3: 'ClientTabsNavigator',
  };

  const handlePress = () => {
    if (roleRoutes.hasOwnProperty(rol.id)) {
      console.log(`SELECCIONO ${rol.name}`);
      navigation.replace(roleRoutes[rol.id]);
    } else {
      console.log('ID no reconocida:', rol.id);
      // Puedes manejar este caso de acuerdo a tus necesidades
    }
  };
    
    
  return (
        <TouchableOpacity
        onPress={handlePress}
            style={ { ...styles.container, height: height, width: width} }>
            
            <View style={ styles.imageContainer }>
                <Image 
                    style={styles.image}
                    source={{ uri: rol.image}}  
                    />
                <View style={styles.titleContainer}>
                    <Text style={ styles.textColor }>{ rol.name }</Text>
                </View>
            </View>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        paddingBottom: 20,
        paddingHorizontal: 7,

    },
    image: {
        flex: 1,
        resizeMode: 'contain'

    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        backgroundColor: 'white'

    },
    titleContainer: {
        height: 50,
        backgroundColor: MyColors.primary,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textColor: {
        color: 'white',

    }
})