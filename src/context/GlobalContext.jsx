import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";


export const GlobalContext = createContext({});

const GlobalContextProvider = ({ children }) => {
    const [consulta, setConsulta] = useState("");
    const [fotosDeGaleria, setFotosDeGaleria] = useState([]);
    const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
    const alAlternarFavorito = (foto) => {
        if (foto.id === fotoSeleccionada?.id) {
            setFotoSeleccionada({
                ...fotoSeleccionada,
                favorita: !fotoSeleccionada.favorita,
            });
        }
        setFotosDeGaleria(
            fotosDeGaleria.map((fotoDeGaleria) => {
                return {
                    ...fotoDeGaleria,
                    favorita:
                        fotoDeGaleria.id === foto.id
                            ? !foto.favorita
                            : fotoDeGaleria.favorita,
                };
            })
        );
    };
    useEffect(() => {
        const getFotos = async () => {
            const response = await fetch(`${import.meta.env.VITE_API}/fotos`);
            const data = await response.json();
            setFotosDeGaleria([...data]);
        };
        getFotos();
    }, []);
    return (
        <GlobalContext.Provider
            value={{
                consulta,
                setConsulta,
                fotosDeGaleria,
                fotoSeleccionada,
                setFotoSeleccionada,
                alAlternarFavorito,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

GlobalContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalContextProvider;
