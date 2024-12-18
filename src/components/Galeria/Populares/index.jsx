import { styled } from "styled-components"
import Titulo from "../../Titulo"
import { useEffect, useState } from "react";

// import fotos from './fotos-populares.json'

const ColumnaFotos = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const Imagen = styled.img`
    max-width: 212px;
    border-radius: 20px;
`

const Boton = styled.button`
    background-color: transparent;
    color: #fff;
    border: 2px solid;
    border-color: #C98CF1;
    padding: 12px 20px;
    font-size: 20px;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;
    margin-top: 16px;
`;

const Populares = () => {
    const [fotos, setFotos] = useState([])
    useEffect(() => {
        const getFotos = async () => {
            const response = await fetch(`${import.meta.env.VITE_API}/populares`)
            const data = await response.json()
            setFotos([...data])
        }
        getFotos()
    }, [])
    return (
        <section>
            <Titulo $align='center'>Populares</Titulo>
            <ColumnaFotos>
                {fotos.map(foto => <Imagen key={foto.id} src={foto.path} alt={foto.alt}/>)}
            </ColumnaFotos>
            <Boton>Ver más</Boton>
        </section>
    )
}

export default Populares