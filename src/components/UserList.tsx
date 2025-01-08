import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { toast, Toaster } from 'sonner';
import { useAuth } from '../lib/userContext';
export interface User {
    _id: string;
    email: string;
    username: string;
    jobPost?: string;
    organization?: string;
    location?: string;
    biography?: string;
    role?: string;
}


const UserList = () => {
    const { user } = useAuth();
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / itemsPerPage);



    useEffect(() => {
        let isCancelled = false;

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!isCancelled) {
                    setUsers(response.data);
                }
            } catch (error) {
                if (!isCancelled) {
                    console.error('Erreur lors de la récupération des données utilisateur:', error);

                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        if (token) {
            fetchUserData();
        }

        return () => {
            isCancelled = true;
        };
    }, [token]);



    const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>, userList: User) => {
        // console.log(userList);
        const newRole = event.target.value;
        const isComplete = userList?.username && userList?.email && userList?.jobPost && userList?.organization && userList?.location && userList?.biography;

        if (isComplete) {
            try {
                await axios.patch(`${import.meta.env.VITE_API_URL}users/${user?.id}`, {
                    role: newRole,
                    isSelectWriter: newRole === 'writer',
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(response);
            } catch (error) {
                console.error('Erreur lors de la mise à jour du rôle:', error);
            }
        } else {
            await sendEmailToUser(userList);
            // toast.message(`Email envoyer à ${userList.username}`)
        }
    };

    const sendEmailToUser = async (userList: User) => {
        // console.log(userList);
        try {
            const id = userList?._id;
            await axios.post(`${import.meta.env.VITE_API_URL}users/send/${id}`, {
                email: userList.email,
                username: userList.username,
            });
            // toast.message('Email envoyé à l\'utilisateur')
            // console.log('Email envoyé à l\'utilisateur');
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
        }
    };

    const results = currentUsers.filter((user: User) =>
        user.username.toLowerCase().includes(query.toLowerCase())
    );




    return (
        <div>
            <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
                    <div className="flex flex-col justify-end gap-8 mb-4 md:flex-row md:items-center">
                        {/* <Toaster /> */}
                        <div className="flex items-center gap-2 w-full  shrink-0 md:w-max">
                            <div className="w-full md:w-72 py-4">
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <div
                                        className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                                        </svg>
                                    </div>
                                    <input
                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder=" " />
                                    <label
                                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        Search
                                    </label>
                                </div>
                            </div>
                            <button
                                className="flex h-10 select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                    aria-hidden="true" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3">
                                    </path>
                                </svg>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-6 px-0 overflow-scroll">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Membre
                                    </p>
                                </th>
                                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Account
                                    </p>
                                </th>

                                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Organisation
                                    </p>
                                </th>
                                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Rôle
                                    </p>
                                </th>

                                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody> { }
                            {loading ? (
                                <p>Chargement des utilisateurs...</p>
                            ) : (
                                results.map((userList: User) => (
                                    <tr key={userList._id}>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                        {userList.username}
                                                    </p>
                                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                                                        {userList.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <p className="block font-sans text-sm antialiased font-normal leading-normal capitalize text-blue-gray-900">
                                                        {typeof userList?.jobPost !== "string" || userList.jobPost.length === 0 ? (
                                                            <p className="text-gray-500 text-xl text-start font-bold"> - </p>
                                                        ) : (
                                                            userList.jobPost
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">

                                                {typeof userList?.organization !== "string" || userList.organization.length === 0 ? (
                                                    <p className="text-gray-500 text-xl text-start font-bold"> - </p>
                                                ) : (
                                                    userList.organization
                                                )}

                                            </p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <div className="w-max">
                                                <div
                                                    className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${user?.role === 'user' ? 'text-red-900 bg-red-500/20' :
                                                        userList.role === 'writer' ? 'text-yellow-900 bg-yellow-500/20' :
                                                            'text-green-900  bg-green-500/20'}`}>
                                                    <span>
                                                        {userList.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4 border-b border-blue-gray-50">
                                            <button
                                                className="flex items-center justify-center hover:text-gray-600 h-10 max-h-[40px] w-20 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                            >
                                                <span className="flex px-2 gap-2 items-center">
                                                    <select value={userList.role} onChange={(event) => handleRoleChange(event, userList)} className='h-10 max-h-[40px] w-20 rounded-lg'>
                                                        <option value="user">User</option>
                                                        <option value="writer">Writer</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>
                <div className="md:flex items-center gap-1 justify-between  p-4 border-t border-blue-gray-50">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Previous
                    </button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all ${currentPage === index + 1
                                    ? "bg-gray-600 text-white"
                                    : "text-gray-900 hover:bg-gray-900/10"
                                    }`}
                            >
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    {index + 1}
                                </span>
                            </button>
                        ))}
                    </div>


                    <button
                        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        type="button">
                        Next
                    </button>
                </div>
            </div>

        </div>
    )
}

export default UserList