import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorPage from '../pages/ErrorPage';

interface PrivateRouteProps {
    element: JSX.Element;
    requiredRole: 'user' | 'admin';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, requiredRole }) => {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/signin" />;
    }

    if (requiredRole === 'admin' && !isAdmin()) {
        return <ErrorPage type="unauthorized" />;
    }

    return element;
};


export default PrivateRoute;