import React, { useEffect, useState } from 'react';
import useSeureIncaptor from '../../../hooks/useSeureIncaptor';
import Usertablerow from './Usertablerow';


const Mangeuser = () => {
    const [alluser,setalluser]=useState([])
    const  SecureIncaptor=useSeureIncaptor()
    const [agincall,setagincall]=useState('')
    useEffect(()=>{
        (async()=>{
            const {data}=await SecureIncaptor.get('/alluser')
            setalluser(data.data)
        })()
    },[agincall])

    return (
        <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {/* User data table row */}
                    {alluser.map(d=> <Usertablerow key={d._id} setagincall={setagincall} user={d}></Usertablerow>)}
                    </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Mangeuser;