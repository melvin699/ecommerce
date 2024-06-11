import React from 'react';
import './Cramps.css'
import arrow_icon from '../Images/arrow-left.png'


const Cramps = (props) => {
    const {product} = props;

    if (!product) {
      return null; 
  }

  const { category, name } = product;
  return (
    <div className='cramps'>
     HOME/ SHOP / {product.category}/{product.name}
    </div>
  );
};

export default Cramps;
