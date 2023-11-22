import styled from "styled-components";
import Logo from "../Logo";
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
    padding: 32px;
    background-color: #1D1C3B;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const LinksContainer = styled.div`
    display: flex;
    gap: 2em;
`

const LinkEstilizado = styled(Link)`
    text-decoration: none;
    color: #FFF;
    font-size: 18px;
    font-weight: 500;

    &:hover {
        color: #2828d8;
    }
`

function Header() {
    return(
        <HeaderContainer>
            <Logo />
            <LinksContainer>
                <LinkEstilizado to='/login'>Login</LinkEstilizado>
                <LinkEstilizado to='/inserir'>Adicionar filme</LinkEstilizado>
            </LinksContainer>
        </HeaderContainer>
    )
}

export default Header;