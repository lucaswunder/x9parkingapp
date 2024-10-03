import React, { useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import logo from '../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Denunciar: React.FC = () => {
    const [image1, setImage1] = useState<string | null>(null);
    const [image2, setImage2] = useState<string | null>(null);
    const [isFirstImageTaken, setIsFirstImageTaken] = useState(false);
    const navigate = useNavigate();

    const webcamRef = React.useRef<Webcam>(null);

    const notify = (msg: string) => toast(msg)

    // Função para capturar a imagem da webcam
    const capturePhoto = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (!isFirstImageTaken && imageSrc) {
            setImage1(imageSrc);
            setIsFirstImageTaken(true);
        } else if (imageSrc) {
            setImage2(imageSrc);
        }
    }, [isFirstImageTaken]);

    // Função para simular o envio das fotos para uma API fake
    const handleRegister = async () => {
        if (image1 && image2) {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        image1,
                        image2,
                    }),
                });

                if (response.ok) {
                    notify('Denúncia registrada com sucesso!');
                    navigate('/loggedin');
                } else {
                    notify('Falha ao registrar denúncia. Tente novamente.');
                }
            } catch (error) {
                notify('Erro ao conectar com a API. Verifique sua conexão.');
            }
        } else {
            notify('Por favor, tire as duas fotos antes de registrar.');
        }
    };

    const handleReset = async () => {
        setImage1(null);
        setImage2(null);
        setIsFirstImageTaken(false);
        notify('Imagens resetadas com sucesso.')
    };


    return (
        <div className="flex flex-col min-h-screen justify-between items-center bg-white">
            <ToastContainer />
            {/* Header with back button */}
            <header className="w-full p-4 flex justify-start">
                <button onClick={() => navigate('/loggedin')}>
                    <ArrowLeftIcon className="h-8 w-7 text-red" />
                </button>
            </header>

            <main className="flex flex-col items-center justify-center flex-grow px-6">
                {/* Placeholder for Logo */}
                <div className="mb-7">
                    {/* Replace this div with your logo */}
                    <img src={logo} alt="Logo" className="h-48 w-48 object-contain" />
                </div>

                {/* Webcam */}
                {!image1 || !image2 ? (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full max-w-xs border-2 border-gray-300"
                    />
                ) : null}

                {/* Exibição das imagens capturadas */}
                <div className="flex gap-4 mt-4">
                    {image1 && (
                        <div className="flex flex-col items-center">
                            <img src={image1} alt="Foto 1" className="w-24 h-24 border-2 border-gray-300" />
                            <p>Placa Frente</p>
                        </div>
                    )}
                    {image2 && (
                        <div className="flex flex-col items-center">
                            <img src={image2} alt="Foto 2" className="w-24 h-24 border-2 border-gray-300" />
                            <p>Placa Traseira</p>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="mt-7 flex space-x-4">
                    {/* Botão para capturar fotos */}
                    {!image2 && (
                        <button
                            onClick={capturePhoto}
                            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                        >
                            {isFirstImageTaken ? 'Capturar Traseira' : 'Capturar Frente'}
                        </button>
                    )}
                    <button
                        onClick={handleRegister}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                    >
                        Registrar
                    </button>
                    {image1 && (
                        <button
                            onClick={handleReset}
                            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                        >
                            Limpar
                        </button>
                    )}

                </div>

            </main>
            {/* Footer */}
            <footer className="w-full py-4 text-center border-t">
                <p className="text-sm text-gray-500">© 2024 LW Tech</p>
            </footer>
        </div>
    );
};

export default Denunciar;
