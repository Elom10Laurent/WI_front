
import ReadMoreArea from '@foxeian/react-read-more';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import { useUser } from '../lib/userContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Publication {
    _id: string;
    title: string;
    content: string;
    file?: string;
    hastags?: string[];
    lien?: string;
    author: {
        fullName: string;
        email: string;
        jobPost: string;
        organization: string;
        username: string;
    };
}
const MyMessagerie = () => {

    const [userPublications, setUserPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const token = localStorage.getItem('token');
    const { user } = useUser();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}publications/user/${user?.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const publicationsData = response.data;
                setUserPublications(publicationsData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);
    return (
        <div >
            <h1 className={`mb-4 text-xl md:text-2xl`}>
                messagerie
            </h1>
            <div className=''>
                {loading ? (
                <p className="text-center text-slate-900 w-full">Chargement de vos publications...</p>
            ) : 
                userPublications.map((publication, idx) => (

                    <article key={idx} className="mx-auto border-b mt-4 w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <div className='flex items-center justify-between'>
                            <header className=" not-format">
                                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl 
                            :text-white"> {publication?.title} </h1>
                            </header>

                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400">
                                        <EllipsisHorizontalIcon className='h-8 w-8' />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                    <MenuItem>
                                        <Link
                                            to={`/dashboard/messagerie/${publication?._id}/update`}
                                            // onClick={() => archivePost(publication?._id)}
                                            className="flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                        >
                                            editer
                                        </Link>
                                    </MenuItem>
                                    {/* {(user?.role === 'writer') && ( */}
                                    <>
                                        <MenuItem>
                                            <Link to={`/messagerie/update`}></Link>
                                        </MenuItem>
                                    </>
                                    {/* )} */}
                                    {/* {(user?.role === 'writer') && ( */}
                                    <>
                                        <MenuItem>
                                            <DeleteButton
                                                resourceId={publication?._id}
                                                endpoint={`${import.meta.env.VITE_API_URL}publications`}
                                                styles="flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                            />
                                        </MenuItem>
                                    </>
                                    {/* )} */}
                                </MenuItems>
                            </Menu>

                        </div>

                        <ReadMoreArea
                            className=" flex flex-col items-start   font-normal text-gray-600 no-underline	"
                            lettersLimit={100}
                            expandLabel="Lire plus"
                            collapseLabel="Lire moins"
                            textClassName="no-underline">
                                {publication?.content}
                        </ReadMoreArea>
                        {/* <p className=" flex flex-col items-start   font-normal text-gray-600 no-underline	"
                        >hello world</p> */}

                        <figure className="mt-4">
                            <img
                                src={publication?.file}
                                alt=""
                                className="w-full rounded-md object-cover"
                            />
                        </figure>

                        <address className="flex items-center  not-italic">
                            <div className="inline-flex items-center text-sm text-gray-900 dark:text-white">
                                <img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />
                                <div>
                                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">Jese Leos</a>
                                    <p className="text-base text-gray-500 dark:text-gray-400">Graphic Designer, educator & CEO Flowbite</p>
                                    <p className="text-base text-gray-500 dark:text-gray-400"><time title="February 8th, 2022">Feb. 8, 2022</time></p>
                                </div>
                            </div>
                        </address>
                        <div className=" flex items-center text-slate-500 justify-around py-2 font-light">
                            <p className="flex gap-1 items-center  font-semibold">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 h-4 w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                                <span className="sm:block hidden">Like</span>
                            </p>

                            <button className="flex gap-1 items-center  font-semibold" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 h-4 w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>
                                <span className="sm:block hidden">Partager</span>

                            </button>
                            <p className="flex gap-1 items-center font-semibold">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 h-4 w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                <span className="sm:block hidden"> <a href={`mailto:`}>Contacter</a> </span>
                            </p>

                        </div>
                    </article >

                ))}

            </div>
        </div>
    )
}

export default MyMessagerie
