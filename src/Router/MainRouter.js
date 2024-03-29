import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DatosAbiertos from "../Pages/DatosAbiertos";
import InfoFarma from "../Pages/InfoFarma";
import Reportes from "../Pages/Reportes";
import Home from "../Pages/Home/Home";
import PriceProduct from "../Pages/Home/PriceProduct";
import SearchProduct from "../Pages/Home/SearchProduct";
import DetailProduct from "../Pages/Home/DetailProduct";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { DataProvider } from "../Context/DataContext";
import Error404 from "../Pages/Error404";
import Locals from "../Pages/Home/Locals";

const MainRouter = () => {
  return (
    <DataProvider>
      <Router basename="/">
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/Inicio" component={Home}></Route>
          <Route exact path="/Datos" component={DatosAbiertos}></Route>
          {/*<Route exact path="/Reportes" component={Reportes}></Route>*/}
          <Route exact path="/Informacion" component={InfoFarma}></Route>
          <Route
            exact
            path="/Products/:product"
            component={SearchProduct}
          ></Route>
          <Route exact path="/Detalle" component={DetailProduct}></Route>
          <Route exact path="/Precios" component={PriceProduct}></Route>
          <Route exact path="/locales" component={Locals}></Route>
          <Route path="*" component={Error404}></Route>
        </Switch>
        <Footer />
      </Router>
    </DataProvider>
  );
};

export default MainRouter;
