
// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Inicio from './view/Inicio';
import TransaccionesWEP from './view/TransaccionesWEP';
import Loader from './view/Loader';
import './chartSetup';
import './tailwind.min.css'

function App() {
    const [stylesLoaded, setStylesLoaded] = useState(false);

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './tailwind.min.css';
        link.onload = () => setStylesLoaded(true);
        document.head.appendChild(link);
    }, []);

    return (
        <div className='flex w-full'>
            <Router>
            <nav className=''>
                <NavBar />
            </nav>
                <div className='st-sl-app w-full'>
                    {stylesLoaded ? (
                            <Routes>
                                <Route path="/" element={<TransaccionesWEP />} />
                                <Route path="/Inicio" element={<Inicio />} />
                            </Routes>
                    ) : (
                        <Loader />
                    )}
                </div>
        </Router>
        </div>
    );
}

export default App;
