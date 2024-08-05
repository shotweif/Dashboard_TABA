import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import startPro from '../images/startPro.png';

import ImgTransaccion from '../ico/Transaccion.svg';
import ImgBanck from '../ico/Banco.svg';
import ImgNone from '../ico/None.svg';

const NavBar: React.FC = () => {
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
        <div className='h-full bg-lime-600 pl-4 pr-4 pt-4'>
            <img src={startPro} className='w-16' />
            <ul className='ist-none mt-2.5'>
                <li className='p-2 flex justify-center items-center rounded st-hv-cl duration-100 mb-0.5' title='' onClick={handleOpcion2}>
                    <img src={ImgBanck} className='w-2/4' />
                </li>
                <li className='p-2 flex justify-center items-center rounded st-hv-cl duration-100 mb-0.5' title='Monitoreo de transacciones WIP' onClick={handleTransaccion}>
                    <img src={ImgTransaccion} className='w-2/4' />
                </li>
                <li className='p-2 flex justify-center items-center rounded st-hv-cl duration-100 mb-0.5' title='' onClick={handleOpcion3}>
                    <img src={ImgNone} className='w-2/4' />
                </li>

            </ul>
        </div>
    );
};

export default NavBar;