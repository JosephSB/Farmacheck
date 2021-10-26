import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import DatosAbiertos from '../Pages/DatosAbiertos';
import Home from '../Pages/Home';
import InfoFarma from '../Pages/InfoFarma';
import Reportes from '../Pages/Reportes';
import Footer from './Footer';
import Header from './Header';


const MainRouter = () =>{
    return(
        <>
            <Router>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/INICIO" component={Home}></Route>
                <Route exact path="/DATOS" component={DatosAbiertos}></Route>
                <Route exact path="/REPORTES" component={Reportes}></Route>
                <Route exact path="/INFORMACION" component={InfoFarma}></Route>
            </Switch>
            <Footer/>
            </Router>
        </>
    )
}

export default MainRouter