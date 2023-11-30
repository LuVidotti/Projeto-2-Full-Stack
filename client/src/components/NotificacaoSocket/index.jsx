import styled from "styled-components";

const NotificacaoContainer = styled.div`
    display: grid;
    place-items: center;
    margin: 2em;
`

const NotificacaoMensagem = styled.div`
    background-color: #82aeff;
    color: #0f009a;
    padding: 1em;
    width: 50%;
    border-radius: 5px;
`

function NotificacaoSocket(props) {
    return(
        <NotificacaoContainer>
            <NotificacaoMensagem>{props.texto}</NotificacaoMensagem>
        </NotificacaoContainer>
    )
}

export default NotificacaoSocket;