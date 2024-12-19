import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

function useFotoModal() {
    const { state, dispatch } = useContext(GlobalContext);

    const openFotoModal = (foto) => {
        dispatch({
            type: "SET_FOTO_SELECCIONADA",
            payload: foto,
        });
    };

    const closeFotoModal = () => {
        dispatch({ type: "SET_FOTO_SELECCIONADA", payload: null });
    };

    const isOpenFotoModal = state.abiertoFotoModal;
    const foto = state.fotoSeleccionada;

    return { isOpenFotoModal, foto, openFotoModal, closeFotoModal };
}

export default useFotoModal;
