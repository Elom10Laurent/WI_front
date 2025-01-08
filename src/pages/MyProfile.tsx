import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../lib/userContext';

type FormData = {
    username: string;
    fullName: string;
    email: string;
    jobPost: string;
    organization: string;
    location: string;
    biography: string;
    file: string | File | null;
};

const MyProfile = () => {
    const { user } = useAuth();
    const [imagePreview, setImagePreview] = useState<string>("/src/assets/icons8-tortue-ninja-64.png");
    // const [imageFile, setImageFile] = useState<File | null | undefined>(null);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        fullName: '',
        email: '',
        jobPost: '',
        organization: '',
        location: '',
        biography: '',
        file: null,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}users/${user?.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const userData = response.data;
                setFormData({
                    username: userData.username || '',
                    fullName: userData.fullName || '',
                    email: userData.email || '',
                    jobPost: userData.jobPost || '',
                    organization: userData.organization || '',
                    location: userData.location || '',
                    biography: userData.biography || '',
                    file: userData.file || '' // File not directly handled from server
                });
                if (userData.profileImage) {
                    setImagePreview(userData.profileImage);
                }
                // console.log(userData.file)
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
            }
        };
        if (user?.id) {
            fetchUserData();
        }

    }, [user?.id]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
        setFormData((prevFormData) => ({ ...prevFormData, file }));
        event.target.value = '';
        // const file = event.target.files ? event.target.files[0] : null;
        // setFormData((prevFormData) => ({ ...prevFormData, file }));
    };

    // const handleImageRemove = () => {
    //     setImagePreview(null);
    //     setImageFile(null);
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('fullName', formData.fullName || '');
        formDataToSend.append('email', formData.email || '');
        formDataToSend.append('jobPost', formData.jobPost || '');
        formDataToSend.append('organization', formData.organization || '');
        formDataToSend.append('location', formData.location || '');
        formDataToSend.append('biography', formData.biography || '');

        if (formData.file instanceof File) {
            formDataToSend.append('file', formData.file); // Ajoute un fichier
        } else if (formData.file) {
            formDataToSend.append('fileUrl', formData.file); // Ajoute un lien de fichier si c'est une chaîne
        }


        // formDataToSend.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });



        try {
            await axios.patch(
                `${import.meta.env.VITE_API_URL}users/${user?.id}`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            toast.success('Utilisateur mis à jour avec succès');
        } catch (error) {
            toast.error('La mise à jour a échoué, veuillez réessayer');
            console.error('Erreur lors de la mise à jour:', error);
        }
    };


    const deleteCount = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}users/${user?.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('Compte utilisateur supprimé avec succès');
        } catch (error) {
            toast.error('Erreur lors de la suppression des données');
            console.error('Détails de l\'erreur:', error);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
            deleteCount();
        }
    };

    return (
        <section className="">
            <div className="w-auto flex  md:px-24 justify-center relative">
                <div className="p-20 sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto flex flex-col md:flex-row px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative">
                    <div className="flex flex-col space-y-4 items-center  mr-10">
                        <img
                            className="rounded-lg min-w-[100px] w-full h-auto md:mx-0 mx-auto  md:w-auto md:h-auto"
                            src={formData.file as string || imagePreview}
                            alt="image of myself"
                        />
                        <div className='flex items-center w-full  justify-around  gap-6'>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="imageInput"
                            />
                            <label htmlFor="imageInput" className="relative rounded-full bg-blue-300 p-1 cursor-pointer hover:text-blue-700 duration-1000 ease-in-out">
                                <span className="sr-only">Edit Image</span>
                                <PencilSquareIcon aria-hidden="true" className="h-6 w-6" />
                            </label>
                            {/* <button
                                type="button"
                                onClick={handleImageRemove}
                                className="relative rounded-full bg-red-300 p-1 hover:text-red-700 duration-1000 ease-in-out"
                            >
                                <span className="sr-only">Remove Image</span>
                                <TrashIcon aria-hidden="true" className="h-6 w-6" />
                            </button> */}
                        </div>
                    </div>
                    <Toaster />


                    <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
                        <h1 className="text-slate-500 font-bold text-3xl mt-6 mb-8">
                            {formData?.fullName || formData?.username}

                        </h1>

                        <p className="text-slate-500 w-full sm:w-[35rem] md:w-[30rem] lg:w-[25rem] mb-10">
                            {formData.biography ? formData.biography : (<p className='' >Aucune Biographie...</p>)}

                        </p>

                        <form onSubmit={handleSubmit} className='space-y-6 w-full text-gray-700 font-medium'>

                            <div className='sm:flex  gap-6'>
                                <div className='space-y-2 md:w-1/2 flex flex-col'>
                                    <label className='text-xl' htmlFor="fullName">Nom et Prénoms</label>
                                    <input
                                        type="text"
                                        id='fullName'
                                        name='fullName'
                                        className='px-3 h-14 border-2 rounded-xl w-full'
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                <div className='space-y-2 md:w-1/2 flex flex-col'>
                                    <label className='text-xl' htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id='email'
                                        name='email'
                                        className='px-3 h-14 border-2 rounded-xl w-full'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='sm:flex gap-6'>

                                <div className='space-y-2 md:w-1/2 flex flex-col'>
                                    <label className='text-xl' htmlFor="jobPost">Post</label>
                                    <input
                                        type="text"
                                        id='jobPost'
                                        name='jobPost'
                                        className='px-3 h-14 border-2 rounded-xl w-full'
                                        value={formData.jobPost}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className='space-y-2 md:w-1/2 flex flex-col'>
                                    <label className='text-xl' htmlFor="organization">Organisation</label>
                                    <input
                                        type="text"
                                        id='organization'
                                        name='organization'
                                        className='px-3 h-14 border-2 rounded-xl w-full'
                                        value={formData.organization}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>


                            <div className='space-y-2 md:w-1/2 flex flex-col'>
                                <label className='text-xl' htmlFor="location">Ville/Pays</label>
                                <input
                                    type="text"
                                    id='location'
                                    name='location'
                                    className='px-3 h-14 border-2 rounded-xl w-full'
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='space-y-2  flex flex-col'>
                                <label className='text-xl' htmlFor="biography">Biographie</label>
                                <textarea
                                    id='biography'
                                    name='biography'
                                    className='px-3 py-2 h-20 border-2 rounded-xl w-full'
                                    value={formData.biography}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='flex items-center justify-between'>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Soumettre
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Supprimer
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default MyProfile;