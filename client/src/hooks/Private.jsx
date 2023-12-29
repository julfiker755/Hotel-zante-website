import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';
import AuthLoading from '../components/Shared/AuthLoading';



const Private = ({ children }) => {
    let location = useLocation();
    const { user, loading } = useAuth()
    if (loading) {
       return  <AuthLoading></AuthLoading>
    }
   
    if (user && user.uid) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};



export default Private;