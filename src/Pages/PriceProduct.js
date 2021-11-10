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
    const [totalProducts, setTotalProducts] = useState();
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [moreProducts, setMoreProducts] = useState(false);

    /*-----------hooks-----------------*/
    const {product} = useParams();
    let history = useHistory();


    const ordenarxPrecio = () =>{
        prices.sort(function (a, b) {
            if (a.precio > b.precio) {
              return 1;
            }
            if (a.precio < b.precio) {
              return -1;
            }
            return 0;
          });
    }

    const btnMoreProducts = (auxtotal, total) =>{
        if(auxtotal < total) setMoreProducts(true)
        else setMoreProducts(false)
    }

    useEffect(() => {
        setLoader(true)
        const form = {
            "keyCode": process.env.REACT_APP_API_KEY_SERVICE,
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
        let url = process.env.REACT_APP_API_KEY_PRECIOS
        helpHttp().post(url,options).then(res => {
            if(res.errorCode === 0){
                setMessage(res.message)
                let aux = prices.concat(res.precios)
                if(res.precios !== null) setPrices(aux)
                else setMessage(`No se encontro precios del producto ${product} en ${dataSearch.presentacion} de ${dataSearch.concentracion}`)

                ordenarxPrecio();
                setTotalProducts(res.total)
                btnMoreProducts(aux.length,res.total)

                setLoader(false)
            }
        })

    }, [page]);

    const goBack = (e) =>{
        history.goBack()
    }
    const clickMorePorducts = (e) =>{
        setPage(page+1)
    }
    const handleExternalLink = (e) =>{
        window.location.href = 'mailto:info@farmacheck.pe'; 
        return null;
    }

    return (
        <section className={`Banner center column pad-responsive ${prices.length >10 && "height-none"} p-top`}>
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
                {loader 
                    ? 
                    <Loader message={"Buscando Precios..."}/>
                    :
                    <>
                        {
                        <div className="max-width center column start-y">
                            <p className="color-grey m-none size-16 gibson">Total de Resultados: {totalProducts}</p>
                            <p className="color-grey m-none size-16 gibson">*Precios promedio referenciales</p>
                        </div>
                        }
                    </>
                }
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
                <div className="max-width center column">
                    <p className="color-grey m-none size-16 gibson">
                        <i className="fas fa-info-circle color-cyan"></i>
                        Envíanos tus comentarios a
                        </p>
                    <p onClick={handleExternalLink} className="color-cyan m-none size-16 gibson">info@FarmaCheck.pe</p>
                </div>
            </div>
        </section>
    )
}

export default PriceProduct