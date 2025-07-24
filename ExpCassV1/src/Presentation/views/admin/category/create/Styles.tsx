import { StyleSheet } from "react-native";


const AdminCategoryCreateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackground: {
        width: '100%',
        height: '90%',
        opacity: 0.7,
        bottom: '30%'
    },
    form: {
        width: '100%',
        height: '60%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#3C5B3A'
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
        height: 20,
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
        top: '4%',
        alignItems: 'center'
        //marginBottom:18

    },
    logoImage: {
        width: 80,
        height: 80,
        // position:'relative',
        //alignSelf:'flex-start'
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
}
)

export default AdminCategoryCreateStyles;