import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './userContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  allowedRoles: ('admin' | 'user' | 'writer')[];
  children?: ReactNode; // Permet de passer des enfants
}


export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
