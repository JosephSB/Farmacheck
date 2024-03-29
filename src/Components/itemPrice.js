import React,{useContext,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import DataContext from '../Context/DataContext';

const ItemPrice = (props) =>{
    const span = useRef(null);
    const dataSearch = useContext(DataContext);
    let history = useHistory();

    const handleClick = (e) =>{
        dataSearch.marca = props.marca
        dataSearch.laboratorio = props.laboratorio
        //setModal(true)
        history.push("/locales")
    }

    const activeSpan = ()=> {
        span.current.classList.toggle("none")
        setTimeout(() => {
            span.current.classList.toggle("none")
        }, 4000);
    }
    return (
        <div className="Banner__ProductsResult center row">
            <div className="Banner__Box-ProductDetail">
                <div className="Banner__Datos-Product">
                    <p className="Banner__Title4--wrap" 
                    onClick={activeSpan}
                    title={props.marca}>
                        <strong>{props.marca}</strong>
                    </p>
                    <p className="Banner__Text4--sm">{props.laboratorio}</p>
                </div>
                <span className="SpanProduct none aparecer" ref={span}>{props.marca}</span>
                <p className="Banner__Price">
                    <strong className="Banner__Title6">s/</strong>
                    <strong className="Banner__Title4--cyan">{props.precio.toFixed(2)}</strong>
                </p>
            </div>
            <span className="Banner__Item-Ubicacion center" onClick={handleClick}>
                <i className="fas fa-map-marker-alt"></i>
            </span>  
        </div>
    )
}

export default ItemPrice
