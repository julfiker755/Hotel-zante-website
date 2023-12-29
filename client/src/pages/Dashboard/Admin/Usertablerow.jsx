import { useState } from "react";
import Modalpage from "./Modalpage";
import toast from "react-hot-toast";
import useSeureIncaptor from "../../../hooks/useSeureIncaptor";

const Usertablerow = ({ user ,setagincall}) => {
  const [isOpen, setIsOpen] = useState(false)
  const SecureIncaptor=useSeureIncaptor()
  const modalHandler = async role1 => {
    try {
      // status"success"
       const {data}=await SecureIncaptor.put(`/users/${user.email}`,{role:role1,status:"verified"})
        if(data.status === "success"){
          setagincall(Math.floor(Math.random()*666666))
          
          toast.success('User role updated!')
        }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      setIsOpen(false)
    }
    // console.log(role)
  }
    return (
      <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          {user?.status ? (
            <p
              className={`${
                user.status === 'verified' ? 'text-green-500' : 'text-yellow-500'
              } whitespace-no-wrap`}
            >
              {user.status}
            </p>
          ) : (
            <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
          )}
        </td>
  
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <span onClick={()=>setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Update Role</span>
          </span>
          {/* Modal */}
          <Modalpage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          modalHandler={modalHandler}
          ></Modalpage>
        </td>
      </tr>
    )
  }
  

  

export default Usertablerow;