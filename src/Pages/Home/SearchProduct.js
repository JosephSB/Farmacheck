import React,{useEffect,useState,useContext } from 'react';
import LOGOFARMA from '../../Assets/Img/LOGOFARMA.png';
import {useParams} from 'react-router';
import { useHistory } from 'react-router-dom';
import { helpHttp } from '../../Helpers/helpHttp';
import Loader from '../../Components/Loader';
import DataContext from '../../Context/DataContext';
import LinksSearch from '../../Components/LinksSearch';


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
            "keyCode": process.env.REACT_APP_API_KEY_SERVICE,
            "firstResult": page,
            "maxResults": 6,
            "producto": product
        }
        let options = {
            body: form,
            headers: {"content-type": "application/json"}
        }

        let url = process.env.REACT_APP_API_KEY_PRODUCTS
        helpHttp().post(url,options).then(res => {
            if(res.errorCode === 0){
                setMessage(res.message)
                let aux = products.concat(res.productos);
                if(res.productos !== null) setProducts(aux)
                else setMessage(`No se Encontro el producto ${product}`)

                BtnMoreProducts(aux.length,res.total)

                setLoader(false)
            }
        })
 
    }, [page]);

    const handleClick = (e) =>{
        dataSearch.producto = e.target.innerHTML
        history.push("/Detalle")
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
                {loader && <Loader message={"Buscando Productos..."} />}
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
            </div>
        </section>
    )
}

export default SearchProduct