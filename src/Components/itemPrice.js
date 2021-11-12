import React,{useContext} from 'react';
import {useHistory} from 'react-router-dom';
import DataContext from '../Context/DataContext';

const ItemPrice = (props) =>{
    const dataSearch = useContext(DataContext);
    let history = useHistory();

    const handleClick = (e) =>{
        dataSearch.marca = props.marca
        dataSearch.laboratorio = props.laboratorio
        history.push("/Ubicacion")
    }

    return (
        <div className="max-width center column relative m-10">
            <div className="Content-Products center row space-between m-top">
                <div className=" Box-ProductDetail center wrap space-between">
                    <div className="Datos-Product column">
                        <p className="Text-ProductName size-26 gib-bol m-none"><strong>{props.marca}</strong></p>
                        <p className="gibson m-none">{props.laboratorio}</p>
                    </div>
                    <p className="gibson m-none">
                        <strong className="size-26 ">s/</strong>
                        <strong className="size-26 color-cyan">{props.precio.toFixed(2)}</strong>
                    </p>
                </div>
                <span className="Item-Locate center" onClick={handleClick}>
                    <i className="fas fa-map-marker-alt"></i>
                </span>  
            </div>
            
        </div>
    )
}

export default ItemPrice

/*
            <div className="Content-Products center btn-verLugares">
                Ver lugares de compra
            </div>*/