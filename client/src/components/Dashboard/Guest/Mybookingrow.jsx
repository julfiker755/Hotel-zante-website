import { format } from 'date-fns'
import useSeureIncaptor from '../../../hooks/useSeureIncaptor'
import usePublicIncaptor from '../../../hooks/usePublicIncaptor'
import AuthLoading from '../../Shared/AuthLoading'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const Mybookingrow = ({ booking }) => {
    const Seureincaptor=useSeureIncaptor()
    const publicincaptor=usePublicIncaptor()
    const [change,setchange]=useState('')
    // room data use
   const handlecencle=()=>{
    Seureincaptor.put(`/booking_control/${booking.bookingid}`,{room:'Cencel'})
    .then(result=>{
        if(result.data.status === "success"){
            setchange('success')
        }
    })

   }
//   check booking value
const { isPending,data: rooms } = useQuery({
  queryKey: ['users',booking.bookingid,change],
  queryFn: async () => {
    const {data}=await publicincaptor.get(`/rooms/${booking.bookingid}`)
     return data?.data
  }
})
if (isPending) {
  return <AuthLoading></AuthLoading>
}



  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={booking?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{booking?.title.slice(0,15)}...</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={booking?.guest?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>
              {booking?.guest?.name}
            </p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${booking?.price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(booking?.from), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(booking?.to), 'P')}
        </p>
      </td>
      <td onClick={()=>handlecencle()} className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>{rooms?.room}</span>
        </span>
      </td>
    </tr>
  )
}



export default Mybookingrow;