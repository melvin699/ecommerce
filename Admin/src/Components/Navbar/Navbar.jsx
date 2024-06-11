import React from 'react';
import './Navbar.css'
import nav_logo from '../../assets/logo.png'
import my_profile from '../../assets/profile.png'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={nav_logo} alt="" className="nav-logo" />
      <img src={my_profile} alt="" className='nav-profile' />
    </div>
  );
};

export default Navbar;