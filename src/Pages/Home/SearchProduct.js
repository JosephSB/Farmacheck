import {useEffect,useState,useContext,Fragment } from 'react';
import {useParams} from 'react-router';
import { useHistory } from 'react-router-dom';
import Loader from '../../Components/Loader';
import DataContext from '../../Context/DataContext';
import { getProducts } from '../../services/farma.service';
import WrapperSearch from '../../Components/wrappers/wrapperSearch';

const SearchProduct = () =>{
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [moreProducts, setMoreProducts] = useState(false);
    const dataSearch = useContext(DataContext);
    const {product} = useParams();
    let history = useHistory();

    const BtnMoreProducts = async (totalArreglo,total) =>{
        if(totalArreglo < total) setMoreProducts(true)
        else setMoreProducts(false)
    }

    useEffect(() => {
        setLoader(true)
        const form = {
            "firstResult": page,
            "maxResults": 6,
            "producto": product
        }

        getProducts(form)
        .then(({data}) => {
            if(data.errorCode === 0){
                setMessage(data.message)
                let aux = products.concat(data.productos);
                if(data.productos !== null) setProducts(aux)
                else setMessage(`No se encontró el producto ${product}`)

                BtnMoreProducts(aux.length,data.total)
            }
        }).finally( ()=> setLoader(false) )
 
    }, [page]);

    const handleClick = (e) =>{
        dataSearch.producto = e.target.innerHTML
        history.push("/Detalle")
    }

    const clickMorePorducts = (e) =>setPage(page+1)
    
    if (loader) return <Loader message={"Buscando Productos"} />

    window.document.body.classList.add('bg-image')
    return(
        <WrapperSearch>
            <Fragment>
            {
                products.length > 0 
                    ?
                        <>
                            {
                                products.map(
                                    product => 
                                    <div 
                                    onClick={handleClick} 
                                    key={product.producto}
                                    className="Banner__Option-Product center">
                                        {product.producto}
                                    </div>
                                    )
                            }
                        </>
                    :
                        <p>{message}</p>
                }
                {moreProducts && <div onClick={clickMorePorducts} className="Banner__Option-More-Product center" >VER MAS</div>}
            </Fragment>
        </WrapperSearch>
    )
}

export default SearchProduct