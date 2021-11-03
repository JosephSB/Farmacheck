import React,{useState,useEffect} from 'react';

const Skill = (props) =>{
    const [score, setScore] = useState(0);

    const AnimateScore = () =>{
        let i = 0;
        let inter = setInterval(() => {
            i=i+100;
            setScore(i)
            if(i>props.score){
                clearInterval(inter)
                setScore(props.score)
            }
        }, 10);
    }
    useEffect(() => {
        AnimateScore()
    }, []);

    return (
        <div className="skill center">
            <img src={props.img} alt="Phone"/>
            <div className="column">
                <p className="skill-Subtitle--24 color-cyan">
                    <strong>
                        {score}
                    </strong>
                </p>
                <p className="skill-Subtitle color-grey">{props.descriptio} </p>
            </div>
        </div>
    )
}

export default Skill