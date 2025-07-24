import { StyleSheet } from 'react-native';
const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackground: {
        width: '100%',
        height: '90%',
        //opacity: 0.5,
        bottom: '0%'
    },
    form: {
        width: '100%',
        height: '40%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 18,
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
        marginTop: 30
    },
    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5
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
        top: '10%',
        //marginBottom:18

    },
    logoImage: {
        width: 200,
        height: 200,
        // position:'relative',
        //alignSelf:'flex-start'
        //marginRight:25,
        marginHorizontal: 25,
        borderRadius: 95

    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    }

});

export default HomeStyles;