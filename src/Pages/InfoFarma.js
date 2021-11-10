import React,{useState} from 'react';
import '../Styles/InfoFarma.css';
import Img from '../Assets/Android-Phone-with-Notch-Mockup 2.png';
import Quiz from '../Components/Quiz';
import question from'../quiz.json';
import icon from '../Assets/Frame.png';
import icon2 from '../Assets/Frame (1).png';
import icon3 from '../Assets/Frame (2).png'
import Skill from '../Components/Skill';

const InfoFarma = () =>{
    const [close, setClose] = useState('none');

    return(
        <>
            <section className="Banner-2 center wrap pad-responsive">
                <div className="Banner-Info">
                    <p className="Banner2-Title m-none">
                        ¿QUE ES 
                    </p>
                    <p className="Banner2-Title m-none"><strong>FARMACHECK?</strong></p>
                    <p className="Banner2-parrafo">
                        FarmaCheck es una app que permite encontrar rápidamente un precio referencial de 7,000 medicamentos ofrecidos por boticas y farmacias privadas. De esta manera, pone al alcance del consumidor información transparente que le ayudará a tomar una decisión de compra informada.
                    </p>
                    <p className="Banner2-parrafo">
                        Esta es una iniciativa de la Asociación de EPS (APEPS) y la Asociación Peruana de Empresas de Seguros (APESEG) para brindar información oportuna y transparente al público que busca medicinas a precios competitivos.
                    </p>
                </div>
                <img className="Banner2-Img" src={Img} alt="Movile Farma"/>
            </section>
            <section className="Quiz center column">
                <h2 className="Quiz-Subtitle">Preguntas frecuentes</h2>
                {question['quiz'].map(item => <Quiz key={item.id} data={item} close={close} setclose={setClose} />)}
            </section>
            <section className="Section-Skills center column wrap space-around">
                <p className="Quiz-BigParrafo">
                    CIFRAS <strong>DESTACADAS</strong>
                </p>
                <div className="max-width center row  wrap space-around">
                <Skill img={icon} score={2000} scoremin={0} descriptio={"descargas de app"} />
                <Skill img={icon2} score={7000} scoremin={5000} descriptio={"medicamentos"}/>
                <Skill img={icon3} score={18000} scoremin={16000} descriptio={"establecimientos analizados"}/>
                </div>
            </section>
        </>
    )
}

export default InfoFarma