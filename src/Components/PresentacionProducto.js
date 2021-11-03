import React,{useState,useEffect} from 'react';
import {useHistory } from 'react-router-dom';

const PresentacionProducto = (props) =>{
    const [animate, setAnimate] = useState(false);
    const [transition, setTransition] = useState(false);
    let history = useHistory();

    const handleClick = (e) =>{
        props.setDataSearch({
            presentacion: props.presentacion,
            concentracion: e.target.innerHTML
        })
        history.push(`/Precios/${props.product}`)
    }
    const HandleQuiz = (e) =>{
        props.setclose(props.presentacion)
        animate ? setAnimate(false) : setAnimate(true)
        setTimeout(() => {
            transition ? setTransition(false) : setTransition(true)
        }, 50);
    }

    useEffect(() => {
        if(props.close !== props.presentacion){
            animate && setAnimate(false)
            transition && setTransition(false)
        }
    }, [props.close]);

    return(
        <>
            <div className="Option-Product center row space-between padding-lateral" onClick={HandleQuiz}>
                <p>{props.presentacion}</p>
                <i className="fas fa-chevron-down fa-2x"></i>
            </div>
            <div className={`Options-Presentacion center column ${!animate &&'none'} ${transition ? 'traslate0' : ''}`}>
                {props.concentraciones.map(
                    data =>
                    <p 
                    onClick={handleClick}
                    className="size-16 gibson m-10 pointer" 
                    key={data.concentracion+props.presentacion}>
                        {data.concentracion}
                    </p> 
                )}
            </div>
        </>
    )
}

export default PresentacionProducto