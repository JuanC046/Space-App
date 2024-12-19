import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext({});

const initialState = {
    consulta: "",
    fotosDeGaleria: [],
    fotoSeleccionada: null,
    abiertoFotoModal: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_CONSULTA":
            return {
                ...state,
                consulta: action.payload,
            };
        case "SET_FOTOS_DE_GALERIA":
            return {
                ...state,
                fotosDeGaleria: action.payload,
            };
        case "SET_FOTO_SELECCIONADA":
            return {
                ...state,
                fotoSeleccionada: action.payload,
                abiertoFotoModal: action.payload !== null? true : false,
            };
        case "ALTERNAR_FAVORITO": {
            const fotosDeGaleria = state.fotosDeGaleria.map((fotoDeGaleria) => {
                return {
                    ...fotoDeGaleria,
                    favorita:
                        fotoDeGaleria.id === action.payload.id
                            ? !action.payload.favorita
                            : fotoDeGaleria.favorita,
                };
            });
            if (action.payload.id === state.fotoSeleccionada?.id) {
                return {
                    ...state,
                    fotoSeleccionada: {
                        ...state.fotoSeleccionada,
                        favorita: !state.fotoSeleccionada.favorita,
                    },
                    fotosDeGaleria,
                };
            } else {
                return {
                    ...state,
                    fotosDeGaleria,
                };
            }
        }
        default:
            return state;
    }
};

const GlobalContextProvider = ({ children }) => {
    // const [consulta, setConsulta] = useState("");
    // const [fotosDeGaleria, setFotosDeGaleria] = useState([]);
    // const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

    // const alAlternarFavorito = (foto) => {
    //     if (foto.id === fotoSeleccionada?.id) {
    //         setFotoSeleccionada({
    //             ...fotoSeleccionada,
    //             favorita: !fotoSeleccionada.favorita,
    //         });
    //     }
    //     setFotosDeGaleria(
    //         fotosDeGaleria.map((fotoDeGaleria) => {
    //             return {
    //                 ...fotoDeGaleria,
    //                 favorita:
    //                     fotoDeGaleria.id === foto.id
    //                         ? !foto.favorita
    //                         : fotoDeGaleria.favorita,
    //             };
    //         })
    //     );
    // };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const getFotos = async () => {
            const response = await fetch(`${import.meta.env.VITE_API}/fotos`);
            const data = await response.json();
            // setFotosDeGaleria([...data]);
            dispatch({ type: "SET_FOTOS_DE_GALERIA", payload: data });
        };
        getFotos();
    }, []);
    return (
        <GlobalContext.Provider
            value={{
                state,
                dispatch,
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
