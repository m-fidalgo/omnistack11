import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import './style.css';

//imgs
import imgLogo from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

export default function Register(){
    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[cidade, setCidade] = useState('');
    const[estado, setEstado] = useState('');

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
                        if(estado == ''){
                            alert(`Insira seu estado`);
                        }
                        else{
                            const data = {
                                nome,
                                email,
                                whatsapp,
                                cidade,
                                estado
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
                                alert(`Erro no cadastro, tente novamente`);
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

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}