import styled from "styled-components";
import { Link } from 'react-router-dom';

const LogoEstilizada = styled.span`
    font-size: 28px;
    color: #FFF;
    font-weight: 400;
    cursor: pointer;

    strong {
        font-weight: 700;
        color: #797979;
    }
`

const LinkEstilizado = styled(Link)`
    text-decoration: none;
`

function Logo() {
    return(
        <LinkEstilizado to='/'><LogoEstilizada>Cine<strong>list</strong></LogoEstilizada></LinkEstilizado>
    )
}

export default Logo;