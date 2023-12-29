import React from 'react';
import logoImg from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to='/'>
              <img
                className=''
                src={logoImg}
                alt='logo'
                width='125'
                height='100'
              />
            </Link>
    );
};

export default Logo;