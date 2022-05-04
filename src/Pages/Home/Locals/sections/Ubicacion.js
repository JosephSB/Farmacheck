import { useEffect, useState, useContext,Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../../../../Components/Loader';
import DataContext from '../../../../Context/DataContext';
import PresentacionUbicacion from '../../../../Components/PresentacionUbicacion';
import { getDitricts } from '../../../../services/farma.service';

const Ubicacion = ({ handleMood }) => {
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState();
    const [allData, setAllData] = useState();
    const [departamentos, setDepartamentos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [close, setClose] = useState('none');
    let history = useHistory();
    const dataSearch = useContext(DataContext);

    useEffect(() => {
        setLoader(true)
        const form = {
            "firstResult": 1,
            "maxResults": 32,
            "marca": dataSearch.marca,
            "laboratorio": dataSearch.laboratorio,
            "presentacion": dataSearch.presentacion,
            "concentracion": dataSearch.concentracion
        }
        if (dataSearch.laboratorio === "") history.push("/Inicio")

        getDitricts(form).then(({data}) => {
            if (data.errorCode === 0) {
                setMessage(data.message)
                setDepartamentos(data.departamentos.map(elem => elem.departamento))
                setAllData(data.departamentos)
            }
        }).finally( ()=> setLoader(false))

    }, []);

    const mapProvincias = () => {
        setProvincias([])
        setDistritos([])
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].departamento === dataSearch.departamento) {
                setProvincias(allData[i].provincias.map(elem => elem.provincia))
            }
        }
    }

    const mapDistritos = () => {
        setDistritos([])
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].departamento === dataSearch.departamento) {
                let provincias = allData[i].provincias
                for (let j = 0; j < provincias.length; j++) {
                    if (provincias[j].provincia === dataSearch.provincia) {
                        setDistritos(provincias[j].distritos.map(elem => elem.distrito))
                    }

                }
            }
        }
    }

    const searchLocals = () => {
        if (dataSearch.departamento !== "" &&
            dataSearch.provincia !== "" &&
            dataSearch.distrito !== ""
        ) {
            handleMood(3)
        } else {
            setMessage("Complete todos los campos")
            setTimeout(() => {
                setMessage("")
            }, 3000);
        }
    }

    if (loader) {
        return <Loader message={"Buscando Ubicaciones"} />
    }

    window.document.body.classList.add('bg-image')
    return (
        <Fragment>
            <p className="Banner__Text4">
                Para mayor precisión sobre los lugares de compra, por favor completa la siguiente información:
            </p>

            <PresentacionUbicacion
                name={"DEPARTAMENTO"}
                close={close}
                setClose={setClose}
                data={departamentos}
                map={mapProvincias}
                message={"Seleccione un Departamento"}
            />
            <PresentacionUbicacion
                name={"PROVINCIA"}
                close={close}
                setClose={setClose}
                data={provincias}
                map={mapDistritos}
                message={"Seleccione un Departamento"}
            />
            <PresentacionUbicacion
                name={"DISTRITO"}
                close={close}
                setClose={setClose}
                data={distritos}
                message={"Seleccione una Provincia"}
            />
            <p className="Banner__Text4--option">{message}</p>
            <button className="Banner__Button-Ubicacion" onClick={searchLocals}>Aceptar</button>

        </Fragment>
    )
}

export default Ubicacion