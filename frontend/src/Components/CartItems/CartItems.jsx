import React, { useContext, useState } from 'react';
import './CartItems.css';
import { Context } from '../../Context/Context';
import remove_icon from '../Images/remove1.png';
import PaymentOptions from '../PaymentOptions/PaymentOptions';
import Paypal from '../Paypal';


const CartItems = () => {
  const { getTotalCartAmount, all_products, cartItems, addToCart, removeFromCart } = useContext(Context);

  const [totalAmount, setTotalAmount] = useState(0); 
  const [voucherCode, setVoucherCode] = useState(''); 
  const [discount, setDiscount] = useState(0); 


  
 
  
const handleApplyVoucher = async () => {
  try {
    const response = await fetch('http://localhost:5000/validate-voucher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ voucherCode })
    });
    const data = await response.json();
    if (data.success) {
      setDiscount(data.discountPercentage);
    } else {
      alert('Invalid voucher code');
      setDiscount(0); 
    }
  } catch (error) {
    console.error('Error applying voucher:', error);
  }
};



const handleProceedToPayment = () => {
  setTotalAmount(getTotalCartAmount() - discount); 
};




  return (
    <div className="sidebar-container">
      <div className='cartitem'>
        <div className="cartitems-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {all_products.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div>
                <div className="cartitems-format cartitems-main">
                  <img src={e.image} alt="" className='carticon-product-icon' />
                  <p>{e.name}</p>
                  <p>KSH{e.new_price}</p>
                  <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                  <p>KSH{e.new_price * cartItems[e.id]}</p>
                  <img className='cartitems-remove' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
        <div className="cartitems-below">
          <div className="cartitems-total">
            <h1>The Total is</h1>
            <div>
              <div className="cartitems-total-2">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-2">
                <p>shipping fee</p>
                <p>free</p>
              </div>
              <hr />
              <div className="cartitems-total-2">
                <h3>Total</h3>
                <h3>KSH{getTotalCartAmount() - discount}</h3>
              </div>
            </div>
            <button onClick={handleProceedToPayment}>PROCEED TO BUY</button>
          </div>
          <div className="cartitems-promocode">
            <p>Enter your VOUCHER</p>
            <div className="promocode">
              <input type="text" placeholder='promocode, voucher' value={voucherCode} 
                onChange={(e) => setVoucherCode(e.target.value)}  />
              <button onClick={handleApplyVoucher}>Apply</button>
              
            </div>
          </div>
        </div>
      </div>
      <div>
        
      </div>
      {totalAmount > 0 && <Paypal totalAmount={totalAmount} />} 
    </div>
  );
};

export default CartItems;
