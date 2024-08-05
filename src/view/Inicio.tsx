import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImgTransaccion from '../ico/Transaccion.svg';
import ImgNone from '../ico/None.svg';

const Inicio: React.FC = () => {
    // Navegacion
    const navigate = useNavigate();
    const handleTransaccion = () => {
        navigate('/');
    };
    const handleOpcion2 = () => {
        navigate('/Inicio');
    };
    const handleOpcion3 = () => {
        navigate('/Loader');
    };
    return (
        <div className=''>
            <div className='flex justify-center items-center h-20'>
                <h1 className='text-3xl font-semibold text-secondary text-green-600'>DashBoard</h1>
            </div>
            <div className='flex justify-center items-center my-2.5'>

                <div className="bg-card w-80 m-3 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400" onClick={handleTransaccion}>
                    <img src={ImgTransaccion} className='w-1/4' />
                    <h2>Monitoreo de transacciones WIP</h2>
                </div>

                <div className="bg-card w-80 m-3 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 col-span-1 border-l-4 border-secondary bg-white border-green-400" onClick={handleOpcion3}>
                    <img src={ImgNone} className='w-1/4' />
                    <h2>pagina de carga</h2>
                </div>
            </div>
        </div>
    );
};

export default Inicio;