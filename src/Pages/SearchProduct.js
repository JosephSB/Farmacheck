import React,{useEffect,useState} from 'react';
import LOGOFARMA from '../Assets/LOGOFARMA.png';
import {useParams} from 'react-router';
import { NavLink,useHistory } from 'react-router-dom';
import { helpHttp } from '../Helpers/helpHttp';
import Loader from '../Components/Loader';


const SearchProduct = () =>{
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState();
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [moreProducts, setMoreProducts] = useState(false);
    const {product} = useParams();
    let history = useHistory();

    const btnMoreProducts = (auxtotal) =>{
        if(auxtotal < totalProducts) setMoreProducts(true)
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
                if(res.productos !== null) setProducts(products.concat(res.productos))
                else setMessage(`No se Encontro el producto ${product}`)

                setTotalProducts(res.total)
                btnMoreProducts(products.length)

                setLoader(false)
            }
        })
 
    }, [page]);

    const handleClick = (e) =>{
        history.push(`/Detalle/${e.target.innerHTML}`)
    }

    const clickMorePorducts = (e) =>{
        setPage(page+1)
    }

    return(
        <section className={`Banner center column pad-responsive ${totalProducts > 10 && "height-none p-top"}`}>
            <img className="Banner-Img" src={LOGOFARMA} alt="FARMACHECK"/>
            <div className="center row wrap max-width m-top">
                <NavLink className="Btn-Back center" exact to="/Inicio" activeClassName="ACTIVE">
                    Regresar
                </NavLink>
                <NavLink className="Btn-Back center" exact to="/Inicio" activeClassName="ACTIVE">
                    Realizar otra busqueda
                </NavLink>
            </div>
            <div className="Content-Products center column">
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
                                    className="Option-Product center">
                                        {product.producto}
                                    </div>
                                    )
                            }
                        </>
                    :
                        <p>{message}</p>
                }
                {moreProducts && <div onClick={clickMorePorducts} className="Option-Product center bg-cyan" >VER MAS</div>}
            </div>
        </section>
    )
}

export default SearchProduct