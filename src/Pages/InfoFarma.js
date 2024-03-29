import React,{useState} from 'react';
import Img from '../Assets/Img/Android-Phone-with-Notch-Mockup 2.png';
import Quiz from '../Components/Quiz';
import question from'../quiz.json';
import icon from '../Assets/Img/Frame.png';
import icon2 from '../Assets/Img/Frame (1).png';
import icon3 from '../Assets/Img/Frame (2).png'
import Skill from '../Components/Skill';

const InfoFarma = () =>{
    const [close, setClose] = useState('none');

    window.document.body.classList.remove('bg-image')
    return(
        <>
            <section className="Banner-2 ">
                <div className="Banner-Info">
                    <p className="Banner2-Title m-none">
                        ¿QUÉ ES 
                        <br/>
                        <strong>FARMACHECK?</strong>
                    </p>
                    <p className="Banner2-parrafo">
                    FarmaCheck es una herramienta que te permite encontrar rápidamente el precio referencial
                    de más de 4,000 medicamentos ofrecidos por boticas y farmacias privadas. De esta manera,
                    ponemos a tu alcance información transparente que te ayudará a tomar una decisión de
                    compra informada.
                    </p>
                    <p className="Banner2-parrafo">
                    Esta es una iniciativa conjunta de la Asociación Peruana de Entidades Prestadoras de Salud
                    (APEPS) y de la Asociación Peruana de Empresas de Seguros (APESEG) para brindar
                    información oportuna y transparente al público que busca medicinas a precios competitivos.
                    </p>
                </div>
                <img className="Banner2-Img" src={Img} alt="Movile Farma"/>
            </section>
            <section className="Quiz ">
                <h2 className="Quiz-Subtitle">CONOCE MÁS SOBRE FARMACHECK</h2>
                {question['quiz'].map(item => <Quiz key={item.id} data={item} close={close} setclose={setClose} />)}
            </section>
            <section className="Section-Skills">
                <p className="Quiz-BigParrafo">
                    CIFRAS <strong>DESTACADAS</strong>
                </p>
                <div className="max-width center row  wrap space-around">
                <Skill img={icon2} score={4000} descriptio={"medicamentos"}/>
                <Skill img={icon3} score={18000} descriptio={"establecimientos analizados"}/>
                </div>
            </section>
        </>
    )
}

export default InfoFarma