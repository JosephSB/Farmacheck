import React,{useEffect,useState,useContext} from 'react';
import { NavLink,useHistory} from 'react-router-dom';
import { helpHttp } from '../../Helpers/helpHttp';
import LOGOFARMA from '../../Assets/LOGOFARMA.png';
import Loader from '../../Components/Loader';
import FooterSearch from '../../Components/footerSearch';
import DataContext from '../../Context/DataContext';
import ItemUbicacion from '../../Components/itemUbicacion';

const Locales = () =>{
    /*-----------STATES-----------------*/
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [locations, setLocations] = useState([]);
    const [totalProducts, setTotalProducts] = useState();
    const [moreProducts, setMoreProducts] = useState(false);
    /*-----------hooks-----------------*/
    let history = useHistory();

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
    const goBack = (e) =>{
        history.goBack()
    }
    const clickMorePorducts = (e) =>{
        setPage(page+1)
    }

    window.document.body.classList.add('bg-image')
    return(
        <section className="Banner center column pad-responsive">
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
                            <p className="color-grey m-none size-16 gibson">Resultados en <strong>{dataSearch.distrito}</strong></p>
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
                <div onClick={clickMorePorducts} className="Option-Product center bg-cyan" >VER MAS</div>
                }
                <p className="gibson size-16 textcenter">{message}</p>
                <FooterSearch/>
            </div>
        </section>
    )
}

export default Locales