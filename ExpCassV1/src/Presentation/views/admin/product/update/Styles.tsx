import { StyleSheet } from 'react-native'

const AdminProductUpdateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAFAF1',
    },
    imageContainer: {
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 15,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,

    },
    image: {
        width: 110,
        height: 110,
        resizeMode: 'contain'
    },
    form: {
        backgroundColor: '#FEF9E7',
        height: '70%',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        position: 'absolute',
        bottom: 0
    },
    buttonContainer: {
        marginTop: 60
        // position: 'absolute',
        // bottom: 20,
        // left:20,
        // right:20
    },
    categoryInfo: {
        // flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageCategory: {
        width: 50,
        height: 50,
        
    },
    textCategory: {
        // marginLeft: 10
        color: 'gray',
        fontSize: 17,
        fontWeight: 'bold'
    }
});

export default AdminProductUpdateStyles;