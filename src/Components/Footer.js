import React from 'react';
import PlayStore from '../Assets/klipartz 3.png';
import AppStore from '../Assets/klipartz 4.png';
import '../Styles/Footer.css';

const Footer = () =>{
    return(
        <footer className="footer center wrap">
            <p className="Footer-parrafo">
                Obtén aquí FarmaCheck para tu smartphone
            </p>
            <div className="max-width center row">
                <img className="Img-Footer" src={PlayStore} alt="Google Play"/>
                <img className="Img-Footer" src={AppStore} alt="App Store"/>
            </div>
        </footer>
    )
}

export default Footer