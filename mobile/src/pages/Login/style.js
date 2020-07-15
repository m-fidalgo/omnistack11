import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        justifyContent: 'center',
    },

    header: {
        position: 'absolute',
        left: 24,
        top: Constants.statusBarHeight + 20,
    },

    title: {
        fontSize: 30,
        marginBottom: 24,
        color: '#13131a',
        fontWeight: 'bold',
    },

    logar: {
        paddingVertical: 32,
        paddingHorizontal: 24,
        width: '100%',
        borderRadius: 8,
        backgroundColor: "#FFF",
        position: 'relative',
    },

    logarInput:{
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

    logarBtn: {
        marginBottom: 24,
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logarBtnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },

    cadastroBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    cadastroBtnText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold',
    }

});