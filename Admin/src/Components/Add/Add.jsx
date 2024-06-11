import React, { useState } from 'react';
import './Add.css'
import upload_icon from '../../assets/upload.png'


const Add = () => {

const [image,setImage] = useState (false);

const [productDetails,setProductDetails] = useState({
  name:"",
  image:"",
  type:"",
  category:"",
  old_price:"",
  new_price:""
})

const imageHandler = (e) =>{
  setImage(e.target.files[0]);

}
const changeHandler = (e) =>{
  setProductDetails({...productDetails,[e.target.name]:e.target.value})
}


const Add_products = async ()=>{
  console.log(productDetails);
  let responseData;
  let product = productDetails;

  let formData = new FormData();
  formData.append('product',image);


  await fetch('http://localhost:5000/upload',{
    method :'POST',
    headers:{
      Accept :'application/json',
    },
    body:formData,
  }).then ((resp) => resp.json()).then((data)=>{responseData=data})
  

  if(responseData.success)
  {
    product.image = responseData.image_url;
    console.log(product);
    await fetch ('http://localhost:5000/addproduct',{
      method:'POST',
      headers:{
        Accept : 'application/json',
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(product),
    }).then((resp)=>resp.json()).then((data)=>{
      data.success?alert ("Succesfuly added"):alert("Failed to add");
    })
  }
}
  return (
    <div className='add'>


      <div className="add-product-items">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='name here'  />
      </div>
      <div className="product-type">
      <div className="add-product-items">
        <p>Product type</p>
        <input  value={productDetails.type} onChange={changeHandler} type='text' name='type' placeholder='type'  />
      </div>
      </div>
      <div className="product-price">
        <div className="add-product-items">
          <p>Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='new price' />
        </div>
        <div className="add-product-items">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='old price' />
        </div>
      </div>
      <div className="add-product-items">
        <p>Product category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='product-selector'>
          <option value="mens clothing" >men</option>
          <option value="womens clothing" >women</option>
          <option value="KIDS" >kids</option>
          <option value="ELECTRONICS" >electronics</option>
          <option value="UTENSILS" >utensils</option>
        </select>
      </div>
      <div className="add-product-items">
        <label htmlFor="file-input">
             <img src={image?URL.createObjectURL(image):upload_icon} alt=""  className='add-poduct-image'/>
        </label>
        <input onChange={imageHandler} type="file"  name ="photo" id="file-input" hidden/>
      </div> 
      
      <button onClick={()=>{Add_products()}} className='add-btn'>ADD</button>
    </div>
  );
};

export default Add;
