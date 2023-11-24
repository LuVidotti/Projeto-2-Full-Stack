import styled from "styled-components";

const MensagemContainer = styled.div`
    display: grid;
    place-items: center;
    margin: 2em;
`

const MensagemErroEstilizada = styled.div`
    background-color: #ff8080;
    color: #9a0000;
    padding: 1em;
    width: 50%;
    border-radius: 5px;
`

function MensagemErro(props) {
    return (
        <MensagemContainer>
            <MensagemErroEstilizada>{props.texto}</MensagemErroEstilizada>
        </MensagemContainer>
    )
}

export default MensagemErro;