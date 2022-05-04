import React from 'react';
import { useInView } from 'react-intersection-observer';

const Skill = (props) =>{
    const { ref, inView} = useInView({
        threshold: 0.75,
    });

    return (
        <div className={`skill center ${inView === true && "aparecer"}`} ref={ref}>
            <img src={props.img} alt="Phone"/>
            <div className="column">
                <p className="skill-Subtitle--24 color-cyan">
                    <strong>
                        {props.score}
                    </strong>
                </p>
                <p className="skill-Subtitle color-grey">{props.descriptio} </p>
            </div>
        </div>
    )
}

export default Skill