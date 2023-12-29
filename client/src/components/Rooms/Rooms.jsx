import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';
import usePublicIncaptor from '../../hooks/usePublicIncaptor';

const Rooms = () => {
    const [room,setroom]=useState([])
    const [params, setParams] = useSearchParams()
    const parmsdata= params.get('category')
    const publicincaptor=usePublicIncaptor()
   useEffect(()=>{
    (async()=>{
        publicincaptor.get('/rooms')
        .then(result=>{
            if(parmsdata){
                const filterresult=result.data.data.filter(d=>d.category === parmsdata)
                setroom(filterresult)
            }else setroom(result.data.data)
        })
        
    })()
   },[parmsdata])

//  className='flex items-center  justify-center '
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 pt-3 gap-4'>
           {room && room.length > 0 ? room.map(d=><Card key={d._id} room={d}></Card>):<div className='min-h-[calc(100vh-300px)] flex justify-center items-center m-auto'>
         <div className='w-full lg:w-[1100px]'>
       <div className='text-xl font-bold text-center'>No Rooms Available In This Category!</div>
       <div className='font-light text-neutral-500 text-center mt-2'>Please Select Other Categories.</div>
       </div>
            </div>} 
        </div>
    );
};

export default Rooms;