import styled from "styled-components";
import BotaoEnviar from "../BotaoEnviar";

const FormContainer = styled.div`
    display: grid;
    place-items: center;
    margin-top: 5em;
`

const Form = styled.form`
    background-color: #1D1C3B;
    padding: 24px;
    border-radius: 16px;
    width: 30vw;

    label {
        display: block;
        margin-bottom: 10px;
    }

    input {
        display: block;
        margin-bottom: 2em;
        padding: 10px;
        border-radius: 10px;
        border: none;
        width: 95%;
    }
`

function Formulario() {
    return(
        <FormContainer>
            <Form>
                <label htmlFor="usuario">Usuário</label>
                <input type="text" id="usuario" />

                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha"/>

                <BotaoEnviar texto='Entrar'/>
            </Form>
        </FormContainer>
    )
}

export default Formulario;