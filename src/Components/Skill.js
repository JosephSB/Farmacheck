import React,{useState,useEffect} from 'react';
import { useInView } from 'react-intersection-observer';

const Skill = (props) =>{
    const [score, setScore] = useState(0);
    const { ref, inView} = useInView({
        threshold: 0.75,
    });

    const AnimateScore = () =>{
        let i = props.scoremin;
        let inter = setInterval(() => {
            i=i+50;
            setScore(i)
            if(i>props.score){
                clearInterval(inter)
                setScore(props.score)
            }
        }, 30);
    }
    useEffect(() => {
        AnimateScore()
    }, [inView === true]);

    return (
        <div className={`skill center ${inView === true && "aparecer"}`} ref={ref}>
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