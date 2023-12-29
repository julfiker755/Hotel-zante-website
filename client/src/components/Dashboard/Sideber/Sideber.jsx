import { useEffect, useState } from 'react'
// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import Logo from '../../Shared/Logo'
import Menuitem from './Menuitem'
import Tooglebutton from '../../Button/Tooglebutton'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Host from '../Rolemenu/Host'
import Gust from '../Rolemenu/Gust'
import Admin from '../Rolemenu/Admin'
import useRole from '../../../hooks/useRole'
import AuthLoading from '../../Shared/AuthLoading';

const Sideber = () => {
  const [toggle, setToggle] = useState(false)
  const [isActive, setActive] = useState(false)
  const {logOut} = useAuth()
  const navigate=useNavigate()
  const {userole,refetch,isPending}=useRole()


  if(isPending){
    return <AuthLoading></AuthLoading>
  }




  //   For guest/host menu item toggle button
  const toggleHandler = event => {
    setToggle(event.target.checked)
  }
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

 
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block  cursor-pointer p-4 font-bold'>
            <Logo />
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full  md:flex px-4 py-2  rounded-lg justify-center items-center  mx-auto'>
              <Logo />
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* If a user is host */}
            {userole.map(u=>u.role === 'host' ?  <Tooglebutton key={u._id} toggleHandler={toggleHandler} /> : '')}
            <nav>
                 

            {/* {userole.map(u=>u.role === 'guest' ?  <Gust key={u._id}></Gust>:'')}
            {userole.map(u=>u.role === "host" ? toggle ? <Host key={u._id}></Host> : <Gust key={u._id}></Gust>:'' )}
            {userole.map(u=>u.role === "admin" ? <Admin key={u._id}></Admin>: '')} */}

              {userole.map((u) => {
                switch (u.role) {
                  case 'guest':
                    return <Gust key={u._id}></Gust>;
                  case 'host':
                    return toggle ? <Host key={u._id}></Host> : <Gust key={u._id}></Gust>;
                  case 'admin':
                    return <Admin key={u._id}></Admin>;
                  default:
                    return null;
                }
              })}
               
               
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <Menuitem
            icon={FcSettings}
            label='Profile'
            address='/dashboard/profile'
          />
          <button  
          onClick={async()=>{
           await logOut()
           navigate("/")
           toast.success('Logout Successfull')
           

                  }} className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'>
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}


export default Sideber;