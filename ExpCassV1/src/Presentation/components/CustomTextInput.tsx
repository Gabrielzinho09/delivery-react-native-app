import React from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardType } from 'react-native';

interface Props {
    image: any,
    placeholder: string,
    value:string,
    keyboardType: KeyboardType,
    secureTextEntry?:boolean,
    property:string,
    editable?: boolean,
    onChangeText:(property: string, value: any)
    => void
}

export const CustomTextInput = ({
    image,
    placeholder,
    value,
    editable,
    keyboardType,
    secureTextEntry=false,
    property,
    onChangeText
}: Props) => {
    return (
        <View style={styles.formInput}>
            <Image style={styles.formIcon}
                source={image}
            />
            <TextInput
                style={styles.formTextInput}
                placeholder={placeholder}
                keyboardType={keyboardType }
                value={value}
                onChangeText={text =>
                    onChangeText(property, text)} 
                    secureTextEntry={secureTextEntry}
                    editable={ editable }/>
        </View>
    )
}

const styles = StyleSheet.create({
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#879975',
        marginLeft: 15
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30
    },
    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5
    }
})
