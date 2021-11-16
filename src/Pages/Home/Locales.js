import React,{useEffect,useState,useContext} from 'react';
import { helpHttp } from '../../Helpers/helpHttp';
import LOGOFARMA from '../../Assets/LOGOFARMA.png';
import Loader from '../../Components/Loader';
import FooterSearch from '../../Components/footerSearch';
import DataContext from '../../Context/DataContext';
import ItemUbicacion from '../../Components/itemUbicacion';
import LinksSearch from '../../Components/LinksSearch';

const Locales = () =>{
    /*-----------STATES-----------------*/
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [locations, setLocations] = useState([]);
    const [totalProducts, setTotalProducts] = useState();
    const [moreProducts, setMoreProducts] = useState(false);

    /*-----------Context-----------------*/
    const dataSearch = useContext(DataContext);

    useEffect(() => {
        setLoader(true)
        const form = {
            "keyCode": process.env.REACT_APP_API_KEY_SERVICE,
            "firstResult": page,
            "maxResults": 8,
            "marca":dataSearch.marca,
            "laboratorio": dataSearch.laboratorio,
            "presentacion": dataSearch.presentacion,
            "concentracion":dataSearch.concentracion,
            "departamento":dataSearch.departamento,
            "provincia":dataSearch.provincia,
            "distrito": dataSearch.distrito
        }
        if(dataSearch.laboratorio === "") window.location.href ="/Inicio"
        let options = {
            body: form,
            headers: {"content-type": "application/json"}
        }
        let url = process.env.REACT_APP_API_KEY_LOCALES
        helpHttp().post(url,options).then(res => {
            if(res.errorCode === 0){
                setMessage(res.message)
                let aux = locations.concat(res.locales)
                if(res.locales !== null) setLocations(aux)
                else setMessage(`No se encontro ${dataSearch.producto} en ${dataSearch.provincia}, ${dataSearch.distrito}`)

                ordenarxPrecio();
                setTotalProducts(res.total)
                btnMoreProducts(aux.length,res.total)

                setLoader(false)
            }
        })

    }, [page]);

    const ordenarxPrecio = () =>{
        locations.sort(function (a, b) {
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

    const clickMorePorducts = (e) =>{
        setPage(page+1)
    }

    window.document.body.classList.add('bg-image')
    return(
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
                            <p className="Banner__Text4--sm">Resultados en <strong>{dataSearch.distrito}</strong></p>
                        </div>
                        }
                    </>
                }
                {
                    locations.map(
                        data => 
                        <ItemUbicacion
                            key={data.direccion+data.precio}
                            marca={data.nombreComercial}
                            laboratorio={data.direccion}
                            precio={data.precio}
                        />
                    )
                }
                {
                moreProducts && 
                <div onClick={clickMorePorducts} className="Banner__Option-More-Product center" >VER MAS</div>
                }
                <p className="Banner__Text4--option">{message}</p>
                <FooterSearch/>
            </div>
        </section>
    )
}

export default Locales