import React from 'react';

const FooterSearch = () =>{
    const handleExternalLink = (e) =>{
        window.location.href = 'mailto:info@farmacheck.pe'; 
        return null;
    }
    return(
        <div className="max-width center column">
            <p className="color-grey m-none size-16 gibson">
                <i className="fas fa-info-circle color-cyan"></i>
                Envíanos tus comentarios a
                </p>
            <p onClick={handleExternalLink} className="color-cyan m-none size-16 gibson">info@FarmaCheck.pe</p>
        </div>
    )
}

export default FooterSearch