import styled from "styled-components";
import Titulo from "../../components/Titulo";
import Header from "../../components/Header";
import Busca from "../../components/Busca";
import Filme from "../../components/Filme";

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
    return(
        <div>
            <Header />
            <PrincipalContainer>
                <Titulo titulo='Buscar filmes'/>
                <Busca />
                <FilmesContainer>
                    <Filme />
                    <Filme />
                </FilmesContainer>
            </PrincipalContainer>
        </div>
    )
}

export default Principal;