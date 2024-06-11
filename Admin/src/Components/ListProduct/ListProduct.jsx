import React, { useState } from 'react';
import './ListProduct.css'
import { useEffect } from 'react';
import remove_icon from '../../assets/remove1.png'
const ListProduct = () => {

const[allproducts, setAllProducts] = useState([]);  

const fetchInfo = async () =>{
await fetch('http://localhost:5000/allproducts')
.then((res)=> res.json())
.then((data) =>{setAllProducts(data)});
}
useEffect (()=>{fetchInfo();},[])

const remove_product = async (id)=>{
    await fetch('http://localhost:5000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type' : 'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
}

  return (
    <div className='list-product-container'>
      <h1>All products</h1>
      <div className="main-format">
        <p>products</p>
        <p>title</p>
        <p>new price</p>
        <p>old price</p>
        <p>category</p>
        <p>type</p>
        <p>remove</p>
      </div>
      <div className="list-allproducts">
        <hr />
{allproducts.map((product)=>{
  return <>
  <div key = {product.id} className="main-format list-product">
    <img className = 'listproduct-icon'src={product.image} alt="" />
    <p> {product.name} </p>
    <p> {product.new_price} </p>
    <p> {product.old_price} </p>
    <p> {product.category} </p>
    <p> {product.type} </p>
    <img onClick={()=>{remove_product(product.id)}} className='remove-icon'src={remove_icon} alt="" />
    <hr />
  
  </div>
  </>
})}
      </div>
    </div>
  );
};

export default ListProduct;
