import React from 'react';

const ItemPrice = (props) =>{
    return (
        <div className="max-width center column relative m-10">
            <div className="Content-Products product-responsive center row wrap space-between m-top">
                <div className="Datos-Product column">
                    <p className="size-26 gib-bol m-none"><strong>{props.marca}</strong></p>
                    <p className="gibson m-none">{props.laboratorio}</p>
                </div>
                <p className="gibson m-none">
                    <strong className="size-26 ">s/</strong>
                    <strong className="size-26 color-cyan">{props.precio.toFixed(2)}</strong>
                </p>
                <span className="Item-Locate center">
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