import PropTypes from "prop-types";
import styled from "styled-components";
import Titulo from "../Titulo";
import Populares from "./Populares";
import Tag from "./Tags";
import Imagen from "./Imagen";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const GaleriaContainer = styled.div`
    display: flex;
    gap: 24px;
`;

const SeccionFluida = styled.section`
    flex-grow: 1;
`;
const ImagenesContainer = styled.section`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
`;

const Galeria = () => {
    const { fotosDeGaleria, consulta, setFotoSeleccionada, alAlternarFavorito } =
        useContext(GlobalContext);
    const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    return fotosDeGaleria.length == 0 ? (
        <p
            style={{
                color: "white",
                fontSize: "20px",
                textAlign: "center",
            }}
        >
            Cargando...
        </p>
    ) : (
        <>
            <Tag />
            <GaleriaContainer>
                <SeccionFluida>
                    <Titulo>Navegue por la galería</Titulo>
                    <ImagenesContainer>
                        {fotosDeGaleria
                            .filter(
                                (foto) =>
                                    normalizeString(
                                        foto.titulo.toLowerCase()
                                    ) === "" ||
                                    normalizeString(
                                        foto.titulo.toLowerCase()
                                    ).includes(
                                        normalizeString(consulta.toLowerCase())
                                    )
                            )
                            .map((foto) => (
                                <Imagen
                                    alAlternarFavorito={alAlternarFavorito}
                                    alSolicitarZoom={foto => setFotoSeleccionada(foto)}
                                    key={foto.id}
                                    foto={foto}
                                />
                            ))}
                    </ImagenesContainer>
                </SeccionFluida>
                <Populares />
            </GaleriaContainer>
        </>
    );
};

// Galeria.propTypes = {
//     fotos: PropTypes.array.isRequired,
//     alSeleccionarFoto: PropTypes.func.isRequired,
//     alAlternarFavorito: PropTypes.func.isRequired,
//     consulta: PropTypes.string.isRequired,
// };
export default Galeria;
