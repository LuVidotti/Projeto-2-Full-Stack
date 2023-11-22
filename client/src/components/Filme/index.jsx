import styled from "styled-components";

const FilmeEstilizado = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1D1C3B;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0.3335185647010803px 0.24931815266609192px 2.4224610328674316px 0px #00000007;
    box-shadow: 1.4366953372955322px 1.0739859342575073px 4.567187309265137px 0px #0000000C;
    box-shadow: 3.4634618759155273px 2.5890731811523438px 7.6376953125px 0px #00000010;
    box-shadow: 6.567749977111816px 4.909649848937988px 12.837499618530273px 0px #00000013;
    box-shadow: 10.903491020202637px 8.150785446166992px 21.3701171875px 0px #00000016; 
    box-shadow: 16.624616622924805px 12.42755126953125px 34.439064025878906px 0px #0000001A;
    box-shadow: 23.885059356689453px 17.85501480102539px 53.24785232543945px 0px #0000001F;
    box-shadow: 32.838748931884766px 24.548248291015625px 79px 0px #00000026;
    gap: 3em;
    width: 70%;
`

const Titulo = styled.h2`
    font-weight: 500;
    color: white;
`

const Descricao = styled.p`
    width: 50%;
    color: #ACACAC;
    line-height: 24px;
`

const Data = styled.h4`
    
`

function Filme() {
    return(
        <FilmeEstilizado>
            <Titulo>Missao impossivel</Titulo>
            <Data>22/12/2003</Data>
            <Descricao>paksdhnjfashjdklfjsadlkfjlskdfjlskjflasjfa;sljfl;asjflasjdflasdjfl</Descricao>
        </FilmeEstilizado>
    )
}

export default Filme;