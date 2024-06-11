import React from 'react';
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes,Route } from 'react-router-dom';
import ListProduct from '../../Components/ListProduct/ListProduct';
import Add from '../../Components/Add/Add';
import Voucher from '../../Components/Voucher/Voucher';
import FeedBackMessages from '../../Components/Feedbackmessages/FeedBackMessages';



const Admin = () => {

 
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>

        <Route path ='/addproduct' element ={<Add/>}/>
        <Route path ='/listproduct' element ={<ListProduct/>}/>
        <Route path ='/voucher' element ={<Voucher/>}/>
        <Route path ='/feedback' element = {<FeedBackMessages/>}/>

      </Routes>
    </div>
  );
};

export default Admin;

