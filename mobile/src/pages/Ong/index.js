import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Image, Text, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import style from './style';
import api from '../../services/api';

//imgs e icons
import imgLogo from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';

export default function Ong(){
    const [casos, setCasos] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const casoDaOng = route.params.caso;
    const ongId = casoDaOng.ongs_id;

    function navigateToDetail(caso){
        navigation.navigate('Details', {caso});
    }

    function navigateBack(){
        navigation.goBack()
    }

    function navigateToLogin(){
        navigation.navigate('Login')
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        setLoading(true);

        const resp = await api.get('perfil',{
            headers: {
                auth: ongId
            }
        });

        setCasos([... casos, ...resp.data]);
        setTotal(resp.headers['x-total-count']);
        setLoading(false);
    }

    useEffect(() => {
       loadIncidents();
    }, []);

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

            <Text style={style.title}>{casoDaOng.nome}</Text>
            <Text style={style.desc}>Total de <Text style={style.descBold}>{total} casos</Text>.</Text>
            <Text style={style.desc}>{casoDaOng.tipo} - ONG de {casoDaOng.cidade}/{casoDaOng.estado}</Text>
           
            <FlatList
                style={style.list}
                data={casos}
                keyExtractor={caso => String(caso.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item: caso}) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>CASO:</Text>
                        <Text style={style.incidentValue}>{caso.titulo}</Text>

                        <Text style={style.incidentProperty}>VALOR:</Text>
                        <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(caso.valor)}</Text>

                        <TouchableOpacity 
                            style={style.detailsBtn} 
                            onPress={() => navigateToDetail(caso)}
                        >
                            <Text style={style.detailsBtnText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}