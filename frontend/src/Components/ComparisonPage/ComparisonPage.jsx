import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../Context/Context';
import './ComparisonPage.css'
import Item from '../Item/Item';


const ComparisonPage = () => {
  const { all_products } = useContext(Context);
  const { productType } = useParams();
  const navigate = useNavigate();

  

  useEffect(() => {
    console.log('Product type:', productType);
  }, [productType]);

  
  const similarProducts = all_products.filter((product) => product.type === productType);
  
  console.log('Similar products:', similarProducts);
  return (
    <div className="comparison-container">
  <h2 className="comparison-title">Comparison Page</h2>
  <p className="product-type">Products with type: {productType}</p>
  <div className="product-grid">
    {similarProducts.map((item, i) => (
      <div className="product-item"  key={i}>
        <img src={item.image} alt={item.name} />
        <div className="product-details">
          <p className="product-name">{item.name}</p>
          <p className="product-price">
            <span className="product-old-price">Old Price: {item.old_price}</span>
            <span className="product-new-price">New Price: {item.new_price}</span>
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ComparisonPage;
