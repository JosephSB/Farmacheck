import React from 'react';

const ItemUbicacion = (props) =>{
    return (
        <div className="Banner__ProductsResult">
            
            <div className="Banner__Datos-Ubicacion">
                <p className="Banner__Title4--wrap color-black"><strong>{props.marca}</strong></p>
                <p className="Banner__Text4--sm">{props.laboratorio}</p>
            </div>
            <p className="Banner__Price--sn">
                <strong className="Banner__Title6 ">s/</strong>
                <strong className="Banner__Title4--cyan">{props.precio.toFixed(2)}</strong>
            </p>
            
        </div>
    )
}

export default ItemUbicacion