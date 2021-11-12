import React from 'react';

const ItemUbicacion = (props) =>{
    return (
        <div className="max-width center column relative m-10">
            <div className="Content-Products center row space-between">
                <div className="max-width center wrap space-between">
                    <div className="Datos-Product column">
                        <p className="Text-ProductName size-26 gib-bol m-none"><strong>{props.marca}</strong></p>
                        <p className="SubText gibson m-none">{props.laboratorio}</p>
                    </div>
                    <p className="gibson m-none">
                        <strong className="size-26 ">s/</strong>
                        <strong className="size-26 color-cyan">{props.precio.toFixed(2)}</strong>
                    </p>
                </div>
            </div>
            
        </div>
    )
}

export default ItemUbicacion