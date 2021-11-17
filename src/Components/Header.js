import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import LogoApeps from '../Assets/Img/LOGO APEPS.png';
import LogoAPESEG from '../Assets/Img/LOGO APESEG.png';
import	'../Styles/Header.css';

const Header = () =>{
    const [iconResp, setIconResp] = useState(true);

    const handleClick = (e) =>{
        iconResp? setIconResp(false) : setIconResp(true)
    }

    return(
        <header className="Header center row">
            <div className="Box-Tools center row start">
                <div className="Box-Marcas row">
                    <a href="https://www.apeseg.org.pe/" className="Img-Marcas" target="_blank" rel="noreferrer">
                        <img className="max-width" src={LogoAPESEG} alt="APESEG"/>
                    </a>
                    <a href="http://www.apeps.org.pe/" className="Img-Marcas" target="_blank" rel="noreferrer">
                        <img className="max-width" src={LogoApeps} alt="APEPS"/>
                    </a>
                </div>
                <div className="bar-responsive" onClick={handleClick}>
                    <i className={`fas ${iconResp?'fa-bars':'fa-times'} fa-2x color-grey`}></i>
                </div>
            </div>
            <nav className={`Menu center space-between ${!iconResp?'traslate0':''}`}>
                <NavLink onClick={handleClick} className="Menu-link" exact to="/Inicio" activeClassName="ACTIVE">
                    INICIO
                </NavLink>
                <NavLink onClick={handleClick} className="Menu-link" exact to="/Informacion" activeClassName="ACTIVE">
                    ¿QUE ES FARMACHECK?
                </NavLink>
                <NavLink onClick={handleClick} className="Menu-link" exact to="/Reportes" activeClassName="ACTIVE">
                    REPORTE TRIMESTRAL
                </NavLink>
                <NavLink onClick={handleClick} className="Menu-link" exact to="/Datos" activeClassName="ACTIVE">
                    DATOS ABIERTOS
                </NavLink>
            </nav>
        </header>
    )
}

export default Header