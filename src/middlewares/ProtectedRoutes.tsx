// ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { IRootState } from '../store';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const location = useLocation();
    const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);

    // const userRole = useSelector((state: IRootState) => state.auth.user.role);

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    // if (allowedRoles && !allowedRoles.includes(userRole)) {
    // 	return <Navigate to="/index" state={{ from: location }}/>;
    // }

    console.log('|middle ware asctive ');

    return <>{children}</>;
};

export default ProtectedRoute;
