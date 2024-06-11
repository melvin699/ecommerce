import React, { useState } from 'react';
import './PaymentOptions.css';
import axios from 'axios';

const PaymentOptions = ({ }) => {
  const [ setPaymentId] = useState('');

  const handlePayment = async () => {
    try {
        const response = await axios.post('/createpayment');
        const { success, payment } = response.data;
        if (success) {
            setPaymentId(payment.id);
            window.location.href = payment.links.find(link => link.rel === 'approval_url').href;
        } else {
            console.error('Error creating PayPal payment:', response.data.error);
        }
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        console.error('Error details:', error.response); 
    }
};


    return (
        <div>
            <button onClick={handlePayment}>Pay with PayPal</button>
        </div>
    );
};
 

export default PaymentOptions;
