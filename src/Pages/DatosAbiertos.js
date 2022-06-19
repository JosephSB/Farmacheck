import React from 'react';
import Icon1 from '../Assets/Img/image 1.png';
import Icon2 from '../Assets/Img/image 2.png';
import Icon3 from '../Assets/Img/image 3.png';
import Icon4 from '../Assets/Img/image 4.png';
import Icon5 from '../Assets/Img/image 5.png';
import Reporte1 from '../Assets/excel/Reporte 9B.csv';

const DatosAbiertos = () =>{
    window.document.body.classList.remove('bg-image')
    return(
        <div className="Content-DatosAbiertos">
            <h1 className="Quiz-Subtitle">DATOS ABIERTOS DE FARMACHECK</h1>
            <p className="Info-Text padding-lateral">
            Ponemos a disposición del público en general la información histórica de los
            precios referenciales de medicamentos en el Perú desde enero 2021, que son la
            fuente de información de FarmaCheck, a fin de que los interesados puedan
            utilizarla para fines académicos o periodísticos.
            </p>
            <div className="Content-dowload">
                <div className="Download">
                    <p className="Download-Text">Información en CSV</p>
                    <a href={Reporte1} download="Precios históricos (Reporte 9B)">
                    <button className="Btn-Download">
                        Descarga aquí
                    </button>
                    </a>
                </div>
            </div>
            <h2 className="Quiz-Subtitle">APUNTES METODÓLOGICOS</h2>
            <div className="Content-NotaMetodo">
                <div className="Box">
                    <div className="Box-Info">
                        <img src={Icon2} alt="Search"/>
                        <div className="padding-lateral">
                            <p className="Info-Text color-cyan m-none"><strong>Número de medicamentos</strong></p>
                            <p className="Info-Text m-none">
                            Los datos que tenemos incluye los precios de más de 4,000
                            medicamentos, ofrecidos por boticas y farmacias privadas.
                            </p>
                        </div>
                    </div>
                    <div className="Box-Info">
                        <img src={Icon1} alt="Search"/>
                        <div className="padding-lateral">
                            <p className="Info-Text color-cyan m-none"><strong>Fuente</strong></p>
                            <p className="Info-Text m-none">
                                Los datos se recogen del Observatorio de la Dirección General de Medicamentos
                                (DIGEMID).
                            </p>
                        </div>
                    </div>
                    <div className="Box-Info">
                        <img src={Icon5} alt="Search"/>
                        <div className="padding-lateral">
                            <p className="Info-Text color-cyan m-none"><strong>Fecha de actualización</strong></p>
                            <p className="Info-Text m-none">
                            Los datos serán actualizados trimestralmente.
                            </p>
                        </div>
                    </div>
                    {/*<div className="Box-Info">
                        <img src={Icon4} alt="Search"/>
                        <div className="padding-lateral">
                            <p className="Info-Text color-cyan m-none"><strong>Orden</strong></p>
                            <p className="Info-Text m-none">
                                La data está organizada por orden alfabético.
                            </p>
                        </div>
    </div>*/}
                </div>
                <div className="Box">
                    {/*<div className="Box-Info">
                        <img src={Icon3} alt="Search"/>
                        <div className="padding-lateral">
                            <p className="Info-Text color-cyan m-none"><strong>Periodo de análisis</strong></p>
                            <p className="Info-Text m-none">
                                La información ofrecida reúne datos desde los tres últimos años. 
                            </p>
                        </div>
    </div>*/}
                </div>
            </div>
        </div>
    )
}

export default DatosAbiertos