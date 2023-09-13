import axios from "axios"
import { useState,useEffect } from "react"

const LandingPage = () => {
    
    const [info,setInfo] = useState([])

    useEffect(()=> {axios.get(`https://rickandmortyapi.com/api/character`).then(resp =>{
        console.log("Resp: ",resp.data.results)
        setInfo(resp.data.results)
    })},[]) 

    //console.log("LandingComponent: ",keyWord)

    const traerInformacion = () =>{
        return info.map((personaje) => (
            <div key={personaje.id}>
                <img src={personaje.image} alt="" />
                <p>{personaje.name}</p>
            </div>
        ))
    }

    return (
        <>
        {
            traerInformacion()
        }
        </>
    )
}

export default LandingPage