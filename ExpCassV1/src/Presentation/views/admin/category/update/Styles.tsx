import { StyleSheet } from 'react-native'
import { AdminCategoryUpdateScreen } from './CategoryUpdate';

const AdminCategoryUpdateStyles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    imageBackground: {
        width: '100%',
        height: '95%',
        opacity: 0.7,
        bottom: '30%'
    },
    form: {
        backgroundColor: '#FEF9E7',
        width: '100%',
        height: '60%',
        position: 'absolute',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 40,
        bottom: 0,
        
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#3C5B3A',
        marginTop:20
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#879975',
        marginLeft: 15
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 20
    },
    formIcon: {
        width: 20,
        height: 25,
        marginTop: 3
    },
    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    formRegisterText: {
        fontStyle: 'italic',
        color: '#AEAA63',
        borderBottomWidth: 1,
        borderBottomColor: '#AEAA63',
        fontWeight: 'bold',
        marginLeft: 10
    }
    ,
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '8%',
        alignItems: 'center'
        //marginBottom:18

    },
    logoImage: {
        width: 80,
        height: 80,
        
        //marginRight:25,
        marginHorizontal: 10,
        borderRadius: 10

    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        marginTop: 30,
        fontWeight: 'bold'
    },
    loading:{
        bottom:0,
        top:0,
        right:0,
        left:0,
        position: 'absolute'
}
})

export default AdminCategoryUpdateStyles;