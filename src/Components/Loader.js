import React from 'react'

const Loader = (props) =>{
    return(
        <div className="center column">
            <div className="preloader"></div>
            <p className="color-grey size-26">{props.message}</p>
        </div>
    )
}

export default Loader