import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native';
import * as mailComposer from 'expo-mail-composer';
import style from './style';

//imgs e icons
import imgLogo from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';

export default function Details(){
    const navigation = useNavigation();
    const route = useRoute();
    const caso = route.params.caso;

    const msg = `Olá ${caso.nome}, estou entrando em contato pois gostaria de ajudar no caso "${caso.titulo}" com o valor de ${Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(caso.valor)}`;

    function navigateBack(){
        navigation.goBack()
    }

    function navigateToLogin(){
        navigation.navigate('Login')
    }

    function sendMail(){
        mailComposer.composeAsync({
            subject: `Herói do caso: ${caso.titulo}`,
            recipients: [caso.email],
            body: msg
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${msg}`)
    }

    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={imgLogo} />
                
                <View style={style.headerRight}>
                    <TouchableOpacity onPress={navigateBack}>
                        <Feather name="arrow-left" size={28} color="#e02041" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[{marginLeft: 24}]} onPress={navigateToLogin}>
                        <Feather name="power" size={28} color="#e02041" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={style.incident}>
                <Text style={[style.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={style.incidentValue}>{caso.nome} de {caso.cidade}/{caso.estado} </Text>

                <Text style={style.incidentProperty}>CASO:</Text>
                <Text style={style.incidentValue}>{caso.titulo}</Text>

                <Text style={style.incidentProperty}>DESCRIÇÃO:</Text>
                <Text style={style.incidentValue}>{caso.descricao}</Text>

                <Text style={style.incidentProperty}>VALOR:</Text>
                <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(caso.valor)}</Text>
            </View>

            <View style={style.contact}>
                <Text style={style.contactTitle}>Salve o dia!</Text>
                <Text style={style.contactTitle}>Seja o herói desse caso</Text>

                <Text style={style.contactDesc}>Entre em contato:</Text>
            
                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            
            </View>
        </View>
    );
}