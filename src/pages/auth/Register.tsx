import Logo from "../../assets/LOGO.svg"
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    console.log(import.meta.env.VITE_API_URL)

    const submitRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            password: password,
        }
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}users`, data, {
                headers: { 'Content-Type': 'application/json' },
            });

            toast.success('Enregistrment reussie !')
            navigate('/login');
        } catch (error) {
            toast.error('Enregistrment échoué')
            console.error('Erreur réseau:', error);
        }
    };
    return (
        <section className="py-4 md:py-8 :bg-gray-800">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 :text-white">
                    <img className="w-32 h-32 mr-2" src={Logo} alt="wone innov logo" />
                </a>
                <Toaster />
                <div className="w-full bg-white rounded-lg shadow border sm:max-w-md xl:p-0 :bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white text-center">
                            S'enregistrer
                        </h1>
                        <h2 className="text-center"> Veuillez vous Enregistrer</h2>
                        <form onSubmit={submitRegistration} className="space-y-4 md:space-y-6" method="POST" action="/auth/login/">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    name="login"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                                    placeholder="amah@"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Email Address</label>
                                <input
                                    type="email"
                                    name="login"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                                    placeholder="amah@gmail.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                                    required
                                />
                            </div>
                            {/* <div className="flex items-center justify-between">
                                <a href="/auth/forgot-password" className="text-sm font-medium text-green-600 hover:underline :text-green-500">  Mot de passe oublié ?</a>
                            </div> */}
                            <button
                                type="submit"
                                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full">
                                connecter
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
