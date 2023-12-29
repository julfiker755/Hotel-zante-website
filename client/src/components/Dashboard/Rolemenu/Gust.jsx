import React, { useState } from 'react';
import Menuitem from '../Sideber/Menuitem';
import { BsGraphUp } from 'react-icons/bs'
import { FaSwatchbook } from "react-icons/fa";
import useRole from '../../../hooks/useRole';
import AuthLoading from '../../Shared/AuthLoading';
import { GrUserAdmin } from 'react-icons/gr';
import useAuth from '../../../hooks/useAuth';
import Hostrequestmodal from '../../Modal/Hostrequestmodal';
import useSeureIncaptor from '../../../hooks/useSeureIncaptor';
import toast from 'react-hot-toast';

const Gust = () => {
  const {userole,refetch,isPending}=useRole()
  if(isPending) return <AuthLoading></AuthLoading>
  const SecureIncaptor=useSeureIncaptor()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [agin,setagin]=useState('')
  const closeModal = () => {
    setIsOpen(false)
  }

  async function modalHandler(email){
    const {data}=await SecureIncaptor.put(`/users/${email}`,{status:"requested"})
        if(data.status === "success"){
           toast.success('Successfull')
           setagin(Math.floor(Math.random()*66666))
        }
  }
    return (
        <>
         <Menuitem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />
              <Menuitem
                icon={FaSwatchbook }
                label='My Bookings'
                address='my-bookings'
              />
            
            {userole.map(u=>u.role === 'guest' ?  <div key={u._id} onClick={()=>setIsOpen(true)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
          <GrUserAdmin className='w-5 h-5' />

          <span className='mx-4 font-medium'>Become A Host</span>
        </div> : '')}
          
          {/* host modal */}
          {/* modalHandler, closeModal, isOpen, email */}
          <Hostrequestmodal
          modalHandler={modalHandler}
          closeModal={closeModal}
          isOpen={isOpen}
          email={user.email}
          agin={agin}
          ></Hostrequestmodal>
        </>
    );
};

export default Gust;