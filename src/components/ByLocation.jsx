import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../assets/Gear-0.2s-200px.gif';
import Swal from 'sweetalert2';

const LocationComponent = () => {
    const [residents, setResidents] = useState([]);
    const [location, setLocation] = useState(getRandomLocation());
    const [info, setInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

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

    const totalPages = Math.ceil(residents.length / pageSize);
    const visibleResidents = residents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className='flex flex-col items-center w-full bg-[#023047]'>
            <div className='mb-4'>
                <input type='number' className='h-10 w-30 p-2 border-2 rounded-md mt-5' onChange={(e) => handleChange(e)} min={1}/>
            </div>
            <div className='sm:flex sm:flex-col sm:items-center sm:mb-10 sm:mt-10 sm:bg-[#22764f] sm:w-[500px] border-2 rounded-md xs:mb-8 xs:mt-8 xs:bg-[#22764f] xs:w-[300px]'>
                <div className='mb-5 mt-2 flex justify-center'>
                    <h2 className='sm:text-3xl xs:text-lg font-bold text-green-300'>{info.dimension}</h2>
                </div>
                <div className='text-white sm:flex sm:gap-20 sm:mt-5 sm:mb-2 sm:border-none sm:flex-row xs:flex xs:flex-col xs:text-[12px] xs:border-2 xs:w-full xs:items-center'>
                    <p>Dimension: {info.name}</p>
                    {info.residents && <p>Population: {info.residents.length}</p>}
                    <p>Type: {info.type}</p>
                </div>
            </div>
            <div className='grid xl:grid-cols-4 sm:grid-cols-2 gap-8 '>
                {isLoading ? (
                    <img src={img} alt="Loading" />
                ) : (
                    info.residents?.length === 0 ? (
                        <h2 className='text-white mt-20 text-center w-full h-full'>None</h2>
                    ) : (
                        visibleResidents.map((resident) => (
                            <div key={resident.id} className=' bg-[#22764f] border-2 rounded-xl text-center relative'>
                                <img src={resident.image} alt='' className='mb-2 rounded-xl pb-5 w-full' />
                                <p>{`Nombre: ${resident.name}`}</p>
                                <p>{`Origen: ${resident.origin.name}`}</p>
                                <p className='pb-5'>{`Episodios en los que aparece: ${resident.episode.length}`}</p>
                                {resident.status === 'Alive' && (
                                    <div className='flex flex-row-reverse items-center justify-center gap-2 bg-black w-20 rounded-lg absolute top-5'>
                                        <p className='text-white'>{`${resident.status}`}</p>
                                        <div className='bg-green-300 w-3 h-3 rounded-2xl ' />
                                    </div>
                                )}
                                {resident.status === 'Dead' && (
                                    <div className='flex flex-row-reverse items-center justify-center gap-2 bg-black w-20 rounded-lg absolute top-5'>
                                        <p className='text-white'>{`${resident.status}`}</p>
                                        <div className='bg-red-700 w-3 h-3 rounded-2xl' />
                                    </div>
                                )}
                                {resident.status !== 'Alive' && resident.status !== 'Dead' && (
                                    <div className='flex flex-row-reverse items-center justify-center gap-2 bg-black w-32 rounded-lg absolute top-5'>
                                        <p className='text-white'>{`${resident.status}`}</p>
                                        <div className='bg-yellow-300 w-3 h-3 rounded-2xl' />
                                    </div>
                                )}
                            </div>
                        ))
                    )
                )}
            </div>
            <div className='mt-6 mb-6'>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='w-32 text-white cursor-pointer'>Previous</button>
                <span className='text-green-700'>{`Page ${currentPage} of ${totalPages}`}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className='w-32 text-white cursor-pointer'>Next</button>
            </div>
        </div>
    );
};

export default LocationComponent;
