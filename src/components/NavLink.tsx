"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
  FolderOpenIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/userContext';

export default function NavLinks() {
  const { user } = useAuth()

  const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, roles: ['user', 'admin', 'writer'] },
    { name: 'Carte', href: '/dashboard/map', icon: MapIcon, roles: ['user', 'admin', 'writer'] },
    {
      name: 'Notification',
      href: '/dashboard/notification',
      icon: DocumentDuplicateIcon,
      roles: ['user', 'admin'],
    },
    { name: 'Utilisateurs', href: '/dashboard/user', icon: UserGroupIcon, roles: ['admin'] },
    { name: 'Profile', href: `/dashboard/user/${user?.id}`, icon: UserIcon, roles: ['user', 'admin', 'writer'] },
    { name: 'Mes publications', href: `/dashboard/publication/${user?.id}`, icon: FolderOpenIcon, roles: ['writer'] },
  ];

  const filteredLinks = user?.role
    ? links.filter(link => link.roles.includes(user.role))
    : [];

  const pathname = useLocation();
  return (
    <>
      {filteredLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-green-600': pathname.toString() === link.href,
              },
            )}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}