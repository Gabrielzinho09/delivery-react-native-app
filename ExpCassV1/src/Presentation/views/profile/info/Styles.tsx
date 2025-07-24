import { StyleSheet } from "react-native";

const ProfileInfoStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    },
    imageBackground: {
        width: '160%',
        height: '60%',
        //opacity: 0.5,
        bottom: '0%'
    },
    form: {
        width: '100%',
        height: '50%',
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
    formImage:{
        height:25,
        width:25
    },
    formImageEmail:{
        height:21,
        width:22
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '14%',
        marginBottom:18

    },
    logoImage: {
        width: 150,
        height: 150,
        // position:'relative',
        //alignSelf:'flex-start'
        //marginRight:25,
        marginHorizontal: 25,
        borderRadius: 100,
        borderColor:'white',
        borderWidth:3

    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    formInfo:{
        flexDirection: 'row',
        alignItems:'center'
    },
    formContent:{
        marginLeft:15
    },
    formDescrip:{
        fontSize:12,
        color:'gray'
    },
    logout:{
        
        position:'absolute',
        alignSelf:'center',
        top:30,
        right:15,
        
    },
    logoutImage:{
        width:40,
        height:40,
        borderRadius:20

    },
    change:{
        position:'absolute',
        alignSelf:'center',
        top:80,
        right:15,
    }
});

export default ProfileInfoStyles