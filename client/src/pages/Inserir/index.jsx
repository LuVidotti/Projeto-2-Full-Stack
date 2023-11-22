import styled from "styled-components";
import Titulo from "../../components/Titulo";
import Header from "../../components/Header";
import BotaoEnviar from "../../components/BotaoEnviar";

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

    input, textarea {
        display: block;
        margin-bottom: 2em;
        padding: 10px;
        border-radius: 10px;
        border: none;
        width: 95%;
    }
`

const InserirContainer = styled.div`
    padding: 3em;
`

function Inserir() {
    return(
        <div>
            <Header />
            <InserirContainer>
                <Titulo titulo='Adicionar filme'/>
                <FormContainer>
                    <Form>
                        <label htmlFor="nomeFilme">Nome do filme</label>
                        <input type="text" id="nomeFilme"/>

                        <label htmlFor="data">Data de Lançamento</label>
                        <input type="date" id="data" />

                        <label htmlFor="descricao">Descrição</label>
                        <textarea id="descricao" rows="10"></textarea>

                        <BotaoEnviar texto="Adicionar"/>
                    </Form>
                </FormContainer>
            </InserirContainer>
        </div>
    )
}

export default Inserir;