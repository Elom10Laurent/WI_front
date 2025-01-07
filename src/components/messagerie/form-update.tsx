'use client';

import { Link, useParams } from 'react-router-dom';
import { Button } from '../Button';
import { useUpdate } from '../../lib/hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function MessagerieUpdateForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  // const navigate = useNavigate();
  const { id } = useParams()
  const token = localStorage.getItem('token');
  useEffect(() => {
    async function fetchPublication() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}publications/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setTitle(res.data.title);
        setContent(res.data.content);
        setFile(res.data.file);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
      }
    }
    fetchPublication();
  }, [id]);

  const { update } = useUpdate({
    endpoint: `${import.meta.env.VITE_API_URL}publications/${id}`,
  });

  // Gestion du changement d'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) {
      formData.append('file', file);
    }
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      const updatedData = await update({ data: formData });
      console.log('Données mises à jour:', updatedData);      // navigate('/dashboard');
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
    }
  };



  return (
    <form onSubmit={handleSubmit} className='max-w-3xl' >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Titre :
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Contenu :
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
          <label className="mb-2 block text-sm font-medium">
            Image :
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input type="file" accept="image/*" onChange={handleImageChange} />
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
        <Button type="submit">Mettre a jour  </Button>
      </div>
    </form>
  );
}