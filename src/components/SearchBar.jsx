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

    useEffect(() =>{
    if (filtro !== 1) {
        console.log("Filtro: ",filtro)
        axios.get(`https://rickandmortyapi.com/api/character/?page=${filtro}&name=${keyWord}`).then(resp => {
        //console.log("Dentro de click: ", resp.data)
        setPasarInformacion(resp.data.results)
        })
    }else{
        console.log("Filtro: ",filtro)
        axios.get(`https://rickandmortyapi.com/api/character/?page=${filtro}&name=${keyWord}`).then(resp => {
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
            <div key={personaje.id}>
                <img src={personaje.image} alt="" />
                <p>Nombre: {personaje.name}</p>
            </div>
        ))
        )
    }
    useEffect(() => {axios.get('https://rickandmortyapi.com/api/character').then(resp => {
        setInicio(resp.data.results)
    })},[])
    
    const inicio_landpage = () =>{
        return inicio.map((objeto) => ( 
            <div key={objeto.id}>
                <img src={objeto.image} alt="" />
                <p>Name: {objeto.name}</p>
            </div>
            )
        )
    }


    return(
    <>
        <button disabled={filtro === 6} className={`${filtro == 0 ? 'bg-pink-400' : 'bg-green-300'} w-5`} onClick={x => filtrarAtras(x)}><img src={atras} alt="" /></button>
        <input type="text" className="border-2 border-black rounded-md" value={keyWord} onChange={x => {changes(x)}}/>
        <button onClick={click} >Buscar</button>
        <button  disabled={filtro === 6} className={`${filtro == 6 ? 'bg-pink-400' : 'bg-green-300'} ml-52 w-5`} onClick={x =>filtrarAdelante(x)}><img src={adelante} alt="" /></button>
        {
            loading ? inicio_landpage() :(
                pasarInformacion.length > 0 ? mostrar() : <p>Vuelva mas tarde</p>
            )
        }
    </>
    )
}
export default SearchBar