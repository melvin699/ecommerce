import React from 'react';
import './Collections.css'
import new_collection from '../Images/collections';
import Item from '../Item/Item';

const Collections = () => {



    return (
        <div className='collections'>  
          <h1>NEW COLLECTIONS</h1>
          <hr />
          <div className="newcollections">
{new_collection.map((item,i)=>{
       return <Item key = {i} id={item.id} name = {item.name} image = {item.image} new_price ={item.new_price} old_price = {item.old_price}/>
})}
          </div>
        </div>
    );
}

export default Collections;
