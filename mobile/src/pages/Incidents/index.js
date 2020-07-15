import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import style from './style';
import api from '../../services/api';

//imgs e icons
import imgLogo from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';

export default function Incidents(){
    const [casos, setCasos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    function navigateToDetail(caso){
        navigation.navigate('Details', {caso});
    }

    function navigateToLogin(){
        navigation.navigate('Login');
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && casos.length == total){
            return;
        }

        setLoading(true);

        const resp = await api.get('casos',{
            params: {page}
        });

        setCasos([... casos, ...resp.data]);
        setTotal(resp.headers['x-total-count']);
        setPage(page + 1);
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
                    <Text style={style.headerText}>
                        Total de <Text style={style.headerTextBold}>{total} casos</Text>.
                    </Text>

                    <TouchableOpacity style={[{marginLeft: 24}]} onPress={navigateToLogin}>
                        <Feather name="power" size={28} color="#e02041" />
                    </TouchableOpacity>
                </View>

                
            </View>

            <Text style={style.title}>Bem vindo(a)</Text>
            <Text style={style.desc}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList
                style={style.list}
                data={casos}
                keyExtractor={caso => String(caso.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: caso}) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>{caso.nome}</Text>

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
    );
}