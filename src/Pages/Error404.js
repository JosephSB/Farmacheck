import React from 'react';
import { useHistory } from "react-router-dom";

const Error404 = () =>{
    let history = useHistory();

    const handleClick = () => history.push("/Inicio");
    return(
        <section className="Banner center column"> 
        <i class="fas fa-exclamation-circle fa-8x color-cyan"></i>
        <span className="Span-Eror404">Oops! That page can’t be found.</span>
        <p className="Banner__Text4">
            Parece que no se encontró nada en esta ubicación.
            <br/>
            Regrese al inicio o intenté con una nueva búsqueda 
        </p>
        <button className="Banner__Button-Ubicacion" onClick={handleClick}>Ir al Inicio</button>

        </section>
    )
}

export default Error404