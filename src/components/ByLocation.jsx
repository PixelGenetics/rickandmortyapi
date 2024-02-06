import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../assets/Gear-0.2s-200px.gif';
import Swal from 'sweetalert2';

const LocationComponent = () => {
    const [residents, setResidents] = useState([]);
    const [location, setLocation] = useState(getRandomLocation());
    const [info, setInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData(location);
    }, [location]);

    const handleChange = (e) => {
        const newLocation = parseInt(e.target.value);
        if (newLocation >= 1 && newLocation <= 126) {
            setLocation(newLocation);
        } else {
            Swal.fire('Error! Ingresar número entre 1 y 126');
        }
    };

    async function fetchData(location) {
        try {
            setIsLoading(true);
            const locationResponse = await axios.get(`https://rickandmortyapi.com/api/location/${location}`);
            const residentsEndpoints = locationResponse.data.residents;
            setInfo(locationResponse.data);

            const residentsData = [];

            for (const residentEndpoint of residentsEndpoints) {
                const residentResponse = await axios.get(residentEndpoint);
                residentsData.push(residentResponse.data);
            }

            setResidents(residentsData);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        } finally {
            setIsLoading(false);
        }
    }

    function getRandomLocation() {
        return Math.floor(Math.random() * 126) + 1;
    }

    return (
        <div className='flex flex-col items-center w-full bg-[#023047]'>
            <div className='mb-4'>
                <input
                    type='number'
                    className='h-10 w-30 p-2 border-2 rounded-md mt-5'
                    onChange={(e) => handleChange(e)}
                    min={1}
                />
            </div>
            <div className='text-white md:mb-4 md:flex md:gap-10 md:border-2 md:h-10 md:w-[600px] md:justify-center md:items-center  md:bg-[#22764f] md:rounded-md xs:h-[100px] xs:w-[200px] xs:bg-[#22764f] xs:mb-4 xs:border-2 xs:rounded-md xs:gap-4 xs:items-center'>
                <p>Dimension: {info.name}</p>
                {info.residents && <p>Population: {info.residents.length}</p>}
                <p>Type: {info.type}</p>
            </div>
            <div className='grid xl:grid-cols-4 sm:grid-cols-2 gap-8 '>
            {isLoading ? (
    <img src={img} alt="Loading" />
) : (
    info.residents?.length === 0 ? (
        <h2 className='text-white mt-20 ml-[300px] text-center w-full h-full'>No characters known by the creators</h2>
    ) : (
        residents.map((resident) => (
            <div key={resident.id} className=' bg-[#22764f] border-2 rounded-xl text-center'>
                <img src={resident.image} alt='' className='mb-2 rounded-xl pb-5 w-full' />
                <p>{`Nombre: ${resident.name}`}</p>
                <p>{`Status: ${resident.status}`}</p>
                <p>{`Origen: ${resident.origin.name}`}</p>
                <p className='pb-5'>{`Episodios en los que aparece: ${resident.episode.length}`}</p>
            </div>
        ))
    )
)}

        </div>
        </div>
    );
};

export default LocationComponent;
