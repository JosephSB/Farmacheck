import React,{useEffect,useState,useContext} from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import { helpHttp } from '../../Helpers/helpHttp'
import LOGOFARMA from '../../Assets/LOGOFARMA.png';
import Loader from '../../Components/Loader';
import DataContext from '../../Context/DataContext';
import PresentacionUbicacion from '../../Components/PresentacionUbicacion';


const Ubicacion = () =>{
    /*-----------STATES-----------------*/
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState();
    const [allData, setAllData] = useState();
    const [departamentos, setDepartamentos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [close, setClose] = useState('none');

    /*-----------hooks-----------------*/
    let history = useHistory();

    /*-----------Context-----------------*/
    const dataSearch = useContext(DataContext);

    useEffect(() => {
        setLoader(true)
        const form = {
            "keyCode": process.env.REACT_APP_API_KEY_SERVICE,
            "firstResult": 1,
            "maxResults": 32,
            "marca":dataSearch.marca,
            "laboratorio": dataSearch.laboratorio,
            "presentacion": dataSearch.presentacion,
            "concentracion":dataSearch.concentracion
        }
        let options = {
            body: form,
            headers: {"content-type": "application/json"}
        }
        let url = process.env.REACT_APP_API_KEY_DISTRITOS

        helpHttp().post(url,options).then(res => {
            if(res.errorCode === 0){
                setMessage(res.message)
                setDepartamentos(res.departamentos.map(elem => elem.departamento))
                setAllData(res.departamentos)

                setLoader(false)
            }
        })

    }, []);

    const mapProvincias = () =>{
        setProvincias([])
        setDistritos([])
        for (let i=0; i < allData.length; i++) {
            if(allData[i].departamento === dataSearch.departamento){
                setProvincias(allData[i].provincias.map(elem => elem.provincia))
            }
        }
    }

    const mapDistritos = () =>{
        setDistritos([])
        for (let i=0; i < allData.length; i++) {
            if(allData[i].departamento === dataSearch.departamento){
                let provincias = allData[i].provincias
                for (let j=0; j < provincias.length; j++) {
                    if(provincias[j].provincia === dataSearch.provincia){
                        setDistritos(provincias[j].distritos.map(elem => elem.distrito))
                    }
                    
                }
            }
        }
    }

    const searchLocals = () =>{
        if(dataSearch.departamento !== "" &&
        dataSearch.provincia !== "" &&
        dataSearch.distrito !== "" 
        ){
            history.push("/Locales")
        }else {
            setMessage("Complete todos los campos")
            setTimeout(() => {
                setMessage("")
            }, 3000);
        }
    }    
    const goBack = (e) =>{
        history.goBack()
    }

    window.document.body.classList.add('bg-image')
    return(
        <section className="Banner center column pad-responsive p-top">
            <img className="Banner-Img" src={LOGOFARMA} alt="FARMACHECK"/>
            <div className="center row wrap max-width m-top">
                <button className="Btn-Back center btn-defaul" onClick={goBack}>
                    Regresar
                </button>
                <NavLink className="Btn-Back center" exact to="/Inicio">
                    Realizar otra busqueda
                </NavLink>
            </div>
            <p className="gibson size-16 textcenter">
                Para mayor precisión sobre los lugares de compra, por favor completa la siguiente información:
            </p>
            <div className="Content-Products center column">
                {loader ?
                 <Loader message={"Buscando Ubicaciones..."} />
                 :
                 <>
                    <PresentacionUbicacion 
                        name = {"DEPARTAMENTO"}
                        close={close} 
                        setClose={setClose}
                        data={departamentos}
                        map={mapProvincias}
                        message={"Seleccione un Departamento"}
                    />
                    <PresentacionUbicacion 
                        name = {"PROVINCIA"}
                        close={close} 
                        setClose={setClose}
                        data={provincias}
                        map={mapDistritos}
                        message={"Seleccione un Departamento"}
                    />
                    <PresentacionUbicacion 
                        name = {"DISTRITO"}
                        close={close} 
                        setClose={setClose}
                        data={distritos}
                        message={"Seleccione una Provincia"}
                    />
                    <p className="gibson size-16 textcenter">{message}</p>
                    <button className="Button-Ubicacion m-top pointer" onClick={searchLocals}>Aceptar</button>
                </>
                }
            </div>
        </section>
    )
}

export default Ubicacion