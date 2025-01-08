import { useState } from "react";
import Logo from "../../assets/LOGO.svg"
import { useAuth } from "../../lib/userContext";
import { toast, Toaster } from "sonner";
const Login = () => {
    const { login } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await login(email, password, (message) => {
            toast.error(message);
        });
    };
    return (
        <section className="py-4 md:py-8 :bg-gray-800">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 :text-white">
                    <img className="w-32 h-32 mr-2" src={Logo} alt="wone innov logo" />
                </a>
                <Toaster/>
                <div className="w-full bg-white rounded-lg shadow border sm:max-w-md xl:p-0 :bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white text-center">
                            Connexion
                        </h1>
                        <h2 className="text-center"> Veuillez vous connecter pour accéder aux informations.</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" method="POST" action="/auth/login/">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Email Address</label>
                                <input
                                    type="email"
                                    name="login"
                                    id="email"
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
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                            <p className="text-sm text-center text-gray-500 :text-gray-400">
                                Vous n'êtes pas encore membre ? <a href="/auth/register" className="font-medium text-green-600 hover:underline :text-green-500">S'INSCRIRE</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
