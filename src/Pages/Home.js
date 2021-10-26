import React,{useState, useEffect} from "react";
import LOGOFARMA from '../Assets/LOGOFARMA.png';
import '../Styles/Home.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Modal from "../Components/Modal";

const Home = () =>{
    const [message, setMessage] = useState('');
    const [modal, setModal] = useState(false);
    const [compatible, setCompatible] = useState(true);
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
            SpeechRecognition.stopListening()
            resetTranscript()
            SpeechRecognition.startListening()
            setTimeout(() => {
                SpeechRecognition.stopListening()
            }, 5000);
        }
    }
    useEffect(() => {
        setMessage(transcript)
    }, [transcript]);

    const handleChange = (e) =>{
        setMessage(e.target.value)
    }
    const handleModal = (e) => setModal(true)

    return(
        <>
            {modal && <Modal setModal={setModal} />}
            <section className="Banner center column pad-responsive">
                <img className="Banner-Img" src={LOGOFARMA} alt="FARMACHECK" width="353px" height="100px"/>
                <div className="center column max-width"> 
                    <p className="Banner-parrafo">
                        Ingresa aquí para conocer el precio promedio de 7,000 medicamentos que te ayudarán a tomar una decisión de compra informada.
                    </p>
                    <p className="Banner-Subtitle">
                        <strong>¿QUÉ MEDICAMENTO ESTÁS BUSCANDO?</strong>
                    </p>
                    <div className="Banner-Content-Input center">
                        <input className="Banner-Input--search" type="text" 
                        id="Input-search-product" value={message} onChange={handleChange}/>
                        <div className="Input-Tools search-input center space-evenly">
                            <i className="fas fa-search"></i>
                            <i className="fas fa-microphone" onClick={RecordVoice}></i>
                        </div>
                    </div>
                    {!compatible && <p className="Error">NAVEGADOR NO COMPATIBLE PARA BUSCAR POR VOZ</p>}
                    <p className="Banner-parrafo-12">
                        Al usar este buscador, estás sujeto a nuestros <span className="bor-bottom" onClick={handleModal}>términos y condiciones.</span>
                    </p>
                    <p className="Banner-parrafo-12">
                        Envíanos tus comentarios a <span className="color-cyan">info@farmacheck.pe</span>
                    </p>
                </div>
            </section>
        </>
    )
}

export default Home