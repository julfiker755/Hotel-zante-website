import React from 'react';
import useRole from '../hooks/useRole';
import AuthLoading from '../components/Shared/AuthLoading';
import { Navigate } from 'react-router-dom';

const Gustprivate= ({children}) => {
    const {userole,isPending}=useRole()
    
    if(isPending){
        return <AuthLoading></AuthLoading>
      } 
  
      const isAdmin = userole.some(u => u.role === "guest");
      const isgest=userole.some(u => u.role === "host")

      if (isAdmin || isgest) {
        return children;
      } else {
        return <Navigate to="/dashboard" replace={true} />;
      }


     
  
  
};



export default Gustprivate;