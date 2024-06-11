import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import yellow_star from '../Images/yello-star.png';
import white_star from '../Images/white-start.png';
import { Context } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = (props) => {
    const { product } = props;
    const navigate = useNavigate();
    const { addToCart } = useContext(Context);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const [mainImage, setMainImage] = useState(product.image);

    const handleComparePrices = () => {
      navigate(`/comparison/${product.type}`);
    };

    const handleSizeSelect = (size) => {
      setSelectedSize(size);
    };

    const handleRatingSelect = (rating) => {
      setSelectedRating(rating);
      console.log('Selected rating:', rating);
    };

    const handleImageClick = (image) => {
      setMainImage(image);
    };

    const renderSizeSelection = () => {
      if (product.category === 'UTENSILS' || product.category === 'ELECTRONICS') {
        return null; 
      }

      return (
        <div className="displayproduct-size">
          <h1>Select Size</h1> 
          <div className="displayproduct-sizes">
            <div onClick={() => handleSizeSelect('S')} className={selectedSize === 'S' ? 'selected' : ''}>S</div>
            <div onClick={() => handleSizeSelect('M')} className={selectedSize === 'M' ? 'selected' : ''}>M</div>
            <div onClick={() => handleSizeSelect('L')} className={selectedSize === 'L' ? 'selected' : ''}>L</div>
            <div onClick={() => handleSizeSelect('XL')} className={selectedSize === 'XL' ? 'selected' : ''}>XL</div>
            <div onClick={() => handleSizeSelect('XXL')} className={selectedSize === 'XXL' ? 'selected' : ''}>XXL</div>
          </div>
        </div>
      );
    };

    return (
      <div className='productdisplay'>
        <div className="display-left">
          <div className="displayproduct-img-list">
            {product.images && product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
          <div className="displayproduct-img">
            <img className='displayproduct-main-img' src={mainImage} alt="" />
          </div>
        </div>
        <div className="display-right">
          <h1>{product.name}</h1>
          <div className="display-right-star">
            {[1, 2, 3, 4, 5].map((index) => (
              <img
                key={index}
                src={index <= selectedRating ? yellow_star : white_star}
                alt=""
                className={index <= selectedRating ? 'selected' : ''}
                onClick={() => handleRatingSelect(index)}
              />
            ))}
            <p>{product.ratingCount}</p>
          </div>
          <div className="displayproduct-prices">
            <div className="displayproduct-old-price"> KSH{product.old_price} </div>
            <div className="displayproduct-new-price">KSH{product.new_price}</div>
          </div>
          <div className="displayproduct-description">
            Ostrich Feather Skirt Punk Leather Feather Trim Clubwear For Festivals
          </div>
          {renderSizeSelection()} 
          <div className="button-container">
            <button className="add-to-cart" onClick={() => { addToCart(product.id) }}>Add to Cart</button>
            <button className="compare-prices" onClick={handleComparePrices}>Compare Prices</button>
          </div>
          <p className="displayproduct-category"><span>Category :</span>{product.category}</p>
          <p className="displayproduct-category"><span>Tags :</span>Latest,modern </p>
        </div>
      </div>
    );
};

export default ProductDisplay;
