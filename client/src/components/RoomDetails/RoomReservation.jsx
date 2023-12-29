/* eslint-disable react/prop-types */
import { useState } from 'react'
import Calender from './Calender'
import Button from '../Button/Button'
import { formatDistance } from 'date-fns'
import BookingModal from '../Modal/BookingModal'
import useAuth from '../../hooks/useAuth'



const RoomReservation = ({ room }) => {
  let [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const closeModal = () => {
    setIsOpen(false)
  }
  const [value, setValue] = useState({
    startDate: new Date(room?.from),
    endDate: new Date(room?.to),
    key: 'selection',
  })

//  Total room price
  const totaldays = parseInt(formatDistance(new Date(room?.to), new Date(room?.from)).split(' ')[0])
  const totalprice=totaldays * room?.price

  const [bookingInfo, setBookingInfo] = useState({
    guest: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    host: room?.host?.email,
    location: room?.location,
    price:totalprice,
    to: value.endDate,
    from: value.startDate,
    title: room?.title,
    roomId: room?._id,
    image: room?.image,
  })


 
 
  return (
    <div className='rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white'>
      <div className='flex items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {room?.price}</div>
        <div className='font-light text-neutral-600'>night</div>
      </div>
      <hr />
      <div className='flex justify-center'>
        <Calender  value={value} />
      </div>
      <hr />
      <div className='p-4'>
      <Button
      disabled={room.host.email === user.email || room.room === "booked"}
      onClick={()=>setIsOpen(true)}
          label={'Reserve'}
        />
      </div>
      <hr />
      <div className='p-4 flex items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>${totalprice}</div>
      </div>
  {/* booking modal */}
      <BookingModal
        closeModal={closeModal}
        isOpen={isOpen}
        bookingInfo={bookingInfo}
      />
    </div>
  )
}

export default RoomReservation
