import React, { useState } from 'react';
import axios from 'axios';
import './Voucher.css';

const Voucher = () => {
  const [voucher, setVoucher] = useState(null);

  const handleGenerateVoucher = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-vouchers');
      const data = response.data;
      if (data.success) {
        setVoucher(data.voucher);
      } else {
        console.error('Failed to generate voucher:', data.message);
      }
    } catch (error) {
      console.error('Error generating voucher:', error);
    }
  };

  return (
    <div className="voucher-container">
      <h2>Voucher Generator</h2>
      <button className="button" onClick={handleGenerateVoucher}>Generate Voucher</button>
      {voucher && (
        <div className="voucher-details">
          <h3>Voucher Details</h3>
          <p>Code: {voucher.code}</p>
          <p>Discount Percentage: {voucher.discountPercentage}</p>
        </div>
      )}
    </div>
  );
};

export default Voucher;
