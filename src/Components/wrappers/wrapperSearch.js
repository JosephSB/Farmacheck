import LOGOFARMA from '../../Assets/Img/LOGOFARMA.png';
import LinksSearch from '../LinksSearch';

const WrapperSearch = ({children}) => {
    return(
        <section className="Banner center column">
            <img className="Banner__Logo" src={LOGOFARMA} alt="FARMACHECK"/>
            <LinksSearch/>
            <div className="Banner__Contenido center column">
                {children}
            </div>
        </section>
    )
}
export default WrapperSearch