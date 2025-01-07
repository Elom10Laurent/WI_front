'use client';

import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { useState } from 'react';
import { useUpdate } from '../../lib/hooks';
// import axios from 'axios';

export default function NotificationUpdateForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState<string | null>('');
  const notificationId: number = 1
  const { update, loading } = useUpdate({
    endpoint: `/dashboard/notifications/${notificationId}`,
  });

  const navigate = useNavigate();

  // Pré-remplir les champs si vous avez des données initiales
  // useEffect(() => {
  //   async function fetchNotification() {
  //     try {
  //       const res = await axios.get(`/dashboard/notifications/${notificationId}`);
  //       setTitle(res.data.title);
  //       setContent(res.data.content);
  //       setLink(res.data.link);
  //     } catch (err) {
  //       console.error('Erreur lors du chargement des données:', err);
  //     }
  //   }
  //   fetchNotification();
  // }, [notificationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await update({ title, content, link });
      navigate('/dashboard/notification'); // Redirection après succès
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='max-w-3xl' >
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* update title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Titre:
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="..."
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
          </div>
          {/* Customer Name */}
          <div className="mb-4">
            <label htmlFor="content" className="mb-2 block text-sm font-medium">
              Contenu:
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
          </div>
          {/* Customer Name */}
          <div className="mb-4">
            <label htmlFor="link" className="mb-2 block text-sm font-medium">
              Lien
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="text"
                  id="link"
                  value={link || ''}
                  onChange={(e) => setLink(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            to="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? 'Mise à jour...' : 'Mettre à jour'}</Button>
        </div>
      </form>
    </div>
  );
}