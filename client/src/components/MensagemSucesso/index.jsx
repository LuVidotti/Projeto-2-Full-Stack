import styled from "styled-components";

const MensagemContainer = styled.div`
    display: grid;
    place-items: center;
    margin: 2em;
`

const MensagemSucessoEstilizada = styled.div`
    background-color: #82ffa5;
    color: #009a33;
    padding: 1em;
    width: 50%;
    border-radius: 5px;
`

function MensagemSucesso(props) {
    return (
        <MensagemContainer>
            <MensagemSucessoEstilizada>{props.texto}</MensagemSucessoEstilizada>
        </MensagemContainer>
    )
}

export default MensagemSucesso;