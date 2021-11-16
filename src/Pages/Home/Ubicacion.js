import React,{useEffect,useState,useContext} from 'react';
import {useHistory } from 'react-router-dom';
import { helpHttp } from '../../Helpers/helpHttp'
import LOGOFARMA from '../../Assets/LOGOFARMA.png';
import Loader from '../../Components/Loader';
import DataContext from '../../Context/DataContext';
import PresentacionUbicacion from '../../Components/PresentacionUbicacion';
import LinksSearch from '../../Components/LinksSearch';


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
        if(dataSearch.laboratorio === "") window.location.href ="/Inicio"
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

    window.document.body.classList.add('bg-image')
    return(
        <section className="Banner center column">
            <img className="Banner__Logo" src={LOGOFARMA} alt="FARMACHECK"/>
            <LinksSearch/>
            <p className="Banner__Text4">
                Para mayor precisión sobre los lugares de compra, por favor completa la siguiente información:
            </p>
            <div className="Banner__Contenido center column">
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
                    <p className="Banner__Text4--option">{message}</p>
                    <button className="Banner__Button-Ubicacion" onClick={searchLocals}>Aceptar</button>
                </>
                }
            </div>
        </section>
    )
}

export default Ubicacion