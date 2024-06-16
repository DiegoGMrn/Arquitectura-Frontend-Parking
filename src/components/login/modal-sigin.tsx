"use client";

import axios from "axios";
import React, { useState } from "react";
import { BsFillBackspaceReverseFill } from "react-icons/bs";
import { useUserStore } from "@/store/UserStorage";

interface ModalSigninProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalSignin: React.FC<ModalSigninProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { setIdUser, setEmailUser } = useUserStore();

    const handleClose = () => {
        onClose();
    };
    const fetchSigin = async (name: string, email: string, password: string) => {
        try {
            const response = await axios.post(`https://backend-plataforma.onrender.com/api/register`, {
                email: email,
                password: password,
                name: name,
            });
            setIdUser(response.data.id);
            setEmailUser(response.data.email);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                    <div className="fixed inset-0 transition-opacity"></div>
                    <div className="z-50 h-[70%] w-[60%] p-4 mx-auto bg-white rounded-md shadow-lg grid grid-cols-3 gap-4">
                        <div className="col-span-1 flex flex-col">
                            <div className="flex justify-start">
                                <button onClick={handleClose}>
                                    <BsFillBackspaceReverseFill size={35} color='emerald' />
                                </button>
                            </div>
                            <div className="flex flex-col justify-center my-auto items-center">
                                <div className='text-black font-bold text-2xl flex items-center'>Registro</div>
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        className="p-2 mx-5 my-2 border border-gray-300 rounded-md text-black font-semibold w-full"
                                        onChange={(event) => setName(event.target.value)} />

                                    <input
                                        type="email"
                                        placeholder="Correo Electrónico"
                                        className="p-2 mx-5 my-2 border border-gray-300 rounded-md text-black font-semibold w-full"
                                        onChange={(event) => setEmail(event.target.value)} />

                                    <input
                                        type="password"
                                        placeholder="Contraseña"
                                        className="p-2 mx-5 my-2 border border-gray-300 rounded-md text-black font-semibold w-full"
                                        onChange={(event) => setPassword(event.target.value)} />


                                    <button className="bg-blue-500 text-white p-2 m-2 rounded-md w-full font-bold" onClick={() => fetchSigin(name, email, password)}>Registrarse</button>
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col justify-center items-center rounded-md p-3">
                            <img src={'/background-reg.jpg'} alt="login" className="w-full h-full" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default ModalSignin;