import React from 'react';
import '../Styles/DatosAbiertos.css'
import Icon1 from '../Assets/image 1.png';
import Icon2 from '../Assets/image 2.png';
import Icon3 from '../Assets/image 3.png';
import Icon4 from '../Assets/image 4.png';
import Icon5 from '../Assets/image 5.png';

const DatosAbiertos = () =>{
    window.document.body.classList.remove('bg-image')
    return(
        <div className="max-width bg-white">
        <div className="Content-DatosAbiertos center column pad-responsive">
            <h1 className="Quiz-Subtitle gib-bol">Datos abiertos FarmaCheck</h1>
            <p className="Info-Text padding-lateral">
                ¿Quieres acceder a la data de precios promedio de medicamentos en el Perú? En esta sección 
                podrás descargar la información trabajada por Apeseg y Apeps de manera gratuita.
            </p>
            <div className="Content-dowload center wrap space-evenly">
                <div className="Download center column space-evenly">
                    <p className="Download-Text gibson">Descarga de datos acumulados</p>
                    <button className="Btn-Download">Descargar la información en CSV</button>
                </div>
                <div className="Download center column space-evenly">
                    <p className="Download-Text gibson">Descarga de datos trimestrales</p>
                    <button className="Btn-Download">Descargar la información en CSV</button>
                </div>
            </div>
            <h2 className="Quiz-Subtitle gib-bol">Nota metodológica</h2>
            <div className="Content-NotaMetodo center wrap space-evenly">
                <div className="Box center column">
                    <div className="Box-Info center row start">
                        <img src={Icon1} alt="Search"/>
                        <div className="padding-lateral">
                            <p className="Info-Text color-cyan m-none"><strong>Fuente</strong></p>
                            <p className="Info-Text m-none">
                                Se recoge data del Observatorio de la Dirección General de Medicamentos (Digemid), 
                                de las Instituciones Prestadoras de Servicios de Salud (IPRESS) y de la 
                                Superintendencia Nacional de Salud (SuSalud). 
                            </p>
                        </div>
                    </div>
                    <div className="Box-Info center row start">
                        <img src={Icon2} alt="Search"/>
                        <div className="padding-lateral">
                            <p className="Info-Text color-cyan m-none"><strong>Número de medicamentos</strong></p>
                            <p className="Info-Text m-none">
                                La data que tenemos incluye los precios de 7,000 medicamentos, que son los más 
                                utilizados en las principales IPRESS del país. 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="Box center column">
                    <div className="Box-Info center row start">
                        <img src={Icon3} alt="Search"/>
                        <div className="padding-lateral">
                            <p className="Info-Text color-cyan m-none"><strong>Periodo de análisis</strong></p>
                            <p className="Info-Text m-none">
                                La información ofrecida reúne datos desde los tres últimos años. 
                            </p>
                        </div>
                    </div>
                    <div className="Box-Info center row start">
                        <img src={Icon4} alt="Search"/>
                        <div className="padding-lateral">
                            <p className="Info-Text color-cyan m-none"><strong>Orden</strong></p>
                            <p className="Info-Text m-none">
                                La data está organizada por orden alfabético.
                            </p>
                        </div>
                    </div>
                    <div className="Box-Info center row start">
                        <img src={Icon5} alt="Search"/>
                        <div className="padding-lateral">
                            <p className="Info-Text color-cyan m-none"><strong>Actualización</strong></p>
                            <p className="Info-Text m-none">
                                La data será actualizada los últimos días de cada mes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default DatosAbiertos