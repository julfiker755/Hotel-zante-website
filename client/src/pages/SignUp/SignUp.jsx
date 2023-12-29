import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import usePublicIncaptor from '../../hooks/usePublicIncaptor'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useState } from 'react'

const SignUp = () => {
  const navigate = useNavigate()
  const imgapi=import.meta.env.VITE_imgbb_api_key
  const { createUser,updateUserProfile,user}=useAuth()
  const publicincaptor=usePublicIncaptor()
  const [loading,setloading]=useState(false)


  // form submit handler
  const handleSubmit = async event => {
    setloading(true)
    event.preventDefault()
    const form=event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.files[0]
    const formData = new FormData()
    formData.append('image', image)
       
    // image upload api
     axios.post(`https://api.imgbb.com/1/upload?key=${imgapi}`,formData)
     .then(result=>{
      const imguser=result?.data?.data?.display_url
      // create user 
      createUser(email,password)
      .then(result=>{
        const user=result.user
        // update your name,imgurl
        updateUserProfile(name,imguser)
        .then(async()=>{
          // save user data mongodb 
          const currentuser={
            name:name,
            email:email,
            role:'guest',
            status:'verified',
          }
        const {data:result}=await publicincaptor.put(`/users/${email}`,currentuser)
          if(result.data.upsertedCount > 0 || result.data.modifiedCount > 0){
            setloading(false)
            toast.success('Register Successfull')
            navigate('/')
          }
        })
      }).catch(err=>{
        setloading(false)
        toast.error(`${err}`)
      })
     })

    
    
  }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-3 text-center'>
          <h1 className='my-1 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to StayVista</p>
        </div>
        <form onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
          <button
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <p className='px-6  mt-3 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
