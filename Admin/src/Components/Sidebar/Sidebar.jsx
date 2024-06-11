import React from 'react';
import './Sidebar.css'
import {Link} from  "react-router-dom";
import add from '../../assets/add-to-basket.png'
import list from '../../assets/pick-list.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to ={'/addproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={add} alt="" className='add-product' />
            <p>Add Products</p>
        </div>
      </Link>

      <Link to ={'/listproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={list} alt="" className='add-product' />
            <p>Product List</p>
        </div>
      </Link>
      <Link to ={'/voucher'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={list} alt="" className='add-product' />
            <p>Voucher Codes</p>
        </div>
      </Link>
      <Link to ={'/feedback'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={list} alt="" className='add-product' />
            <p>Messages</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
