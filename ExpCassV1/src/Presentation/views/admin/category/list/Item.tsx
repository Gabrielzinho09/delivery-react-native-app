import React from 'react'
import { Category } from '../../../../../Domain/entities/Category'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { CategoryStackParamList } from '../../../../navigator/AdminCategoryNavigator';
import { Alert } from 'react-native';



interface Props {
    category: Category;
    remove: (id: string) => void
}

export const AdminCategoryListItem = ({category, remove}: Props) => {

    const navigation = useNavigation<StackNavigationProp<CategoryStackParamList>>();
    const confirmDelete = () => {
        Alert.alert(
            'Confirmación',
            '¿Estás seguro de eliminar categoría?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        remove(category.id!);
                    },
                },
            ],
            { cancelable: false }
        );
    }

  return (
    <TouchableOpacity
        onPress={()=>navigation.navigate('AdminProductNavigator', {category: category})}
    >
        <View style={ styles.container }>
            <Image
                style={ styles.image }
                source={{ uri: category.image }}
            />

            <View style={styles.info}>
                <Text style={styles.title}>{ category.name }</Text>
                <Text style={styles.description}>{ category.description }</Text>
            </View>

            <View style={ styles.actionContainer }>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AdminCategoryUpdateScreen', {category: category})}
                >
                    <Image 
                        style={styles.actionImage}
                        source={ require('../../../../../../assets/edit.png') }
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={confirmDelete}
                >
                    <Image 
                        style={styles.actionImage}
                        source={ require('../../../../../../assets/trash.png') }
                    />
                </TouchableOpacity>
            </View>

        </View>
        <View style={styles.divider}></View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        height: 70,
        marginHorizontal: 20,
        marginTop: 10
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15
    },
    info: {
        marginLeft: 15,
        flex: 1
    },
    title: {
        color: 'black',
        fontSize: 15
    },
    description: {
        color: 'gray',
        fontSize: 12,
        marginTop: 3
    },
    actionContainer: {
        marginRight: 40
    },
    actionImage: {
        width: 25,
        height: 25,
        marginVertical:2
    },
    divider: {
        height: 1,
        backgroundColor: '#f2f2f2',
        marginHorizontal: 30,
        flex: 1
    }
});