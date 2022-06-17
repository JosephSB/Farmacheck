import React from 'react';
import { NavLink,useHistory } from 'react-router-dom';

const LinksSearch = () =>{
    let history = useHistory();
    
    const goBack = (e) =>{
        history.goBack()
    }
    return(
        <div className="Banner__Links center row wrap">
            <button className="Banner__Btn-Back center" onClick={goBack}>
                Regresar
            </button>
            <NavLink className="Banner__Btn-Back center" exact to="/Inicio" activeClassName="ACTIVE">
                Realizar otra búsqueda
            </NavLink>
        </div>
    )
}

export default LinksSearch