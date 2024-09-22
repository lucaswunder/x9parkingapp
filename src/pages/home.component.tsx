import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';


const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen justify-between items-center bg-white">
            {/* Header with back button */}
            <header className="w-full p-4 flex justify-start">
                <button onClick={() => navigate(-1)}>
                    {/* <ArrowLeftIcon className="h-6 w-6 text-black" /> */}
                </button>
            </header>

            {/* Main content */}
            <main className="flex flex-col items-center justify-center flex-grow">
                {/* Placeholder for Logo */}
                <div className="mb-6">
                    {/* Replace this div with your logo image */}
                    <img src={logo} alt="Logo" className="h-64 w-64 object-contain" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-1 text-blue-600">Estacionamento legal</h1>
                <p className="text-sm text-gray-500 mb-10"></p>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700" onClick={() => navigate('/login')}>
                        Entrar
                    </button>
                    <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                        Registre-se
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-4 text-center border-t">
                <p className="text-sm text-gray-500">© 2024 LW Tech</p>
            </footer>
        </div>
    );
};

export default HomePage;
