
// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Inicio from './view/Inicio';
import Loader from './view/Loader';
import './chartSetup';

function App() {
    const [stylesLoaded, setStylesLoaded] = useState(false);

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
        link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
        link.onload = () => setStylesLoaded(true);
        document.head.appendChild(link);
    }, []);

    return (
        <div className='flex w-full'>
            <Router>
            <nav>
                <NavBar />
            </nav>
                <div className='st-sl-app w-full'>
                    {stylesLoaded ? (
                            <Routes>
                                <Route path="/" element={<Inicio />} />
                                <Route path="/Loader" element={<Loader />} />
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
