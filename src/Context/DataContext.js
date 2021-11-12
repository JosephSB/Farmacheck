import { createContext} from "react";

const DataContext = createContext();

const dataDefault ={
    marca:"",
    producto:"",
    laboratorio: "",
    presentacion: "",
    concentracion: "",
    departamento: "",
    provincia: "",
    distrito: ""
}

const DataProvider = ({ children }) => {
  return <DataContext.Provider value={dataDefault}>{children}</DataContext.Provider>;
};

export { DataProvider };
export default DataContext;