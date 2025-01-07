import { useState } from "react";
import axios from 'axios';


interface CreateRequestParams {
  endpoint: string;
}

interface UseUpdateProps {
  endpoint: string;
  method?: 'PUT' | 'PATCH';
}

interface UseDeleteProps {
  endpoint: string;
}

const token = localStorage.getItem('token');

export const useCreate = <T>({ endpoint }: CreateRequestParams) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<T | null>(null);

  const token = localStorage.getItem('token'); // Vérifiez que vous récupérez le token correctement

  const create = async (data: Record<string, unknown> | FormData) => {
    if (!token) {
      setError('No authentication token found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Data being sent:', data);
      const isFormData = data instanceof FormData;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          Authorization: `Bearer ${token}`,
        },
        body: isFormData ? data : JSON.stringify(data), // Pas de stringify pour FormData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create item');
      }

      const responseData = await res.json();
      setResponse(responseData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur inconnue s'est produite");
      }
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error, response };
};





export function useUpdate<T>({ endpoint }: UseUpdateProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<T | null>(null);

  const update = async (data: Record<string, unknown>) => {
    setLoading(true);
    setError(null);

    try {
      // Vérifier si 'data' est une instance de FormData
      const isFormData = data instanceof FormData;
      const res = await axios({
        method: 'PATCH',
        url: endpoint,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {}),
        },
      });
      console.log(res.data)
      setResponse(res.data);
      return res.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite");
      } throw err;
    } finally {
      setLoading(false);
    }
  };
  return { update, loading, error, response };
}

export function useDelete<T>({ endpoint }: UseDeleteProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<T | null>(null);

  const remove = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse(res.data);
      return res.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite");
      } throw err;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error, response };
}



