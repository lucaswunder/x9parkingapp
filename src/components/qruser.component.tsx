import React from 'react';
import avatar from '../assets/girl-avatar.png';
// interface UserData {
//     id: string;
//     motorista: string;
//     placas: string;
//     data: string;
//     cidade: string;
// }

const captalize = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const QrUserComponent: React.FC<{ userData: any }> = ({ userData }) => {
    console.log(userData);

    return (
        <div className="flex items-center p-4 rounded-lg"> {/* Container */}
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mr-4"> {/* AvatarPlaceholder */}
                <img src={avatar} alt="Logo" className="h-48 w-48 object-contain" />
            </div>
            <div> {/* Content */}
                <h2 className="text-xl font-semibold mb-1">Informações</h2>
                <p className="text-gray-600 text-sm">
                    <p className='font-semibold'>Motorista:<text className='font-normal'> {captalize(userData.motorista)}</text></p>
                    <p className='font-semibold'>Placas:<text className='font-normal'> {userData.placas.toUpperCase()}</text></p>
                    <p className='font-semibold'>Data:<text className='font-normal'> {userData.data}</text></p>
                    <p className='font-semibold'>Cidade:<text className='font-normal'> {captalize(userData.cidade)}</text></p>
                    <p className='font-semibold'>Estado:<text className='font-normal'> {captalize(userData.uf)}</text></p>
                </p>
            </div>
        </div>
    );
};

export default QrUserComponent;
