import React from 'react';
import Menuitem from '../Sideber/Menuitem';
import { BsGraphUp } from 'react-icons/bs'
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork} from 'react-icons/md'
import { FaSwatchbook } from "react-icons/fa";

const Host = () => {
    return (
        <>
         <Menuitem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />
              <Menuitem
                icon={BsFillHouseAddFill}
                label='Add Room'
                address='add-room'
              />
              <Menuitem
                icon={MdHomeWork}
                label='My Listings'
                address='my-listing'
              />
              <Menuitem
                icon={FaSwatchbook}
                label='Mange Bookings'
                address='mange-bookings'
              />
        </>
    );
};

export default Host;