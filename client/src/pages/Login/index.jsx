import Formulario from "../../components/Formulario";
import Header from "../../components/Header";
import Titulo from "../../components/Titulo";
import styled from "styled-components";
import axios from 'axios';
import { useState } from 'react';
import MensagemErro from "../../components/MensagemErro";
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
    padding: 3em;
`

function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState([]);

    const navegar = useNavigate();

    function enviarForm(e) {
        e.preventDefault();

        axios.post('http://localhost:3001/api/usuarios/login', {
            usuario: usuario,
            senha: senha
        }).then((resposta) => {
            localStorage.setItem('token', resposta.data.token);
            navegar('/');
        }).catch((erro) => {
            setMensagemErro(erro.response.data);
        })
    }

    return (
        <div>
            <Header />
            <LoginContainer>
                <Titulo titulo="Login"/>
                {
                    mensagemErro.length > 0 ? mensagemErro.map((mensagem, index) => <MensagemErro texto={mensagem} key={index}/>)
                    : null
                }
                <Formulario setUsuario={setUsuario} setSenha={setSenha} enviarForm={enviarForm}/>
            </LoginContainer>
        </div>
    )
}

export default Login;