import { useEffect, useState, useContext,Fragment } from 'react';
import { useHistory } from "react-router-dom";
import Loader from '../../Components/Loader';
import ItemPrice from '../../Components/itemPrice';
import DataContext from '../../Context/DataContext';
import FooterSearch from '../../Components/footerSearch';
import { getPriceByProduct } from '../../services/farma.service';
import WrapperSearch from '../../Components/wrappers/wrapperSearch';

const PriceProduct = () => {
    const [prices, setPrices] = useState([]);
    const [totalProducts, setTotalProducts] = useState();
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [moreProducts, setMoreProducts] = useState(false);
    let history = useHistory();
    const { producto, presentacion, concentracion } = useContext(DataContext);


    const ordenarxPrecio = () => {
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

    const btnMoreProducts = (auxtotal, total) => {
        if (auxtotal < total) setMoreProducts(true)
        else setMoreProducts(false)
    }

    useEffect(() => {
        setLoader(true)
        const form = {
            "firstResult": page,
            "maxResults": 4,
            "producto": producto,
            "presentacion": presentacion,
            "concentracion": concentracion
        }
        if (producto === "") history.push("/Inicio")

        getPriceByProduct(form)
            .then(({ data }) => {
                if (data.errorCode === 0) {
                    setMessage(data.message)
                    let aux = prices.concat(data.precios)
                    if (data.precios !== null) setPrices(aux)
                    else setMessage(`No se encontro precios del producto ${producto} en ${presentacion} de ${concentracion}`)

                    ordenarxPrecio();
                    setTotalProducts(data.total)
                    btnMoreProducts(aux.length, data.total)
                }
            }).finally(() => setLoader(false))

    }, [page]);

    const clickMorePorducts = (e) => {
        setPage(page + 1)
    }

    if (loader) {
        return <WrapperSearch><Loader message={"Buscando Precios"} /></WrapperSearch>
    }

    window.document.body.classList.add('bg-image')
    return (
        <WrapperSearch>
            <Fragment>
                <div className="Banner__InfoSearch">
                    <p className="Banner__Text4--sm">Total de Resultados: {totalProducts}</p>
                    <p className="Banner__Text4--sm">*Precios promedio referenciales</p>
                </div>
                {
                    prices.map(
                        data =>
                            <ItemPrice
                                key={data.laboratorio + data.marca + data.precio}
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
                <FooterSearch />
            </Fragment>
        </WrapperSearch>
    )
}

export default PriceProduct