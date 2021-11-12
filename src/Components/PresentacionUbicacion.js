import React,{useContext,useState,useEffect} from 'react';
import DataContext from '../Context/DataContext';

const PresentacionUbicacion = (props) =>{
    /*-----------States-----------------*/
    const [animate, setAnimate] = useState(false);
    const [transition, setTransition] = useState(false);
    const [select, setSelect] = useState(props.name);

    /*-----------Context-----------------*/
    const dataSearch = useContext(DataContext);

    const handleClick = (e) =>{
        if(props.name === "DEPARTAMENTO"){
            dataSearch.departamento = e.target.innerHTML
            dataSearch.provincia = ""
            dataSearch.distrito = ""
        } 
        if(props.name === "PROVINCIA") dataSearch.provincia = e.target.innerHTML
        if(props.name === "DISTRITO") dataSearch.distrito = e.target.innerHTML
        setSelect(e.target.innerHTML)
        if(props.name === "DEPARTAMENTO" || props.name === "PROVINCIA") props.map()
        HandleQuiz()
    }

    const HandleQuiz = () =>{
        props.setClose(props.name)
        animate ? setAnimate(false) : setAnimate(true)
        setTimeout(() => {
            transition ? setTransition(false) : setTransition(true)
        }, 50);
    }

    useEffect(() => {
        if(props.close !== props.name){
            animate && setAnimate(false)
            transition && setTransition(false)
        }
    }, [props.close]);
    
    return(
        <>
            <div className="Option-Product center row space-between padding-lateral" onClick={HandleQuiz}>
                <p>{select}</p>
                <i className="fas fa-chevron-down fa-2x"></i>
            </div>
            <div className={`Options-Presentacion center column ${!animate &&'none'} ${transition ? 'traslate0' : ''}`}>
            {
                props.data.length>0 
                ?
                props.data.map(
                    data =>
                    <p 
                    onClick={handleClick}
                    className="size-16 gibson m-10 pointer" 
                    key={data+props.name}
                    >
                        {data}
                    </p> 
                )
                :
                <p className="gibson size-16 textcenter">{props.message}</p>
            }
            </div>
        </>
    )
}

export default PresentacionUbicacion