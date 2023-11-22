import styled from "styled-components";
import { FaSistrix } from "react-icons/fa6";

const FormEstilizado = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
`

const InputEstilizado = styled.input`
    padding: 20px 12px;
    width: 634px;
    background-color: #454558;
    border: none;
    border-radius: 6px;
    color: #FFFFFF;
    position: relative;
`

const BotaoEstilizado = styled.button`
    background-color: transparent;
    border: none;
    position: absolute;
    cursor: pointer;
    right: 460px;
`

function Form() {
    return (
        <FormEstilizado>
            <InputEstilizado placeholder="Digite o nome de um filme..." />
            <BotaoEstilizado type="submit"><FaSistrix style={{color: '#FFF', fontSize: '22px'}}/></BotaoEstilizado>
        </FormEstilizado>
    )
}

export default Form;