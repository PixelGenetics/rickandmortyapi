import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import atras from "../assets/3114883.png";
import adelante from '../assets/arrow-forward_119427.png';
// ... (importaciones y código anterior)

const SearchBar = () => {
    const [keyWord, setKeyWord] = useState("");
    const [filterType, setFilterType] = useState("name");
    const [pasarInformacion, setPasarInformacion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inicio, setInicio] = useState([]);
    const [filtro, setFiltro] = useState(1);

    const changes = (x) => {
        setKeyWord(x.target.value);
    }

    const changeFilterType = (x) => {
        setFilterType(x.target.value);
    }

    const filtrarAtras = (x) => {
        x.preventDefault();
        setFiltro(filtro - 1);
    }

    const filtrarAdelante = (x) => {
        x.preventDefault();
        setFiltro(filtro + 1);
    }

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/?page=${filtro}`).then(resp => {
            setInicio(resp.data.results);
        });
    }, [filtro]);

    useEffect(() => {
        if (keyWord.length === 0) {
            axios.get(`https://rickandmortyapi.com/api/character/?page=${filtro}`).then(resp => {
                setPasarInformacion(resp.data.results);
            });
        } else if (filtro >= 1) {
            let apiUrl = `https://rickandmortyapi.com/api/character/?page=${filtro}`;
            if (filterType === 'name' || filterType === 'gender') {
                apiUrl += `&${filterType}=${keyWord}`;
            } else if (filterType === 'location') {
                apiUrl += `&location=${keyWord}`;
            }
            axios.get(apiUrl).then(resp => {
                setPasarInformacion(resp.data.results);
            });
        }
    }, [filtro, keyWord, filterType]);

    const click = () => {
        let apiUrl = `https://rickandmortyapi.com/api/character/?&${filterType}=${keyWord}`;
        axios.get(apiUrl).then(resp => {
            setPasarInformacion(resp.data.results);
            setLoading(false);
        }).catch(error => {
            console.error('Error al buscar:', error);
            setLoading(false);
            if (error.response && error.response.status === 404) {
                alert('Error 404: Personaje no encontrado');
            } else {
                alert('Ocurrió un error. Inténtalo de nuevo más tarde.');
            }
        });
    }

    const mostrar = () => {
        if (keyWord.trim() === "") {
            return <p>Error, no has escrito nada aún 😊</p>;
        }

        if (!loading && pasarInformacion.length === 0) {
            return (
                <p>
                    {pasarInformacion.length === 0
                        ? `Personaje no encontrado para "${keyWord}"`
                        : 'Error 404: Personaje no encontrado'}
                </p>
            );
        }

        return (
            pasarInformacion.map((personaje) => (
                <div className="bg-[#219ebc] flex flex-col text-center m-10 rounded-md " key={personaje.id}>
                    <img className="rounded-md" src={personaje.image} alt="" />
                    <p>Name: {personaje.name}</p>
                    <p>Gender: {personaje.gender}</p>
                    <p>Status: {personaje.status}</p>
                    <p>Origin: {personaje.origin.name}</p>
                    <p>Episodes where the character appears: {personaje.episode.length}</p>
                </div>
            ))
        );
    }

    const inicio_landpage = () => {
        return inicio.map((objeto) => (
            <div className="bg-[#219ebc] flex flex-col text-center m-10 rounded-md" key={objeto.id}>
                <img className="rounded-md" src={objeto.image} alt="" />
                <p>Name: {objeto.name}</p>
                <p>Gender: {objeto.gender}</p>
                <p>Status: {objeto.status}</p>
                <p>Origin: {objeto.origin.name}</p>
                <p>Episodes where the character appears: {objeto.episode.length}</p>
            </div>
        ));
    }

    return (
        <>
            <Menu />
            <div className="flex flex-col items-center w-full bg-[#023047]">
                <div className="flex justify-center gap-8 pt-12 pb-12">
                    <button disabled={filtro === 1} className={`${filtro === 0 ? 'bg-pink-400' : 'bg-[#8ecae6]'} w-10 h-10 rounded-md`} onClick={x => filtrarAtras(x)}>
                        <img src={atras} alt="" />
                    </button>
                    <input type="text" className="border-2 border-[#219ebc] bg-[#219ebc] pr-20 pl-20 rounded-md text-center text-[#ffb703] placeholder:text-[#ffb703]" value={keyWord} onChange={x => { changes(x) }} placeholder="Type Something" />
                    <select value={filterType} onChange={changeFilterType} className="rounded-md bg-[#8ecae6] pr-2 pl-2">
                        <option value="name">Nombre</option>
                        <option value="gender">Género</option>
                        <option value="location">Ubicación</option>
                    </select>
                    <button onClick={click} className="rounded-md bg-[#8ecae6] pr-20 pl-20">Buscar</button>
                    <button disabled={filtro === pasarInformacion.length} className={`${filtro === 6 ? 'bg-pink-400' : 'bg-[#8ecae6]'} w-10 h-10 rounded-md`} onClick={x => filtrarAdelante(x)}>
                        <img src={adelante} alt="" />
                    </button>
                </div>
                <div className="grid grid-cols-4 ml-20 mr-20 bg-[#023047] w-full">
                    {
                        loading ? inicio_landpage() : (
                            pasarInformacion.length > 0 ? mostrar() : <p>Vuelve más tarde</p>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default SearchBar;
