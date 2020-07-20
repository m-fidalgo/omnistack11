import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {MenuItem, Select, FormControl, makeStyles} from '@material-ui/core';
import api from '../../services/api';
import './style.css';

//imgs
import imgLogo from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

const useStyles = makeStyles((theme) => ({
    rootFormControl: {
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: '100%',
        height: 60,
        borderRadius: 8,
        backgroundColor: '#fff',
        border: '3px solid #dcdce6',
        color: '#333',
        padding: '0 24px',
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            outline: 'none',
        },
    },
    rootSelect: {
        font: '400 18px Roboto, sans-serif',
        '&:focus': {
            backgroundColor: '#fff',
        },
    },
  }));


export default function Register(){   
    const classes = useStyles();

    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[cidade, setCidade] = useState('');
    const[estado, setEstado] = useState('');
    const[tipo, setTipo] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        if(nome === ''){
            alert(`Insira o nome da ONG`);
        }
        else{
            if(email === ''){
                alert(`Insira seu e-mail`);
            }
            else{
                if(whatsapp === ''){
                    alert(`Insira seu número de WhatsApp`);
                }
                else{
                    if(cidade === ''){
                        alert(`Insira sua cidade`);
                    }
                    else{
                        if(estado === ''){
                            alert(`Insira seu estado`);
                        }
                        else{
                            if(tipo === ''){
                                alert(`Selecione o tipo da ONG`);
                            }
                            else{
                                const data = {
                                    nome,
                                    email,
                                    whatsapp,
                                    cidade,
                                    estado,
                                    tipo
                                };
                        
                                try{
                                    const resp = await api.post('ongs',data);
                                
                                    alert(`Seu ID de acesso: ${resp.data.id}`);    
                                    
                                    history.push('/');
                                }
                                catch(err){
                                    setNome('');
                                    setEmail('');
                                    setWhatsapp('');
                                    setCidade('');
                                    setEstado('');
                                    setTipo('');
                                    alert(`Erro no cadastro, tente novamente`);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={imgLogo} alt="Be The Hero" />

                    <h1>Cadastro</h1>

                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para o login
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={nome} onChange={e => setNome(e.target.value)} />
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                    
                    <div className="input-group">
                        <input placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
                        <input placeholder="UF" style={{width: 80}} value={estado} onChange={e => setEstado(e.target.value)} /> 
                    </div>

                    <FormControl classes={{root: classes.rootFormControl}} >
                        <Select
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                            displayEmpty
                            classes={{root: classes.rootSelect}}
                            disableUnderline
                        >
                            <MenuItem value="" disabled>Selecione o tipo da ONG</MenuItem>
                            <MenuItem value={'Animais'}>Animais</MenuItem>
                            <MenuItem value={'Direitos Humanos'}>Direitos Humanos</MenuItem>
                            <MenuItem value={'Meio Ambiente'}>Meio Ambiente</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}