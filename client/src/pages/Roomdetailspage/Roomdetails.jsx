import React, { useEffect, useState } from 'react';
import Container from '../../components/Shared/Container';
import { useParams } from 'react-router-dom';
import usePublicIncaptor from '../../hooks/usePublicIncaptor';
import Header from '../../components/RoomDetails/Header';
import RoomInfo from '../../components/RoomDetails/RoomInfo';
import RoomReservation from '../../components/RoomDetails/RoomReservation';
import { useQuery } from '@tanstack/react-query';
import AuthLoading from '../../components/Shared/AuthLoading';

const Roomdetails = () => {
    const {id}=useParams()
    const publicincaptor=usePublicIncaptor()


    const { isPending, data: rooms } = useQuery({
      queryKey: ['users',id],
      queryFn: async () => {
        const {data}=await publicincaptor.get(`/rooms/${id}`)
         return data?.data
      }
  })
    if (isPending) {
      return <AuthLoading></AuthLoading>
  }
 



    return (
        <Container>
           <div className='max-w-screen-lg mx-auto'>
          <div className='flex flex-col gap-6'>
            <Header room={rooms} />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <RoomInfo room={rooms} />

            <div className='md:col-span-3 order-first md:order-last mb-10'>
              {/* RoomReservation */}
              <RoomReservation room={rooms} />
               {/* <Calender value={value}></Calender> */}
            </div>
          </div>
        </div>
        </Container>
    );
};

export default Roomdetails;