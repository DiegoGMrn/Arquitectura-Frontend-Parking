"use client";

import axios from "axios";
import React, { useState } from "react";
import { BsFillBackspaceReverseFill } from "react-icons/bs";
import { useUserStore } from "@/store/UserStorage";
import { gql, useMutation } from "@apollo/client";

interface ModalSigninProps {
    isOpen: boolean;
    onClose: () => void;
}
const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    createUser(createUserInput: { name: $name, email: $email, password: $password }) {
      success
    }
  }
`;

const ModalSignin: React.FC<ModalSigninProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { setIdUser, setEmailUser } = useUserStore();
    
    const [registerUser, { loading, error }] = useMutation(REGISTER_MUTATION);

    const handleClose = () => {
        onClose();
    };

    const openModalLogin = () => {
        onClose();
    }

    const handleRegister = async () => {
        try {
          const { data } = await registerUser({
            variables: {
              name: name,
              email: email,
              password: password
            }
          });
          if (data.createUser.success) {
            //  Para manejar el éxito del registro
            setIdUser(data.createUser.id);
            setEmailUser(data.createUser.email);
            handleClose();
          } else {
            // Caso de un registro fallido
            console.error("Registro fallido");
          }
        } catch (error) {
          // Manejar errores
          console.error("Error al registrar:", error);
        }
      };

    
      /*
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
    }*/

    return (
        <>
            {isOpen && (
                <div className="">
                   
                    <div className="">
                        <div className="col-span-1 flex flex-col">
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


                                    <button className="bg-yellow-500 text-white p-2 m-2 rounded-md w-full font-bold" onClick={handleRegister}>Registrarse</button>
                                    <button className="bg-blue-500 text-white p-2 m-2 rounded-md w-full font-bold" onClick={openModalLogin}>Iniciar sesion</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default ModalSignin;