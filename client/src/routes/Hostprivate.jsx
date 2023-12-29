import React from 'react';
import useRole from '../hooks/useRole';
import AuthLoading from '../components/Shared/AuthLoading';
import { Navigate } from 'react-router-dom';

const Hostprivate = ({children}) => {
    const {userole,isPending}=useRole()
    if(isPending){
        return <AuthLoading></AuthLoading>
      }  

      const isHost = userole.some(u => u.role === "host");
      if (isHost) {
        return children;
      } else {
        return <Navigate to="/dashboard" replace={true} />;
      }
};




export default Hostprivate;
