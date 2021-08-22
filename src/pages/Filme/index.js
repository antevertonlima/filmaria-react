import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from "../../services/api";
import { toast } from 'react-toastify';

import './filme-info.css';

export default function Filme() {
    const { id } = useParams();
    const history = useHistory();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme() {
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if (response.data.length === 0) {
                history.replace('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);
        }

        loadFilme();

    },[id, history]);

    function salvaFilme() {
        const minhaLista = localStorage.getItem('filmes');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        //se tiver algum filme salvo com esse mesmo id precisa ignorar ..
        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id);

        if (hasFilme) {
            toast.error('Você já possui esse filme salvo.');
            return;//para a execução do codigo
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes',JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');
    }
    
    if (loading) {
        return(
            <div className="filme-info">
                <h1>Carregando seu filme ...</h1>
            </div> 
        );
    } 

    return(
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            <p>
                {filme.sinopse}
            </p>
            <div>
                <button onClick={ salvaFilme }>Salvar</button>
                <button>
                    <a rel="noreferrer"
                       target="_blank" 
                       href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}