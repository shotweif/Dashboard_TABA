
// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './view/Inicio';
import Loader from './view/Loader';
import './chartSetup'; 

function App() {
    const [stylesLoaded, setStylesLoaded] = useState(false);

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
        link.onload = () => setStylesLoaded(true);
        document.head.appendChild(link);
    }, []);

    return (
        <div className='st-sl-app'>
            {stylesLoaded ? (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/Loader" element={<Loader />} />
                    </Routes>
                </BrowserRouter>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default App;
