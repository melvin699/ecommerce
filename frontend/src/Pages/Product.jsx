import React, { useContext } from 'react';
import { useParams} from 'react-router-dom';
import { Context } from '../Context/Context';
import Cramps from '../Components/Cramps/Cramps';
import ShopCategory from './ShopCategory';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Related from '../Components/RelatedProducts/Related';
import ComparisonPage from '../Components/ComparisonPage/ComparisonPage';

const Product = () => {
  const {all_products}= useContext(Context);
  const {productId,productType} = useParams();
  

  let product;

  if (productId){
    product = all_products.find((e)=> e.id === Number(productId));

  } else if (productType){
    product = all_products.filter((e) => e.type === productType);

  }




  return (
    <div>
      <Cramps product = {product}/>
      <ProductDisplay product ={product} />
      <Related/>

  
    </div>
  );
};

export default Product;
