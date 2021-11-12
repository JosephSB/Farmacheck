import React from 'react';
import ImgReporte from '../Assets/gettyimages-878854896-170667a 1.png';
import ImgOtherReporte from  '../Assets/gettyimages-1271045258-170667a 1.png';
import ImgOtherReporte2 from '../Assets/gettyimages-1271045258-170667a 2.png';
import ImgOtherReporte3 from '../Assets/gettyimages-1271045258-170667a 3.png';
import '../Styles/DatosAbiertos.css'

const Reportes = () =>{
    window.document.body.classList.remove('bg-image')
    return(
        <div className="Content-Reporte pad-responsive">
            <p className="Info-Text gib-bol"><strong>REPORTE TRIMESTRAL JUNIO SEPTIEMBRE 2021</strong></p>
            <h1 className="Reporte-Title">Precios de medicamentos para COVID-19 bajaron 20% en boticas y farmacias privadas</h1>
            <p className="Info-Text">30 de septiembre del 2021</p>
            <div className="Box-Info center row wrap start-y">
                <div className="Noticia">
                    <img className="Noticia" src={ImgReporte} alt="Farmacos"/>
                    <p className="Info-Text m-top">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. 
                    </p>
                    <p className="Info-Text m-top">
                        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
                    </p>
                    <p className="Info-Text m-top">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                    </p>
                    <div className="Noticia center">
                        <button className="Btn-Download m-top">Descargar Reporte</button>
                    </div>
                </div>
                <aside className="Noticia-Aside center column">
                    <p className="Aside-Text">REPORTES ANTERIORES</p>
                    <div className=" center wrap">
                        <div className="Noticia-Extra center column">
                            <img className="Img-NoticiaExtra" src={ImgOtherReporte} alt="Doctor"/>
                            <p className="Aside-Text">Lorem ipsum dolor sit amet, consect etuer adipiscing elit</p>
                        </div>
                        <div className="Noticia-Extra center column">
                            <img className="Img-NoticiaExtra" src={ImgOtherReporte2} alt="Doctor"/>
                            <p className="Aside-Text">Lorem ipsum dolor sit amet, consect etuer adipiscing elit</p>
                        </div>
                        <div className="Noticia-Extra center column">
                            <img className="Img-NoticiaExtra" src={ImgOtherReporte3} alt="Doctor"/>
                            <p className="Aside-Text">Lorem ipsum dolor sit amet, consect etuer adipiscing elit</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Reportes