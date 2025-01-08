import { useEffect, useState } from 'react';
import DeleteButton from '../DeleteButton'
import ReadMoreArea from '@foxeian/react-read-more';
import axios from 'axios';
import { useAuth } from '../../lib/userContext';
import { NotificationsCardsSkeleton } from '../skeletons';

interface Notification {
    _id: string;
    title: string;
    content: string;
    link: string;

}

const NotificationsCard = () => {
    const [userNotifications, setUserNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const token = localStorage.getItem('token');
    const { user } = useAuth()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}notifications`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const publicationsData = response.data;
                setUserNotifications(publicationsData);
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

    console.log(userNotifications)

    return (
        <div >
            {NotificationsCard.length === 0 || loading ? (
                <p className="text-center text-slate-900 w-full"> <NotificationsCardsSkeleton /> </p>
            ) : (userNotifications.map((notification, idx) => (
                <div key={idx} className="flex flex-col p-8 mb-4 bg-white shadow-md hover:shadow-lg rounded-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex flex-col ml-3">
                                <div className="font-medium leading-none"> {notification.title} </div>
                                <ReadMoreArea
                                    className=" flex flex-col items-start   font-normal text-gray-600 no-underline	"
                                    lettersLimit={100}
                                    expandLabel="Lire plus"
                                    collapseLabel="Lire moins"
                                    textClassName="no-underline">
                                    {notification.content}
                                </ReadMoreArea>
                                <div className='flex  mt-4 items-center gap-4'>
                                    <img
                                        className='rounded-full border-2 h-16 w-16'
                                        src='/src/assets/LOGO.svg'
                                        alt="Default Favicon"
                                    /> <a href={notification.link} className=" text-gray-600 text-lg leading-none mt-1">visiter le site
                                    </a>
                                </div>
                            </div>
                        </div>

                        {!user || user?.role !== "admin" ? (<DeleteButton
                            resourceId={notification?._id}
                            endpoint={`${import.meta.env.VITE_API_URL}notifications`}
                            styles="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full hidden "
                        />) : (<DeleteButton
                            resourceId={notification?._id}
                            endpoint="/dashboard/notifications"
                            styles={`flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full `}
                        />)}

                    </div>
                </div>
            )))}
        </div>

    )
}

export default NotificationsCard
