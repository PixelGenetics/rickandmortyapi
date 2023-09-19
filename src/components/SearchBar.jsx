import axios from "axios"
import { useState,useEffect } from "react"
import LandingPage from "./LandingPage"
import atras from "../assets/3114883.png"
import adelante from '../assets/arrow-forward_119427.png'

const SearchBar = () => {
    const [keyWord,setKeyWord] = useState("")
    const [pasarInformacion,setPasarInformacion] = useState([])
    const [loading,setLoading] = useState(true)
    const [inicio,setInicio] = useState([])
    const [filtro,setFiltro] = useState(1)
    //console.log("palabra: ",palabra)

    const changes = x =>{
        setKeyWord(x.target.value)
    }

    const filtrarAtras = (x) =>{
        x.preventDefault()
        setFiltro(filtro-1);
    }
    const filtrarAdelante = (x) =>{
        x.preventDefault()
        setFiltro(filtro+1)
    }


    useEffect(() => {axios.get(`https://rickandmortyapi.com/api/character/?page=${filtro}`).then(resp => {
        setInicio(resp.data.results)
    })},[filtro])

    useEffect(() =>{
        if (keyWord.length == 0) {
            axios.get(`https://rickandmortyapi.com/api/character/?page=${filtro}`).then(resp => {
            console.log("primera sentencia: ",resp.data.results)
            setPasarInformacion(resp.data.results)
        })
        }else if (filtro >= 1) {
        console.log("Segunda Sentencia: ",filtro)
        axios.get(`https://rickandmortyapi.com/api/character/?page=${filtro}&name=${keyWord}`).then(resp => {
        console.log("Dentro de click: ", resp.data)
        setPasarInformacion(resp.data.results)
        })
        }
},[filtro])

    const click = () => {
                axios.get(`https://rickandmortyapi.com/api/character/?&name=${keyWord}`).then(resp => {
                console.log("Dentro de click: ", resp.data.results)
                setPasarInformacion(resp.data.results)
                setLoading(false)
            } 
        )
    }

    const mostrar = () => {
        return (pasarInformacion.map((personaje)=>(
            <div className="bg-[#219ebc] flex flex-col text-center m-10 rounded-md " key={personaje.id}>
                <img className="rounded-md" src={personaje.image} alt="" />
                <p>Nombre: {personaje.name}</p>
                <p>Gender: {personaje.gender}</p>
            </div>
        ))
        )
    }
    
    const inicio_landpage = () =>{
        return inicio.map((objeto) => ( 
            <div className="bg-[#219ebc] flex flex-col text-center m-10 rounded-md" key={objeto.id}>
                <img className="rounded-md" src={objeto.image} alt="" />
                <p>Name: {objeto.name}</p>
                <p>Gender: {objeto.gender}</p>
            </div>
            )
        )
    }

    return(
    <>
        <LandingPage />
        <div className="flex flex-col items-center w-full bg-[#023047]">
            <div className="flex justify-center gap-8 pt-12 pb-12">
                <button disabled={filtro === 1} className={`${filtro == 0 ? 'bg-pink-400' : 'bg-[#8ecae6]'} w-10 h-10 rounded-md`} onClick={x => filtrarAtras(x)}><img src={atras} alt="" /></button>
                <input type="text" className="border-2 border-[#219ebc] bg-[#219ebc] pr-20 pl-20 rounded-md text-center text-[#ffb703] placeholder:text-[#ffb703]" value={keyWord} onChange={x => {changes(x)}} placeholder="Type Something"/>
                <button onClick={click} className="rounded-md bg-[#8ecae6] pr-20 pl-20">Buscar</button>
                <button  disabled={filtro === pasarInformacion.length} className={`${filtro == 6 ? 'bg-pink-400' : 'bg-[#8ecae6]'} w-10 h-10 rounded-md`} onClick={x =>filtrarAdelante(x)}><img src={adelante} alt="" /></button>
            </div>
            <div className="grid grid-cols-4 ml-20 mr-20 bg-[#023047] w-full">
                {
                    loading ? inicio_landpage() :(
                        pasarInformacion.length > 0 ? mostrar() : <p>Vuelva mas tarde</p>
                    )
                }
            </div>
        </div>
        
    </>
    )
}
export default SearchBar