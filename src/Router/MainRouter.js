import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import DatosAbiertos from '../Pages/DatosAbiertos';
import InfoFarma from '../Pages/InfoFarma';
import Reportes from '../Pages/Reportes';
import Home from '../Pages/Home/Home';
import PriceProduct from '../Pages/Home/PriceProduct';
import SearchProduct from '../Pages/Home/SearchProduct';
import DetailProduct from '../Pages/Home/DetailProduct';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Ubicacion from '../Pages/Home/Ubicacion';
import { DataProvider } from '../Context/DataContext';
import Locales from '../Pages/Home/Locales';


const MainRouter = () =>{
    return(
        <DataProvider>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/Inicio" component={Home}></Route>
                    <Route exact path="/Datos" component={DatosAbiertos}></Route>
                    <Route exact path="/Reportes" component={Reportes}></Route>
                    <Route exact path="/Informacion" component={InfoFarma}></Route>
                    <Route exact path="/Products/:product" component={SearchProduct}></Route>
                    <Route exact path="/Detalle" component={DetailProduct}></Route>
                    <Route exact path="/Precios" component={PriceProduct}></Route>
                    <Route exact path="/Ubicacion" component={Ubicacion}></Route>
                    <Route exact path="/Locales" component={Locales}></Route>
                </Switch>
                <Footer/>
            </Router>
        </DataProvider>
    )
}

export default MainRouter