import {useEffect,useState,useContext,Fragment} from 'react';
import { useHistory } from "react-router-dom";
import Loader from '../../Components/Loader';
import PresentacionProducto from '../../Components/PresentacionProducto';
import DataContext from '../../Context/DataContext';
import WrapperSearch from '../../Components/wrappers/wrapperSearch';
import { getDetailProduct } from '../../services/farma.service';

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
            "firstResult": 1,
            "maxResults": 10,
            "producto": product
        }
        if(product === "") history.push("/Inicio")
        getDetailProduct(form)
        .then(({data}) => {
            if(data.errorCode === 0){
                setMessage(data.message)
                if(data.presentaciones !== null ) setData(data.presentaciones)
                else setMessage(`No se encontro mas información del producto ${product}`)
                if(data.presentaciones.length === 0)setMessage(`No se encontro mas información del producto ${product}`)
            }
        }).finally( ()=> setLoader(false) )
    }, []);

    if(loader){
        return <WrapperSearch><Loader message={"Buscando Productos"} /></WrapperSearch>
    }
    if(data.length === 0){
        return <WrapperSearch><p className="Banner__Text4">{message}</p></WrapperSearch>
    }

    window.document.body.classList.add('bg-image')
    return(
        <WrapperSearch>
            <Fragment>
                <div className="max-width textstart">
                    <p className="Banner__Text6--sm">Producto: <strong>{product}</strong></p> 
                </div>
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
            </Fragment>
        </WrapperSearch>
    )
}

export default DetailProduct