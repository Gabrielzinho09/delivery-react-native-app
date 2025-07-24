import { StyleSheet } from 'react-native'

const AdminProductCreateStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageContainer: {
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 25
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'stretch'
    },
    form: {
        width: '100%',
            height: '95%',
            backgroundColor: 'white',
            position: 'relative',
            bottom: 0,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            padding: 20
    },
    buttonContainer: {
        marginTop: 80
        
    },
    categoryInfo: {
        // flexDirection: 'row',
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageCategory: {
        width: 40,
        height: 40
    },
    textCategory: {
        // marginLeft: 10
        color: 'gray',
        fontSize: 15,
        fontWeight: 'bold',
        flex:1
    }
});

export default AdminProductCreateStyles;