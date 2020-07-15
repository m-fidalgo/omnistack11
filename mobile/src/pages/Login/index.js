import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import style from './style';
import api from '../../services/api';

//imgs e icons
import imgLogo from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';

export default function Login(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin(){
        if(loading){
            return
        }

        if(email === ''){
            alert(`Insira seu e-mail`)
        }
        else{
            if(senha === ''){
                alert(`Insira sua senha`)
            }
            else{
                setLoading(true);

                const data ={
                    email,
                    senha
                };
        
                try{
                    await api.post('sessionsuser',data);
                    setLoading(false);
                    setEmail('');
                    setSenha('');
                    navigation.navigate('Incidents');
                }
                catch(err){
                    setLoading(false);
                    setEmail('');
                    setSenha('');
                    alert(`Erro no login, tente novamente`);  
                }        
            }
        }    
    }

    function navigateToCadastro(){
        navigation.navigate('Cadastro');
    }

    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={imgLogo} />
            </View>
            
            
                    
            <View style={style.logar}>
                <Text style={style.title}>Faça seu login</Text>
                
                <TextInput style={style.logarInput} keyboardType={'email-address'} placeholder={"E-mail"} value={email} onChangeText={text => setEmail(text)} />
                <TextInput style={style.logarInput} secureTextEntry={true} placeholder={"Senha"} value={senha} onChangeText={text => setSenha(text)} />

                <TouchableOpacity style={style.logarBtn} onPress={handleLogin} >
                    <Text style={style.logarBtnText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.cadastroBtn} onPress={navigateToCadastro}>
                    <Text style={style.cadastroBtnText}>Não tenho cadastro</Text>
                    <Feather name="log-in" size={16} color="#e02041" />
                </TouchableOpacity>
            </View>
            
        </View>
    );
}