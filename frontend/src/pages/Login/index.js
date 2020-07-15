import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import './style.css';

//imgs e icons
import imgHeroes from '../../assets/heroes.png';
import imgLogo from '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi';

export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();

   async function handleLogin(e){
        e.preventDefault();

        if(id === ''){
            alert(`Insira seu id`);
        }
        else{
            try{
                const resp = await api.post('sessions',{id})
                
                localStorage.setItem('ongId', id);
                localStorage.setItem('ongNome', resp.data.nome);
            
                history.push('/profile');
            }
            catch(err)
            {
                setId('');
                alert(`Falha no login, tente novamente`);
            }
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={imgLogo} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input placeholder="Seu ID" value={id} onChange={e=> setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={imgHeroes} alt="Heroes" />
        </div>
    );
}