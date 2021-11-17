import React,{useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Modal from "../../Components/Modal";
import LOGOFARMA from '../../Assets/Img/LOGOFARMA.png';

const Home = () =>{
    /*-----------STATES-----------------*/
    const [message, setMessage] = useState('');
    const [modal, setModal] = useState(false);
    const [animateSpeak, setAnimateSpeak] = useState(false);
    const [compatible, setCompatible] = useState(true);

    /*-----hooks------*/
    let history = useHistory();
    /*-----hook para escuchar microfono------*/
    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const RecordVoice = (e) =>{
        if (!browserSupportsSpeechRecognition) {
            setCompatible(false)
            setTimeout(() => {
                setCompatible(true)
            }, 3000);
        }else{
            setAnimateSpeak(true)
            resetTranscript()
            SpeechRecognition.startListening()
            setTimeout(() => {
                search()
                SpeechRecognition.stopListening()
                setAnimateSpeak(false)
            }, 5000);
        }
    }

    useEffect(() => {
        setMessage(transcript)
    }, [transcript]);

    const search = (e) =>{
        if(message !== "") history.push(`/Products/${message}`);
    }
    const handleChange = (e) =>{
        setMessage(e.target.value)
    }
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
                        Ingresa aquí para conocer el precio promedio de 7,000 medicamentos que te ayudarán a tomar una decisión de compra informada.
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
                    {animateSpeak && <p className="aparecer Error">Escuchando...</p>}
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