import styled from "styled-components";
import Titulo from "../../components/Titulo";
import Header from "../../components/Header";
import Busca from "../../components/Busca";
import Filme from "../../components/Filme";
import axios from "axios";
import { useEffect, useState } from 'react';
import MensagemErro from "../../components/MensagemErro";

const PrincipalContainer = styled.div`
    padding: 3em;
`

const FilmesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3em;
    gap: 1em;
`

function Principal() {
    const [filmes, setFilmes] = useState([]);
    const [busca, setBusca] = useState('');
    const [filmesBuscados, setFilmesBuscados] = useState([]);
    const [mensagemErro, setMensagemErro] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/api/filmes').then((resposta) => {
            setFilmes(resposta.data);
        })
    }, []);

    async function buscarFilme(e) {
        e.preventDefault();

        if(busca.length < 3) {
            setMensagemErro('A busca deve ter mais de 3 caracteres');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const resposta = await axios.get(`http://localhost:3001/api/filmes/${busca}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            if(resposta.data.length === 0) {
                setMensagemErro('Não há nenhum filme com este termo');
                return;
            }
            setMensagemErro('');
            setFilmesBuscados(resposta.data);
        } catch(erro) {
            setMensagemErro(erro.response.data.message);
        }

        
    }

    return(
        <div>
            <Header />
            <PrincipalContainer>
                <Titulo titulo='Buscar filmes'/>
                <Busca setBusca={setBusca} buscarFilme={buscarFilme}/>
                <FilmesContainer>
                    {
                        mensagemErro !== '' ? <MensagemErro texto={mensagemErro}/>
                        :
                        filmesBuscados.length > 0 ? 
                            filmesBuscados.map((filme, index) => <Filme key={index} filme={filme.nome} data={filme.dataLancamento} descricao={filme.descricao}/>)
                        :
                        filmes.map((filme, index) => <Filme key={index} filme={filme.nome} data={filme.dataLancamento} descricao={filme.descricao}/>)
                    }
                </FilmesContainer>
            </PrincipalContainer>
        </div>
    )
}

export default Principal;