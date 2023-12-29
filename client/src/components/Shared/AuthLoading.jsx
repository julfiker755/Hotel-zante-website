import React from 'react';
import { Circles } from  'react-loader-spinner';



const AuthLoading = () => {
    return (
        <div className='w-full h-[400px] flex justify-center items-center'>
        <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>
    )
};

export default AuthLoading;