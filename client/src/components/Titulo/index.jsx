import styled from "styled-components";

const TituloEstilizado = styled.h1`
    color: #FFF;
    font-size: 32px;
    text-align: center;
`

function Titulo(props) {
    return (
        <TituloEstilizado>{props.titulo}</TituloEstilizado>
    )
}

export default Titulo;