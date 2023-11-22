import styled from "styled-components";

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

    button {
        border: none;
        background-color: #46437c;
        padding: 10px;
        border-radius: 5px;
        color: #FFF;
        font-weight: 700;
        width: 100%;
        transition: all 0.25s;
    }

    button:hover {
        cursor: pointer;
        box-shadow: 10px 10px 20px black;
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

                <button type="submit">Entrar</button>
            </Form>
        </FormContainer>
    )
}

export default Formulario;