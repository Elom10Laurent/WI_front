import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <FaceFrownIcon className="w-10 text-gray-400" />

            <h1 className="text-4xl font-bold text-red-500">403 - Unauthorized</h1>
            <p className="text-lg mt-4 text-gray-600">
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </p>
            <button
                onClick={goBack}
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition"
            >
                Retour
            </button>
        </div>
    );
};

export default Unauthorized;
