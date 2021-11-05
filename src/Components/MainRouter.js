import React,{useState} from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import DatosAbiertos from '../Pages/DatosAbiertos';
import DetailProduct from '../Pages/DetailProduct';
import Home from '../Pages/Home';
import InfoFarma from '../Pages/InfoFarma';
import PriceProduct from '../Pages/PriceProduct';
import Reportes from '../Pages/Reportes';
import SearchProduct from '../Pages/SearchProduct';
import Footer from './Footer';
import Header from './Header';

const dataDefault ={
    presentacion: "",
    concentracion: ""
}

const MainRouter = () =>{
    const [dataSearch, setDataSearch] = useState({dataDefault});

    return(
        <>
            <Router>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/Inicio" component={Home}></Route>
                <Route exact path="/Datos" component={DatosAbiertos}></Route>
                <Route exact path="/Reportes" component={Reportes}></Route>
                <Route exact path="/Informacion" component={InfoFarma}></Route>
                <Route exact path="/Products/:product" component={SearchProduct}></Route>
                <Route exact path="/Detalle/:product" component={() => <DetailProduct setDataSearch={setDataSearch} />}></Route>
                <Route exact path="/Precios/:product" component={() => <PriceProduct dataSearch ={dataSearch} />}></Route>
            </Switch>
            <Footer/>
            </Router>
        </>
    )
}

export default MainRouter