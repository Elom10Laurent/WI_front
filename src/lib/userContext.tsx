import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  id: string;
  username: string;
  role: string;
  email: string;
  exp: number;
}

type User = Omit<DecodedToken, 'exp'>

interface UserContextProps {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, onError: (message: string) => void) => Promise<void>;
  logout: () => void;
  getAuthHeaders: () => HeadersInit;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const STORAGE_KEY = 'token';

  const decodeToken = (token: string): User | null => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      console.log('Token décodé :', decoded);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        console.warn('Le token a expiré.');
        return null;
      }
       if (!decoded.id || !decoded.username || !decoded.role || !decoded.email) {
      console.warn('Propriétés manquantes dans le token.');
      return null;
    }

      const { id, username, role, email } = decoded;
      return { id, username, role, email };
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
      return null;
    }
  };


  const saveToken = (token: string) => {
    localStorage.setItem(STORAGE_KEY, token);
    const decodedUser = decodeToken(token);
    console.log(decodedUser)
    setUser(decodedUser);
  };

  const clearToken = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEY);
    if (storedToken) {
      const decodedUser = decodeToken(storedToken);
      if (decodedUser) {
        setUser(decodedUser);
        setLoading(false); 
      } else {
        clearToken();
        navigate('/login');
      }
    } else {
      setLoading(false); 
    }
  }, [navigate]);



  const getAuthHeaders = (): HeadersInit => ({
    'Content-Type': 'application/json',
    ...(user ? { Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}` } : {}),
  });

  const login = async (email: string, password: string, onError: (message: string) => void) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        onError(errorData.message || 'Erreur de connexion.');
        return;
      }

      const { token } = await response.json();
      saveToken(token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur réseau :', error);
      onError('Erreur réseau : Vérifiez votre connexion.');
    }
  };

  const logout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        getAuthHeaders,
      }}
    >
      {children}
    </UserContext.Provider>
  );

};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé à l\'intérieur d\'un UserProvider');
  }
  return context;
};
