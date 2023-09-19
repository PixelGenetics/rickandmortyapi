import axios from "axios"
import { useState,useEffect } from "react"

const LandingPage = () => {
    
    const [filtro,setFiltro] = useState(0);
    const [inicio,setInicio] = useState([]);
    const [open,setOpen] = useState(false)
    const aumentar = (x) => {
        x.preventDefault()
        setFiltro(filtro + 1);
    }

    useEffect(() => {axios.get(`https://rickandmortyapi.com/api/character/?page=${filtro}`).then(resp => {
        setInicio(resp.data.results)
    })},[filtro])

    const cards = () =>{
        return inicio.map((objeto) => (
            <div key={objeto.id}>
                <img src={objeto.image} alt="" />
                <p>Nombre: {objeto.name}</p>
            </div>
        ))
    }

    return (
        <div className=" py-3 shadow-md bg-[#8ecae6] top-0 left-0 right-0 fixed">
            <button className="ml-10" onClick={() => setOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            </button>

            <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`}>
                </div>
            
            <div className={`${open ? "w-80" : "w-0"} bg-cyan-600 min-h-screen  fixed top-0 left-0`}>
            <div className={`${!open && "hidden"} pt-4`}>
                    <button className="ml-10 text-white mb-14" onClick={() => setOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </button>
                    <div className="text-center text-white text-lg hover:bg-orange-400 cursor-pointer py-3 mb-2">link 1</div>
                    <div className="text-center text-white text-lg hover:bg-orange-400 cursor-pointer py-3 mb-2">link 2</div>
                    <div className="text-center text-white text-lg hover:bg-orange-400 cursor-pointer py-3 mb-2">link 3</div>
                    <div className="text-center text-white text-lg hover:bg-orange-400 cursor-pointer py-3 mb-2">link 4</div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage