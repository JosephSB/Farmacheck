import { Fragment, useState } from "react"
import WrapperSearch from "../../../Components/wrappers/wrapperSearch"
import Geolocalizacion from "./sections/Geolocalizacion";
import Locales from "./sections/Locales";
import Ubicacion from "./sections/Ubicacion";

const Locals = () => {
    const [mood, setMood] = useState(1);
    return(
        <WrapperSearch>
            <Fragment>
                <div className="content-btn-locals">
                    <button className={`btn-locals ${mood === 1 && "btn-locals--active"}`} onClick={ ()=>setMood(1) }>
                        <i class="fas fa-map-marker-alt"></i>
                        &nbsp;
                        Mi ubicacion
                    </button>
                    <button className={`btn-locals ${mood > 1 && "btn-locals--active"}`} onClick={ ()=>setMood(2)}>
                        <i class="fas fa-map-marked-alt"></i>
                        &nbsp;
                        Otra ubicacion
                    </button>
                </div>
                {mood === 1 && <Geolocalizacion/>}
                {mood === 2 && <Ubicacion handleMood={setMood} />}
                {mood === 3 && <Locales/>}
            </Fragment>
        </WrapperSearch>
    )
}

export default Locals