import React from 'react';
import { Outlet } from 'react-router-dom';
import Sideber from '../components/Dashboard/Sideber/Sideber';

const DashboardLayout = () => {
    return (
        <div className='relative min-h-screen md:flex'>
          <Sideber></Sideber>
          <div className='flex-1  md:ml-64'>
            <div className='p-5'>
                <Outlet></Outlet>
                </div>
          </div>
        </div>
      )
};

export default DashboardLayout;