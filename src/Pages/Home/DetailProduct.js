import React,{useEffect,useState,useContext} from 'react';
import { useHistory } from "react-router-dom";
import { helpHttp } from '../../Helpers/helpHttp'
import LOGOFARMA from '../../Assets/Img/LOGOFARMA.png';
import Loader from '../../Components/Loader';
import PresentacionProducto from '../../Components/PresentacionProducto';
import DataContext from '../../Context/DataContext';
import LinksSearch from '../../Components/LinksSearch';

const DetailProduct = () =>{
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [close, setClose] = useState('none');

    let history = useHistory();
    
    const dataSearch = useContext(DataContext);
    const product = dataSearch.producto;

    useEffect(() => {
        setLoader(true)
        const form = {
            "keyCode": process.env.REACT_APP_API_KEY_SERVICE,
            "firstResult": 1,
            "maxResults": 10,
            "producto": product
        }
        if(product === "") history.push("/Inicio")
        let options = {
            body: form,
            headers: {"content-type": "application/json"}
        }
        let url = process.env.REACT_APP_API_KEY_DETALLES
        helpHttp().post(url,options).then(res => {
            if(res.errorCode === 0){
                setMessage(res.message)

                if(res.presentaciones !== null ) setData(res.presentaciones)
                else setMessage(`No se encontro mas informacion del producto ${product}`)

                setLoader(false)
                
                if(res.presentaciones.length === 0)setMessage(`No se encontro mas informacion del producto ${product}`)
            }
        })
    }, []);

    window.document.body.classList.add('bg-image')
    return(
        <section className="Banner center column">
            <img className="Banner__Logo" src={LOGOFARMA} alt="FARMACHECK"/>
            <LinksSearch/>
            <div className="Banner__Contenido center column">
                {loader && <Loader message={"Buscando Productos..."} />}
                {
                   data.map(
                       item => 
                       <PresentacionProducto 
                        setDataSearch={dataSearch}
                        close={close} 
                        setclose={setClose}
                        key = {item.presentacion+product}
                        presentacion = {item.presentacion}
                        concentraciones = {item.concentraciones}
                        product={product}
                       />) 
                }
                <p className="Banner__Text4">{message}</p>
            </div>
        </section>
    )
}

export default DetailProduct