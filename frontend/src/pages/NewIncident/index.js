import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import './style.css';

//imgs e icons
import imgLogo from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

export default function NewIncident(){
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const ongsId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        if(titulo === ''){
            alert(`Insira um título`);
        }
        else{
            if(descricao === ''){
                alert(`Insira uma descrição`);
            }
            else{
                if(valor === ''){
                    alert(`Insira um valor`);
                }
                else{
                    const data ={
                        titulo,
                        descricao,
                        valor,
                    }
            
                    try{
                        await api.post('casos',data,{
                            headers:{
                                auth: ongsId,
                            }
                        });
            
                        alert(`Cadastro feito com sucesso`);
                    
                        history.push('/profile')
                    }
                    catch(err){
                        setTitulo('');
                        setDescricao('');
                        setValor('');
                        alert(`Erro ao cadastrar novo caso, tente novamente`);
                    }
                }
            }
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={imgLogo} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>

                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input placeholder="Título do caso" value={titulo} onChange={e => setTitulo(e.target.value)} />
                    <textarea placeholder="Descrição do caso" value={descricao} onChange={e => setDescricao(e.target.value)} />
                    <input placeholder="Valor em reais" value={valor} onChange={e => setValor(e.target.value)} />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>    
        </div>
    );
}