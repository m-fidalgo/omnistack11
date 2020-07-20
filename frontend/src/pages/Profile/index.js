import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import './style.css';

//imgs e icons
import imgLogo from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Profile(){
    const [casos, setCasos] = useState([]);
    const ongNome = localStorage.getItem('ongNome');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    useEffect(() => {
        api.get('/perfil',{
            headers:{
                auth: ongId,
            }
        }).then(resp => {
            setCasos(resp.data);
           })
    }, [ongId]);

    async function handleDeleteCaso(id){
        try{
            await api.delete(`casos/${id}`,{
                headers: {
                    auth: ongId,
                }
            });

            setCasos(casos.filter(caso => caso.id !== id));
        }
        catch(err){
            alert(`Erro ao deletar caso, tente novamente`);
        }
    }

    async function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={imgLogo} alt="Be The Hero" />
                <span>Bem vindo(a), {ongNome}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            
            <h1>Casos cadastrados</h1>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                        <strong>CASO:</strong>
                        <p>{caso.titulo}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{caso.descricao}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency: 'BRL'}).format(caso.valor)}</p>

                        <button type="button" onClick={() => handleDeleteCaso(caso.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
            
        </div>
    );
}