import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Skeleton from "../components/Skeleton.tsx"

type Props = {
    children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/check-auth`, {
            method: 'GET',
            credentials: 'include', 
        })
            .then(res => res.json())
            .then(data => setIsAuth(data.authenticated))
            .catch(() => setIsAuth(false));
    }, []);

    if (isAuth === null) return <div><Skeleton/></div>;
    return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute