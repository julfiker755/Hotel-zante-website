import React from 'react';
import useRole from '../hooks/useRole';
import AuthLoading from '../components/Shared/AuthLoading';
import { Navigate } from 'react-router-dom';

const Adminprivate = ({children}) => {
    const {userole,isPending}=useRole()
    
    if(isPending){
        return <AuthLoading></AuthLoading>
      } 
  
      const isAdmin = userole.some(u => u.role === "admin");

      if (isAdmin) {
        return children;
      } else {
        return <Navigate to="/dashboard" replace={true} />;
      }


     
  
  
};

export default Adminprivate;

