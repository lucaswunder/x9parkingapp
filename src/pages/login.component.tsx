/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, EyeIcon, CheckIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginResult = await login(email, password);

        if (!loginResult) setIsPasswordError(true);
    };

    return (
        <div className="flex flex-col min-h-screen justify-between items-center bg-white">
            {/* Header with back button */}
            <header className="w-full p-4 flex justify-start">
                <button onClick={() => navigate('/')}>
                    <ArrowLeftIcon className="h-6 w-6 text-black" />
                </button>
            </header>

            {/* Main content */}
            <main className="flex flex-col items-center justify-center flex-grow px-6">
                {/* Placeholder for Logo */}
                <div className="mb-6">
                    {/* Replace this div with your logo */}
                    <img src={logo} alt="Logo" className="h-64 w-64 object-contain" />

                </div>

                {/* Title and subtitle */}
                <h1 className="text-3xl font-bold mb-1 text-blue-600">Entre na sua conta</h1>
                <p className="text-sm text-gray-500 mb-4"></p>

                {/* Form */}
                <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
                    {/* Email input */}
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="qualqueremail@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <CheckIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    </div>

                    {/* Password input */}
                    <div className={`relative ${isPasswordError ? 'border-red-500' : ''}`}>
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="1234"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pl-10 pr-10 py-2 border ${isPasswordError ? 'border-red-500' : ''} rounded-md text-gray-900 focus:outline-none focus:ring-2 ${isPasswordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                        </button>
                    </div>

                    {/* Error Message */}
                    {isPasswordError && (
                        <div className="flex justify-between text-red-500 text-sm mt-1">
                            <span>Wrong password</span>
                            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
                        </div>
                    )}

                    {/* Login button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
            </main>

            {/* Footer */}
            <footer className="w-full py-4 text-center border-t">
                <p className="text-sm text-gray-500">© 2024 LW Tech</p>
            </footer>
        </div>
    );
};

export default LoginPage;
