import Formulario from "../../components/Formulario";
import Header from "../../components/Header";
import Titulo from "../../components/Titulo";
import styled from "styled-components";

const LoginContainer = styled.div`
    padding: 3em;
`

function Login() {
    return (
        <div>
            <Header />
            <LoginContainer>
                <Titulo titulo="Login"/>
                <Formulario />
            </LoginContainer>
        </div>
    )
}

export default Login;