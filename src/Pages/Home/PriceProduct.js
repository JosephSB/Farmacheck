import React,{useEffect,useState,useContext} from 'react';
import { useHistory } from "react-router-dom";
import { helpHttp } from '../../Helpers/helpHttp';
import LOGOFARMA from '../../Assets/Img/LOGOFARMA.png';
import Loader from '../../Components/Loader';
import ItemPrice from '../../Components/itemPrice';
import DataContext from '../../Context/DataContext';
import FooterSearch from '../../Components/footerSearch';
import LinksSearch from '../../Components/LinksSearch';


const PriceProduct = () =>{
    /*-----------STATES-----------------*/
    const [prices, setPrices] = useState([]);
    const [totalProducts, setTotalProducts] = useState();
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [moreProducts, setMoreProducts] = useState(false);

    let history = useHistory();

    /*-----------Context-----------------*/
    const {producto,presentacion,concentracion}= useContext(DataContext);


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
            "producto": producto,
            "presentacion" :presentacion,
            "concentracion":concentracion
        }
        if(producto === "") history.push("/Inicio")
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
                else setMessage(`No se encontro precios del producto ${producto} en ${presentacion} de ${concentracion}`)

                ordenarxPrecio();
                setTotalProducts(res.total)
                btnMoreProducts(aux.length,res.total)

                setLoader(false)
            }
        })

    }, [page]);

    const clickMorePorducts = (e) =>{
        setPage(page+1)
    }
    
    window.document.body.classList.add('bg-image')
    return (
        <section className="Banner center column">
            <img className="Banner__Logo" src={LOGOFARMA} alt="FARMACHECK"/>
            <LinksSearch/>
            <div className="Banner__Contenido center column">
                {loader 
                    ? 
                    <Loader message={"Buscando Precios..."}/>
                    :
                    <>
                        {
                        <div className="Banner__InfoSearch">
                            <p className="Banner__Text4--sm">Total de Resultados: {totalProducts}</p>
                            <p className="Banner__Text4--sm">*Precios promedio referenciales</p>
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
                <div onClick={clickMorePorducts} className="Banner__Option-More-Product center">VER MAS</div>
                }
                <p className="Banner__Text4--option">{message}</p>
                <FooterSearch/>
            </div>
        </section>
    )
}

export default PriceProduct