import React,{useState,useEffect} from 'react';

const Quiz = (props) =>{
    const [animate, setAnimate] = useState(false);
    const [transition, setTransition] = useState(false);

    const HandleQuiz = (e) =>{
        props.setclose(props.data['id'])
        animate ? setAnimate(false) : setAnimate(true)
        setTimeout(() => {
            transition ? setTransition(false) : setTransition(true)
        }, 50);
    }
    
    useEffect(() => {
        if(props.close !== props.data['id']){
            animate && setAnimate(false)
            transition && setTransition(false)
        }
    }, [props.close]);

    return(
        <>
            <div className="Content-Quiz center space-between padding-lateral" onClick={HandleQuiz}>
                <p className="Quiz-Parrafo">
                    <strong> {props.data["quiz"]} </strong>
                </p>
                <i className="fas fa-caret-down color-cyan fa-2x"></i>
            </div>
            <div className={`Content-Info ${!animate &&'none'} ${transition ? 'traslate0' : ''}`}>
                <p className="Info-Text text-wrap">
                    {props.data["answer"]}
                </p>
            </div>
        </>
    )
}

export default Quiz