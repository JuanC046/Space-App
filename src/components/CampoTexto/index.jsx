import { styled } from "styled-components";
import search from "./search.png";
import { useRef } from "react";
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"

const ContainerEstilizado = styled.div`
    position: relative;
    display: inline-block;
`;

const CampoTextoEstilizado = styled.input`
    height: 56px;
    padding: 12px 16px;
    border-radius: 10px;
    border: 2px solid;
    border-color: #c98cf1;
    background: transparent;
    box-sizing: border-box;
    width: 566px;
    color: #d9d9d9;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    outline: none;
`;

const IconoLupa = styled.img`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 38px !important;
    height: 38px;
    cursor: pointer;
`;

const CampoTexto = () => {
    const CampoBusqueda = useRef(null);
    const { setConsulta } = useContext(GlobalContext)
    return (
        <ContainerEstilizado>
            <CampoTextoEstilizado
                ref={CampoBusqueda}
                type="text"
                placeholder="¿Qué estás buscando?"
            />
            <IconoLupa src={search} alt="ícono de lupa" 
            onClick={() => setConsulta(CampoBusqueda.current.value)}
            />
        </ContainerEstilizado>
    );
};
// CampoTexto.propTypes = {
//     setConsulta: PropTypes.func.isRequired,
// };

export default CampoTexto;
