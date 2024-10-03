import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import QrUserComponent from '../components/qruser.component';
import logo from '../assets/logo.png';

interface UserData {
    id: string;
    motorista: string;
    placas: string;
    data: string;
    cidade: string;
    uf: string;
}

const QRCodePage: React.FC = () => {
    const [qrData, setQrData] = useState<string | null>(null);
    const [userFound, setUserFound] = useState<UserData | null | undefined>(null);
    const qrCodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [qrHasError, setQrHasError] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const qrCodeRegionId = 'reader';

    const active_users: UserData[] = [
        {
            id: "1",
            motorista: "lohana costa santos",
            placas: "IJB0JU",
            data: "2024-05-01",
            cidade: "imbé",
            uf: "Rio Grande do Sul"
        },
        {
            id: "2",
            motorista: "lucas",
            placas: "AJB0JU",
            data: "2024-05-01",
            cidade: "tramandai",
            uf: "Santa Catarina"
        }
    ]


    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const createQrCodeScanner = () => {
            qrCodeScannerRef.current = new Html5QrcodeScanner(
                qrCodeRegionId,
                {
                    fps: 10,
                    qrbox: 250,
                    formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
                },
                false
            );
            qrCodeScannerRef.current.render(
                handleScanSuccess,
                handleScanFailure
            );
        };

        createQrCodeScanner();

        return () => {
            if (qrCodeScannerRef.current) {
                qrCodeScannerRef.current.clear();
            }
        };
    }, []);

    if (!isAuthenticated) {
        return null;
    }

    const findActiveUsers = async (decodedText: string | null) => {
        console.log(decodedText);

        const decodedUser = JSON.parse(decodedText || "");

        let activeUser = active_users.find(user => user.id === decodedUser.id);

        console.log('found', activeUser);

        if (!activeUser) activeUser = undefined;

        setUserFound(activeUser)
    }

    const handleScanSuccess = async (decodedText: string) => {
        await setQrData(decodedText);

        if (qrCodeScannerRef.current) {
            qrCodeScannerRef.current.pause();
        }

        console.log(qrData);

        await findActiveUsers(decodedText)
    };
    // Optional: Called on scan failure (e.g., no QR code detected)
    const handleScanFailure = (error: any) => {
        // console.warn(`Scan failed: ${error}`);
        setQrHasError(true)
    };
    // Reset the QR scanner and clear the data
    const handleReset = () => {
        setQrData(null);
        setQrHasError(false)
        setUserFound(null)
    };
    return (
        <div className="flex flex-col min-h-screen justify-between items-center bg-white">
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


                {/* QR Code Reader */}
                <div id={qrCodeRegionId} className="w-full max-w-xs bg-gray-100 p-4 rounded-lg shadow-md" />
                <div className="mt-4 text-center">
                    {qrHasError && !qrData && <p className={`w-full pl-10 pr-10 py-2 rounded-md ${qrHasError ? 'text-red-900' : ''} }`}>Não foi possivel ler o QR Code</p>}
                </div>

                {userFound && qrData && (
                    <QrUserComponent userData={userFound} />
                )}

                {/* Buttons */}
                <div className="mt-7 flex space-x-4">
                    <button
                        onClick={handleReset}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                    >
                        Limpar
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
export default QRCodePage;
