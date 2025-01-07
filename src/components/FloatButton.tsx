import { PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';

const FloatButton: React.FC = () => {
    return (
        <Link to={'messagerie/create'} className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-3 shadow-lg  focus:ring-4 focus:ring-green-300 hover:scale-110 transition-transform cursor-pointer">
            <PlusIcon className="h-6 w-6" />
        </Link>
    );
};

export default FloatButton;
