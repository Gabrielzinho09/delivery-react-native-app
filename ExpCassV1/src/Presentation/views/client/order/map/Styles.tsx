import { StyleSheet } from "react-native";

const ClientOrderMapStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageLocation: {
        height: 65,
        width: 65,
        justifyContent: 'center',
        position: 'absolute'
    },
    refPoint: {
        position: 'absolute',
        backgroundColor: '#d4d4d4',
        width: '70%',
        paddingVertical: 4,
        top: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    refPointText: {
        textAlign: 'center',
        
    },
    buttonRefPoint: {
        // position: 'absolute',
        // bottom: 40,
        width: '100%',
        marginTop: 15
        // paddingHorizontal: 30
    },
    info: {
        backgroundColor: 'white',
        height: '30%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        alignItems: 'center'
    },
    infoRow: {
        flexDirection: 'row',
        marginTop: 15
    },
    infoText: {
        flex: 1
    },
    infoImage: {
        width: 25,
        height: 25
    },
    infoTitle: {
        color: 'black'
    },
    infoDescription: {
        color: 'gray',
        fontSize: 13,
        marginTop: 3
    },
    divider: {
        backgroundColor: '#e2e2e2',
        height: 1,
        width: '100%',
        marginTop: 15
    },
    infoClient: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    imageClient: {
        height: 45,
        width: 50,
        borderRadius: 15
    },
    imagePhone: {
        height: 35,
        width: 35,
    },
    nameClient: {
        fontWeight: 'bold',
        fontSize: 17,
        flex: 1,
        marginLeft: 15
    },
    markerImage: {
        height: 50,
        width: 50,
    },
    backContainer: {
        position: 'absolute',
        top: 40,
        left: 20
    },
    back: {
        height: 30,
        width: 30
    },
    durationContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 5,
        padding: 5,
      },
      durationText: {
        fontSize: 14,
        fontWeight: 'bold',
      },
});

export default ClientOrderMapStyles;