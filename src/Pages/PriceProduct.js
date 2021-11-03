import React,{useEffect,useState} from 'react';
import LOGOFARMA from '../Assets/LOGOFARMA.png';
import { NavLink,useHistory} from 'react-router-dom';
import {useParams} from 'react-router';
import { helpHttp } from '../Helpers/helpHttp';
import Loader from '../Components/Loader';
import ItemPrice from '../Components/itemPrice';


const PriceProduct = ({dataSearch}) =>{
    /*-----------STATES-----------------*/
    const [prices, setPrices] = useState([]);
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [moreProducts, setMoreProducts] = useState(false);

    /*-----------hooks-----------------*/
    const {product} = useParams();
    let history = useHistory();

    useEffect(() => {
        setLoader(true)
        const form = {
            "keyCode": "aY0Jy2T6b6LLvMfBzI2pI5dPAfcqyvK",
            "firstResult": page,
            "maxResults": 4,
            "producto": product,
            "presentacion" : dataSearch.presentacion,
            "concentracion":dataSearch.concentracion
        }

        let options = {
            body: form,
            headers: {"content-type": "application/json"}
        }
        let url = "http://44.197.85.123:9080/buscador-precios/precios"
        helpHttp().post(url,options).then(res => {
            if(res.errorCode === 0){
                setMessage(res.message)
                if(res.precios !== null) setPrices(prices.concat(res.precios))
                else setMessage(`No se encontro precios del producto ${product} en ${dataSearch.presentacion} de ${dataSearch.concentracion}`)

                setLoader(false)

                if(prices.length < res.total) setMoreProducts(true)
                else setMoreProducts(false)
            }
        })

    }, [page]);

    const goBack = (e) =>{
        history.goBack()
    }
    const clickMorePorducts = (e) =>{
        setPage(page+1)
    }
    return (
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
                {loader && <Loader message={"Buscando Precios..."} />}
                {
                    prices.map(
                        data => 
                        <ItemPrice
                            key={data.laboratorio+data.marca+data.precio}
                            marca={data.marca}
                            laboratorio={data.laboratorio}
                            precio={data.precio}
                        />
                    )
                }
                {
                moreProducts && 
                <div onClick={clickMorePorducts} className="Option-Product center bg-cyan" >VER MAS</div>
                }
                <p className="gibson size-16 textcenter">{message}</p>
            </div>
        </section>
    )
}

export default PriceProduct