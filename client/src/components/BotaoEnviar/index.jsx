import styled from "styled-components";

const BotaoEstilizado = styled.button`
    border: none;
    background-color: #46437c;
    padding: 10px;
    border-radius: 5px;
    color: #FFF;
    font-weight: 700;
    width: 100%;
    transition: all 0.2s;

    &:hover {
        cursor: pointer;
        box-shadow: 10px 10px 20px black;
    }
`

function BotaoEnviar(props) {
    return (
        <BotaoEstilizado>{props.texto}</BotaoEstilizado>
    )
}

export default BotaoEnviar;