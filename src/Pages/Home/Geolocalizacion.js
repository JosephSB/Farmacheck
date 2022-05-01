import { useEffect,useContext,useState } from "react";
import LinksSearch from "../../Components/LinksSearch"
import LOGOFARMA from '../../Assets/Img/LOGOFARMA.png';
import { geolocated, geoPropTypes } from "react-geolocated";
import { getGeolocate, getLocal } from "../../services/farma.service";
import DataContext from "../../Context/DataContext";
import { useHistory } from "react-router-dom";
import Loader from "../../Components/Loader";
import ItemUbicacion from "../../Components/itemUbicacion";

const GeoLocalizacion = (props) => {
    let history = useHistory();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const dataSearch = useContext(DataContext);
    console.log(props)

    async function search(productDepartment, productProvince, productDistrict) {
        var results = [];

        const data = {
            firstResult: 1, 
            maxResults: 100,
            marca:dataSearch.marca,
            laboratorio: dataSearch.laboratorio,
            presentacion: dataSearch.presentacion,
            concentracion:dataSearch.concentracion,
            departamento: productDepartment, 
            provincia: productProvince, 
            distrito: productDistrict,
        }
        console.log(data)
        setLoader(true)
        await getLocal(data)
            .then((response) => {
                console.log(response)
                results = response.data.locales ? response.data.locales : [];
            })
            .catch((e) => {
                console.log(e);
            }).finally(()=> setLoader(false) )

            setData(results)
        return results;
    }

    const sinDiacriticos = (function(){
        let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç',
             a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc',
            re = new RegExp('['+de+']' , 'ug');
    
        return texto =>
            texto.replace(
                re, 
                match => a.charAt(de.indexOf(match))
            );
    })();

    const getResultsFiltered = (results) => {
        const resultFiltered = [];
        results.forEach(element => {
            const components = element.address_components;
            let distritos = components.filter((component => component.types.includes("locality")));
            let distritoSelected = distritos.length > 0 ? distritos[0] : components.filter((component => component.types.includes("sublocality"))).length > 0 ? components.filter((component => component.types.includes("sublocality")))[0] : {};
            if (distritoSelected.long_name !== "Cercado de Lima" && distritoSelected.long_name !== "Lima")
                resultFiltered.push(element);
        });
        return resultFiltered.length > 0 ? resultFiltered[0] : results[0];
    }

    useEffect(() => {
        if(dataSearch.laboratorio === "") history.push("/Inicio")
        if (props.isGeolocationAvailable &&
            props.isGeolocationEnabled &&
            props.coords) {

            getGeolocate({latitude: -6.771298, longitude: -79.855666})
                .then(res => {
                    console.log(res)
                    let result = getResultsFiltered(res.data.results);

                    let components = result.address_components;

                    const productDepartment = components.filter((component => component.types.includes("administrative_area_level_1")))[0]

                    const productProvince = components.filter((component => component.types.includes("administrative_area_level_2")))[0]

                    let distritos = components.filter((component => component.types.includes("locality")))

                    const productDistrict = distritos.length > 0 ? distritos[0] : components.filter((component => component.types.includes("sublocality"))).length > 0 ? components.filter((component => component.types.includes("sublocality")))[0] : components[0]
                    console.log(productDepartment.long_name, productProvince.long_name, productDistrict.long_name)
                    productDepartment.long_name = sinDiacriticos(productDepartment.long_name.replace("Provincia de ", ''))
                    productProvince.long_name = sinDiacriticos(productProvince.long_name.replace("Provincia de ", ''))
                    console.log(productDepartment.long_name, productProvince.long_name, productDistrict.long_name)
                    search(productDepartment.long_name, productProvince.long_name, productDistrict.long_name);
                })


        }
    }, [props.coords]);

    window.document.body.classList.add('bg-image')
    return (
        <section className="Banner center column">
            <img className="Banner__Logo" src={LOGOFARMA} alt="FARMACHECK" />
            <LinksSearch />
            <div className="Banner__Contenido center column">
            {loader 
                    ? 
                    <Loader message={"Buscando Precios..."}/>
                    :
                    <>
                        {
                        <div className="Banner__InfoSearch">
                           {/* <p className="Banner__Text4--sm">Total de Resultados: {totalProducts}</p>*/}
                            <p className="Banner__Text4--sm">Resultados en <strong>{dataSearch.distrito}</strong></p>
                        </div>
                        }
                    </>
                }
                {
                    data.map(
                        (data, index) => 
                        <ItemUbicacion
                            key={index}
                            marca={data.nombreComercial}
                            laboratorio={data.direccion}
                            precio={data.precio}
                        />
                    )
                }
            </div>
        </section>
    )
}

GeoLocalizacion.propTypes = { ...GeoLocalizacion.propTypes, ...geoPropTypes };

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(GeoLocalizacion);