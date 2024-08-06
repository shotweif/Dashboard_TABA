import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import startPro from '../images/startPro.png';

// import ImgTransaccion from '../ico/Transaccion.svg';
// import ImgBanck from '../ico/Bancço.svg';
// import ImgNone from '../ico/None.svg';

const NavBar: React.FC = () => {
    const startPro = process.env.PUBLIC_URL + '/images/startPro.png';
    const ImgTransaccion = process.env.PUBLIC_URL + '/ico/Transaccion.svg';
    const ImgBanck = process.env.PUBLIC_URL + '/ico/Banco.svg';
    const ImgNone = process.env.PUBLIC_URL + '/ico/None.svg';
    const ImgTest = process.env.PUBLIC_URL + '/ico/CodeTest.svg';

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
    const handleTest = () => {
        navigate('/Pruebas');
    };

    return (
        <div className='h-screen w-20 p-4 sticky top-0 left-0'>
            <img src={startPro} className='w-full' />
            <ul className='ist-none mt-2.5'>
                <li className='p-2 flex justify-center items-center rounded st-hv-cl duration-100 mb-0.5' title='' onClick={handleOpcion2}>
                    <img src={ImgBanck} className='w-4/6' />
                </li>
                <li className='p-2 flex justify-center items-center rounded st-hv-cl duration-100 mb-0.5' title='Monitoreo de transacciones WIP' onClick={handleTransaccion}>
                    <img src={ImgTransaccion} className='w-4/6' />
                </li>
                <li className='p-2 flex justify-center items-center rounded st-hv-cl duration-100 mb-0.5' title='' onClick={handleOpcion3}>
                    <img src={ImgNone} className='w-4/6' />
                </li>
                <li className='p-2 flex justify-center items-center rounded st-hv-cl duration-100 mb-0.5' title='' onClick={handleTest}>
                    <img src={ImgTest} className='w-4/6' />
                </li>
            </ul>
        </div>
    );
};

export default NavBar;