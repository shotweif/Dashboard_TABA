// Loader.tsx
import React from 'react';
// import startPro from '../images/startPro.png';

const Loader: React.FC = () => {
    const startPro = process.env.PUBLIC_URL + '/images/startPro.png';

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 st-int-stl">
            <div className='loader-container'>
                <img src={startPro} className='logoPro' />
                <div className="loader"></div>
                <h4>Cargando...</h4>
            </div>
        </div>
    );
};

export default Loader;
