// Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="loader">
                <img src="https://play-lh.googleusercontent.com/87FV6akNtH7yN_7ObbTMaqvjJmECIKOwZd3i-Oo0ETK77CqkuKaf4ud2gqZ13UxvxDWq" />
            </div>
        </div>
    );
};

export default Loader;
