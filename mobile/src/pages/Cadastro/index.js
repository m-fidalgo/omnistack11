import React, {useState} from 'react';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import style from './style';

//imgs e icons
import imgLogo from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';

export default function Cadastro(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleCadastro(){
        if(loading){
            return;
        }

        if(email === ''){
            alert(`Insira seu e-mail`)
        }
        else{
            if(telefone === ''){
                alert(`Insira seu telefone`)
            }
            else{
                if(senha === ''){
                    alert(`Insira sua senha`)
                }
                else{
                    if(confSenha === ''){
                        alert(`Confirme sua senha`)
                    }
                    else{
                        if(senha !== confSenha){
                            setSenha('');
                            setConfSenha('');
                            alert(`As senhas não estão iguais`);
                        }
                        else{
                            setLoading(true);

                            const data ={
                                email,
                                telefone,
                                senha
                            };
                            
                            try{
                                await api.post('user',data);
                                setLoading(false);
                                setEmail('');
                                setTelefone('');
                                setSenha('');
                                setConfSenha('');
                                navigation.navigate('Login');
                            }
                            catch(err){
                                setLoading(false);
                                setEmail('');
                                setTelefone('');
                                setSenha('');
                                setConfSenha('');
                                alert(`Erro no cadastro, tente novamente`);                
                            }
                        }
                    }
                }
            }
        }
    }

    function navigateBack(){
        navigation.goBack()
    }

    return(
        <View style={style.container}>
           <View style={style.header}>
                <Image source={imgLogo} />
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
           </View>
        
           <View style={style.cadastrar} >
                <Text style={style.title}>Faça seu cadastro</Text>

                <TextInput style={style.cadastrarInput} keyboardType={"email-address"} placeholder={"E-mail"} value={email} onChangeText={text => setEmail(text)} />
                <TextInput style={style.cadastrarInput} keyboardType={"phone-pad"} placeholder={"Telefone"} value={telefone} onChangeText={text => setTelefone(text)} />
                <TextInput style={style.cadastrarInput} secureTextEntry={true} placeholder={"Senha"} value={senha} onChangeText={text => setSenha(text)} />
                <TextInput style={style.cadastrarInput} secureTextEntry={true} placeholder={"Confirmar senha"} value={confSenha} onChangeText={text => setConfSenha(text)} />

                <TouchableOpacity style={style.cadastrarBtn} onPress={handleCadastro} >
                    <Text style={style.cadastrarBtnText}>Cadastrar</Text>
                </TouchableOpacity>
           </View>
        </View>
    );
}