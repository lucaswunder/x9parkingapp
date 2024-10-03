import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';


const LoggedInPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Se não estiver autenticado, redireciona para o login
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null; // Ou pode retornar um loader enquanto redireciona
    }

    const handleLogout = () => {
        logout(); // Chama a função de logout
        navigate('/login'); // Redireciona para a página de login após logout
    };

    return (
        <div className="flex flex-col min-h-screen justify-between items-center bg-white">
            {/* Header with back button */}
            <header className="w-full p-4 flex justify-start">
                <button onClick={handleLogout}>
                    <ArrowLeftStartOnRectangleIcon className="h-8 w-7 text-red" />
                </button>
                <p className="pt-1 h-8 w-7 text-red" >Sair</p>
            </header>

            {/* Main content */}
            <main className="flex flex-col items-center justify-center flex-grow px-6">
                {/* Placeholder for Logo */}
                <div className="mb-6">
                    {/* Replace this div with your logo */}
                    <img src={logo} alt="Logo" className="h-64 w-64 object-contain" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-1 text-blue-600">Escolha uma opção abaixo</h1>
                <p className="text-sm text-gray-500 mb-10"></p>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate('/scan-qr')}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                    >
                        Ler QR Code
                    </button>
                    <button
                        onClick={() => navigate('/report')}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                    >
                        Denunciar
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

export default LoggedInPage;
