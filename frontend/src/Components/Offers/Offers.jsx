import React from 'react';
import './Offers.css'
import exc_img from '../Images/exclas.png'
const Offers = () => {
    return (
        <div className='offers'>
            <div className="offers-left">
              <h1>Exclusive</h1>
               <h1>Offers for you</h1>
               <p>Best sellers</p>
               <button>click here</button>
            </div>
            <div className="offers-right">
                <img src={exc_img} alt="" />

            </div>
        </div>
    );
}

export default Offers;
