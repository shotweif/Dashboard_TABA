// Loader.tsx
import React from 'react';
import startPro  from '../images/startPro.png';

const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 st-int-stl">
            <div className="loader">
                <img src={startPro} />
            </div>
        </div>
    );
};

export default Loader;
