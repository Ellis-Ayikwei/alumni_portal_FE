// ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { IRootState } from '../store';
import { access } from 'fs';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const location = useLocation();
    const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);
    const user = useSelector((state: IRootState) => state.auth.user);
    // const userRole = useSelector((state: IRootState) => state.auth.user.role);
    const accessT
    console.log("the user", user)
    if (!isLoggedIn || user === null || ) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    // if (allowedRoles && !allowedRoles.includes(userRole)) {
    // 	return <Navigate to="/index" state={{ from: location }}/>;
    // }


    return <>{children}</>;
};

export default ProtectedRoute;

