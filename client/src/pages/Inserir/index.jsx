import styled from "styled-components";
import Titulo from "../../components/Titulo";
import Header from "../../components/Header";
import BotaoEnviar from "../../components/BotaoEnviar";
import axios from 'axios';
import { useState, useEffect } from "react";
import MensagemSucesso from "../../components/MensagemSucesso";
import MensagemErro from "../../components/MensagemErro";
import io from "socket.io-client";
import NotificacaoSocket from "../../components/NotificacaoSocket";

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
    const [nomeFilme, setNomeFilme] = useState('');
    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [socketListener, setSocketListener] = useState(null);
    const [notificacaoTexto, setNotificacaoTexto] = useState('');
    const [mostrarNotificacao, setMostrarNotificacao] = useState(false);

    async function adicionarFilme(e) {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');

            const resposta = await axios.post('http://localhost:3001/api/filmes', {
                nome: nomeFilme,
                dataLancamento: data,
                descricao: descricao 
            }, {
                headers: {
                    Authorization: token
                }
            })
            socketListener.emit("filme_adicionado", ({message: "Um filme acabou de ser adicionado!!!"}));

            setMensagemSucesso(resposta.data.message);

            setTimeout(() => {
                setMensagemSucesso('');
            }, 5000);
        } catch(erro){
            setMensagemErro(erro.response.data[0].message);
        }
    }

    useEffect(() => {
        const socket = io.connect("http://localhost:3001");
        setSocketListener(socket);

        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        if(socketListener) {
            socketListener.on("gerar_notificacao", (mensagem) => {
                setNotificacaoTexto(mensagem.notificacao.message);
                setMostrarNotificacao(true);

                setTimeout(() => {
                    setMostrarNotificacao(false);
                }, 5000);
            })
        }

        return () => {
            if (socketListener) {
                socketListener.off("gerar_notificacao");
            }
        };
    }, [socketListener]);

    return(
        <div>
            <Header />
            <InserirContainer>
                {
                    mostrarNotificacao ? <NotificacaoSocket texto={notificacaoTexto}/> : null
                }
                <Titulo titulo='Adicionar filme'/>
                {
                    mensagemSucesso !== '' ? <MensagemSucesso texto={mensagemSucesso}/> : null
                }
                {
                    mensagemErro !== '' ? <MensagemErro texto={mensagemErro}/> : null
                }
                <FormContainer>
                    <Form onSubmit={(e) => adicionarFilme(e)}>
                        <label htmlFor="nomeFilme">Nome do filme</label>
                        <input type="text" id="nomeFilme" required onChange={(e) => setNomeFilme(e.target.value)}/>

                        <label htmlFor="data">Data de Lançamento</label>
                        <input type="date" id="data" required onChange={(e) => setData(e.target.value)}/>

                        <label htmlFor="descricao">Descrição</label>
                        <textarea id="descricao" rows="10" required onChange={(e) => setDescricao(e.target.value)}></textarea>

                        <BotaoEnviar texto="Adicionar"/>
                    </Form>
                </FormContainer>
            </InserirContainer>
        </div>
    )
}

export default Inserir;