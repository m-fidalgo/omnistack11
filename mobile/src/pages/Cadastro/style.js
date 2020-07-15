import {StyleSheet} from 'react-native';
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

    title: {
        fontSize: 30,
        marginBottom: 24,
        color: '#13131a',
        fontWeight: 'bold',
    },

    cadastrar: {
        marginTop: 32,
        paddingVertical: 32,
        paddingHorizontal: 24,
        width: '100%',
        borderRadius: 8,
        backgroundColor: "#FFF",
        position: 'relative',
    },

    cadastrarInput:{
        marginBottom: 24,
        width: '100%',
        height: 60,
        color: '#333',
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#dcdce6',
        borderRadius: 8,
        paddingVertical: 0,
        paddingHorizontal: 24,
    },

    cadastrarBtn: {
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cadastrarBtnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },

});