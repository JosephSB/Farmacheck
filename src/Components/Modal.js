import React from 'react';

const Modal = (props) => {

    const handleClick = () =>{
        props.setModal(false)
    }
    return(
        <div className="Content-Modal center">
            <div className="Modal">
                <p className="Modal-parraf">
                    FarmaCheck es un buscador de precios referenciales de medicamentos que te ayudará a tomar una decisión de compra informada.
                </p>
                <p className="Modal-parraf">
                    Los precios presentados corresponden al promedio reportado por boticas y farmacias.
                </p>
                <p className="Modal-parraf">
                    Encontrarás varias opciones de diferentes laboratorios.
                </p>
                <p className="Modal-parraf">
                    FarmaCheck es una iniciativa de la Asociación de EPS (APEPS) y la Asociación Peruana de Empresas de Seguros (APESEG) por brindan información oportuna y transparente al público que busca medicinas a precios competitivos.
                </p>
                <i className="fas fa-times cros-modal" onClick={handleClick}></i>
            </div>
        </div>
    )
}

export default Modal