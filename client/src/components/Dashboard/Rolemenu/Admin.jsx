import React from 'react';
import Menuitem from '../Sideber/Menuitem';
import { BsGraphUp } from 'react-icons/bs';
import { FaUsersGear } from "react-icons/fa6";

const Admin = () => {
    return (
        <>
           <Menuitem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />
              <Menuitem
                icon={FaUsersGear}
                label='Mangage Users'
                address='mange-user'
              />
        </>
    );
};

export default Admin;