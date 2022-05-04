import {useEffect,useState,useContext,Fragment} from 'react';
import { useHistory } from "react-router-dom";
import Loader from '../../../../Components/Loader';
import FooterSearch from '../../../../Components/footerSearch';
import DataContext from '../../../../Context/DataContext';
import ItemUbicacion from '../../../../Components/itemUbicacion';
import { getLocal } from '../../../../services/farma.service';

const Locales = () =>{
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [locations, setLocations] = useState([]);
    const [totalProducts, setTotalProducts] = useState();
    const [moreProducts, setMoreProducts] = useState(false);
    let history = useHistory();
    const dataSearch = useContext(DataContext);

    useEffect(() => {
        setLoader(true)
        const form = {
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
        console.log(form)
        if(dataSearch.laboratorio === "") history.push("/Inicio")

        getLocal(form)
        .then(({data}) => {
            if(data.errorCode === 0){
                let aux = locations.concat(data.locales)
                if(data.locales !== null) setLocations(aux)

                ordenarxPrecio();
                setTotalProducts(data.total)
                btnMoreProducts(aux.length,data.total)
            }
        }).finally( ()=> setLoader(false))

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

    if(loader){
        return <Loader message={"Buscando locales"}/>
    }
    if(locations.length === 0){
        return <p className="Banner__Text4--option">{`No se encontro ${dataSearch.producto} en ${dataSearch.provincia}, ${dataSearch.distrito}`}</p>
    }

    return(
        <Fragment>
                <div className="Banner__InfoSearch">
                    <p className="Banner__Text4--sm">Total de Resultados: {totalProducts}</p>
                    <p className="Banner__Text4--sm">Resultados en <strong>{dataSearch.distrito}</strong></p>
                </div>
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
                <FooterSearch/>
        </Fragment>
    )
}

export default Locales