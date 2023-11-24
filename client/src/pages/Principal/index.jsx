import styled from "styled-components";
import Titulo from "../../components/Titulo";
import Header from "../../components/Header";
import Busca from "../../components/Busca";
import Filme from "../../components/Filme";
import axios from "axios";
import { useEffect, useState } from 'react';

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

    useEffect(() => {
        axios.get('http://localhost:3001/api/filmes').then((resposta) => {
            setFilmes(resposta.data);
        })
    }, []);

    return(
        <div>
            <Header />
            <PrincipalContainer>
                <Titulo titulo='Buscar filmes'/>
                <Busca />
                <FilmesContainer>
                    {
                        filmes.map((filme, index) => <Filme key={index} filme={filme.nome} data={filme.dataLancamento} descricao={filme.descricao}/>)
                    }
                </FilmesContainer>
            </PrincipalContainer>
        </div>
    )
}

export default Principal;