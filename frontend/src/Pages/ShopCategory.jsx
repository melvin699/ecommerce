import React, { useState } from 'react';
import './Css/ShopCategory.css'
import { useContext } from 'react';
import { Context } from '../Context/Context';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {

  const {all_products} = useContext(Context);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const filteredResults = all_products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };
  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" />
      <div className="category-indexsort">
      <div className="search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
       
      </div>
    <div className="category-products">
      {searchResults.length > 0
          ? searchResults.map((item, i) => (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))
      
      
      :all_products.map((item,i)=>{
      if (props.category===item.category){
        return<Item key = {i} id={item.id} name = {item.name} image = {item.image} new_price ={item.new_price} old_price = {item.old_price} />
      }
      else{
        return null;
      }
    })}
    </div>
    <div className="category-more">
      Explore more
    </div>
    </div>
  );
};

export default ShopCategory;
