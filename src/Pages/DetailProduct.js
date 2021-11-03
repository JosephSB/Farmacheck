import React,{useEffect,useState} from 'react';
import LOGOFARMA from '../Assets/LOGOFARMA.png';
import {useParams} from 'react-router';
import { NavLink,useHistory } from 'react-router-dom';
import { helpHttp } from '../Helpers/helpHttp';
import Loader from '../Components/Loader';
import PresentacionProducto from '../Components/PresentacionProducto';

const DetailProduct = ({setDataSearch}) =>{
    const {product} = useParams();
    let history = useHistory();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [close, setClose] = useState('none');

    useEffect(() => {
        setLoader(true)
        const form = {
            "keyCode": "aY0Jy2T6b6LLvMfBzI2pI5dPAfcqyvK",
            "firstResult": 1,
            "maxResults": 10,
            "producto": product
        }
        let options = {
            body: form,
            headers: {"content-type": "application/json"}
        }
        let url = "http://44.197.85.123:9080/buscador-precios/detalle"
        helpHttp().post(url,options).then(res => {
            if(res.errorCode === 0){
                setMessage(res.message)
                if(res.presentaciones !== null || res.presentaciones.length !== 0) setData(res.presentaciones)
                else setMessage(`No se encontro mas informacion del producto ${product}`)
                setLoader(false)
                if(res.presentaciones.length === 0)setMessage(`No se encontro mas informacion del producto ${product}`)
            }
        })
    }, []);

    const goBack = (e) =>{
        history.goBack()
    }

    return(
        <section className="Banner center column pad-responsive height-none p-top">
            <img className="Banner-Img" src={LOGOFARMA} alt="FARMACHECK"/>
            <div className="center row wrap max-width m-top">
                <button className="Btn-Back center btn-defaul" onClick={goBack}>
                    Regresar
                </button>
                <NavLink className="Btn-Back center" exact to="/Inicio">
                    Realizar otra busqueda
                </NavLink>
            </div>
            <div className="Content-Products center column">
                {loader && <Loader message={"Buscando Productos..."} />}
                {
                   data.map(
                       item => 
                       <PresentacionProducto 
                        setDataSearch={setDataSearch}
                        close={close} 
                        setclose={setClose}
                        key = {item.presentacion+product}
                        presentacion = {item.presentacion}
                        concentraciones = {item.concentraciones}
                        product={product}
                       />) 
                }
                <p className="gibson size-16 textcenter">{message}</p>
            </div>
        </section>
    )
}

export default DetailProduct