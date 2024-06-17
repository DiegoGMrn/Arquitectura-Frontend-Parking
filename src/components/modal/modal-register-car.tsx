"use client";
import axios from 'axios';
import React, { useState } from 'react';
import { BsFillBackspaceFill } from "react-icons/bs";
import { useUserStore } from '@/store/UserStorage';

import { useRouter } from 'next/navigation'

interface ModalLoginProps {
    isOpen: boolean;
    onClose: () => void;
}



const ModalRegisterCar: React.FC<ModalLoginProps> = ({ isOpen, onClose }) => {
    const router = useRouter()

    const {id_user, token} = useUserStore();
    const [patente, setPatente] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [dateHourStart, setDateHourStart] = useState<string>('');
    const [idZone, setIdZone] = useState<number>(1);

    const [isModalSigninOpen, setIsModalSigninOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleClose = () => {
        onClose();
    };
    const openModalSignin = () => {
        setIsModalSigninOpen(true);
    };
    const closeModalSignin = () => {
        setIsModalSigninOpen(!isModalSigninOpen);
    };


    const fetchCreateBooking = async (dateHourStart: string ,patente: string, idZone: number) => {
        setLoading(true);
        setIsError(false);
        try {
            const response = await axios.post(`https://backend-plataforma.onrender.com/api/login`, {
                dateHourStart: dateHourStart,
                patente: patente,
                idZone: idZone,
                idUser: id_user,

            });
            console.log(response.data);
            console.log(response.data.role)
            setLoading(false);

        }
        catch (error) {
            setLoading(false);
            setIsError(true);
            setErrorMessage("Error al crear reserva, intente de nuevo.");
            console.log("Error: ", error);
        };
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-20 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                    <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50"></div>
                    <div className="relative z-30 h-[90%] w-[60%] p-4 mx-auto bg-white rounded-md shadow-lg flex items-center justify-center">
                        <div className="absolute inset-0 bg-cover blur-sm bg-center blur-smte bg-gradient-to-r from-transparent via-white to-white  z-10" style={{ backgroundImage: "url('/background-register.jpg')" }}></div>
                        <div className="relative z-20 w-[50%] p-10 ">
                            <div className="flex justify-end">
                                <button onClick={handleClose}>
                                    <BsFillBackspaceFill size={35} color='white' />
                                </button>
                            </div>
                            <div className="flex flex-col justify-center my-auto items-center">
                                <div className='text-white font-bold text-5xl flex items-center text'
                                    style={{ textShadow: '4px 4px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000' }}>
                                    Registrar auto
                                </div>
                                <input
                                    type="text"
                                    placeholder="Patente"
                                    className="p-2 mx-5 my-2 border border-gray-300 rounded-md text-black font-semibold w-full"
                                    onChange={(event) => setPatente(event.target.value)} />
                            
                                {/* Input de horas */}
                                <input type="time" id="llegada" name="llegada" min="06:00" max="20:00"
                                    className="p-2 mx-5 my-2 border border-gray-300 rounded-md  font-semibold w-full text-gray-500" placeholder='Hora de llegada' required />
                                {/* selector de zona 1, zona 2 y zona 3 */}
                                <select className="p-2 mx-5 my-2 border border-gray-300 rounded-md text-black font-semibold w-full">
                                    <option value="1">Zona 1</option>
                                    <option value="2">Zona 2</option>
                                    <option value="3">Zona 3</option>
                                </select>
                                <button disabled={loading} className="bg-yellow-500 text-black p-2 m-2 rounded-md w-full font-bold" onClick={() => fetchCreateBooking(dateHourStart, patente, idZone)}>{loading ? 'Cargando...' : 'Registrar auto'}</button>
                                {isError && (
                                    <div className="flex justify-center items-center h-12 text-red-500 font-bold">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalRegisterCar;