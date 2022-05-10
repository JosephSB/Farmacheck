import React,{useState, useEffect,useContext} from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../Components/Modal";
import LOGOFARMA from '../../Assets/Img/LogoFarmacheck.png';
import DataContext from "../../Context/DataContext";
import { getProducts } from "../../services/farma.service";
import useRecodVoice from "../../hooks/useRecordVoice";

const Home = () =>{
    const [message, setMessage] = useState('');
    const [modal, setModal] = useState(false);
    const [resp, setResp] = useState([]);
    let history = useHistory();
    const dataSearch = useContext(DataContext);
    const { transcript, RecordVoice,loading,compatible } = useRecodVoice();

    const searchInRealTime = () =>{
        const form = {
            "firstResult": 1,
            "maxResults": 4,
            "producto": message
        }
        getProducts(form).then( ({data}) => {
            if(data.errorCode === 0){
                if(data.productos !== null) setResp(data.productos)
                else setResp([{producto : 'No se encuentra ese producto'}])
            }
        })
    }

    useEffect(() => {
        if(transcript) setMessage(transcript)
    }, [transcript]);

    useEffect(() => {
        if(message.length >= 2) searchInRealTime()
        if(message.length < 2) setResp([])
    }, [message]);

    const SearchProduct = (e) =>{
        dataSearch.producto = e.target.dataset.product
        history.push("/Detalle")
    }

    const search = () =>{
        if(message !== "") history.push(`/Products/${message}`);
    }
    const handleChange = (e) => setMessage(e.target.value)
    const handleModal = (e) => setModal(true)

    const handleKeyPress = (e) =>{
        if(e.key === 'Enter') search()
    }

    window.document.body.classList.add('bg-image')
    return(
        <>
            {modal && <Modal setModal={setModal} />}
            <section className="Banner center column">          
                <div className="Banner__Contenido"> 
                    <img className="Banner__Logo" src={LOGOFARMA} alt="FARMACHECK"/>
                    <p className="Banner__Text4">
                        Ingresa aquí para conocer el precio promedio de 3,000 medicamentos que te ayudarán a tomar una decisión de compra informada.
                    </p>
                    <p className=" Banner__Title5 Banner__Title5--Cyan">
                        <strong>¿QUÉ MEDICAMENTO ESTÁS BUSCANDO?</strong>
                    </p>
                    <div className="Banner__Buscador">
                        <input className="Banner__Buscador-Input" type="text" onKeyPress={handleKeyPress}
                        value={message} onChange={handleChange} autoComplete="off"/>
                        <div className="Banner__Buscador-Tools">
                            <i className="fas fa-search" onClick={search}></i>
                            <i className="fas fa-microphone" onClick={RecordVoice}></i>
                        </div>
                    </div>
                    <div className="Select-Search aparecerInvertido">
                        {resp.map
                        (item => 
                            <div className="Option-Search aparecerInvertido" 
                            onClick={SearchProduct} 
                            data-product={item.producto}
                            key={item.producto}
                            >
                                <i className="fas fa-search"></i>&nbsp; {item.producto}
                            </div>
                        )
                        }
                    </div>
                    {loading && <p className="aparecer Error">Escuchando...</p>}
                    {!compatible && <p className="Error">NAVEGADOR NO COMPATIBLE PARA BUSCAR POR VOZ</p>}
                    <p className="Banner__Text6">
                        Al usar este buscador, estás sujeto a nuestros <span className="bor-bottom" onClick={handleModal}>términos y condiciones.</span>
                    </p>
                    <p className="Banner__Text6">
                        Envíanos tus comentarios a <span className="color-cyan">info@farmacheck.pe</span>
                    </p>
                </div>
            </section>
        </>
    )
}

export default Home