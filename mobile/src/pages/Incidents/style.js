import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerText: {
        fontSize: 15,
        color: '#737380',
    },

    headerTextBold: {
        fontWeight: 'bold',
    },

    titleBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 48,
    },
    
    title: {
        fontSize: 30,
        color: '#13131a',
        fontWeight: 'bold',
    },

    filtro: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    filtroText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 24,
    },

    desc: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
    },

    list: {
        marginTop: 32,
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#FFF",
        marginBottom: 16,
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380',
    },

    incidentValueRed: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#e02041',
    },

    detailsBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    detailsBtnText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold',
    }
});