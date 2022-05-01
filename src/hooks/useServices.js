import { useState } from "react";

const useServices = (service, dataSearch) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    const runService = () =>{
        setLoading(true)
        service(dataSearch)
            .then( (res) =>{
                console.log(res.data)
                //if((response.data).length === 0) setError(true)
                //else setError(false)
                setData(res.data)
            })
            .catch( (error) => setError(true))
            .finally( () => setLoading(false) )
    }

    return {runService,loading,data,error}
}

export default useServices