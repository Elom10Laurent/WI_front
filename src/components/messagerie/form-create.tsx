'use client';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCreate } from '../../lib/hooks';


export default function MessagerieCreateForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const { create, loading, response } = useCreate({
        endpoint: `${import.meta.env.VITE_API_URL}publications`,
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('file', file);
        }

        await create(formData); 
    };
    if (response) {
        navigate('/dashboard');
    }

    return (
        <div>
            <h1 className={`mb-8 text-xl md:text-2xl`}>
                Créer un post
            </h1>

            <form onSubmit={handleSubmit} className='max-w-3xl' >
                <div className="rounded-md bg-green-50 p-4 md:p-6">
                    <div className="mb-4">
                        <label htmlFor="title" className="mb-2 block text-sm font-medium">
                            Titre de votre Post
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="peer block w-full rounded-md border border-gray-200 py-2  pl-4 text-sm outline-2 placeholder:text-gray-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="mb-2 block text-sm font-medium">
                            contenu de votre Post
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <textarea
                                    id="content"
                                    name="content"
                                    placeholder="..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* Ajouter une image */}
                        <div>
                            <label>Télécharger une:</label>
                            <input type="file" onChange={handleImageChange} />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        to="/dashboard"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Retour
                    </Link>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create'}
                    </button>                </div>
            </form>
        </div>

    );
}