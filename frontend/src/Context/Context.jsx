
import React, { createContext, useEffect, useState } from "react";




export const Context = createContext(null);

const getDefaultCart = ()=>{
    let cart= {};
     for (let index = 0; index < 200+1; index++) {
        cart[index] = 0;
        
     }
     return cart;
}
const ContextProvider = (props) => {


    const [all_products,setAll_products]=useState([]);
    
    
    const [cartItems,setCartItems]= useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:5000/allproducts')
        .then((response)=>response.json())
        .then ((data)=>setAll_products(data))
        

        // if(localStorage.getItem('auth-token')){
        //     fetch('http://localhost:5000/getcart',{
        //         method:'POST',
        //         headers:{
        //             Accept:'application/form-data',
        //             'auth-token':`${localStorage.getItem('auth-token')}`,
        //             'Content-Type': 'application/json',
                    
        //         },
        //            body:"",
        //         }).then((response)=>response.json())
        //         .then((data)=>setCartItems('data'));

        // }

    },[])

   
const addToCart = (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    // if(localStorage.getItem('auth-token')){
    //     fetch('http://localhost:5000/addtocart',{
    //     method:'POST',
    //     headers:{
    //         Accept:'application/form-data',
    //         'auth-token':`${localStorage.getItem('auth-token')}`,
    //         'Content-Type': 'application/json',
            
    //     },
    //        body:JSON.stringify({itemId}),
    //     })
    //     .then((response)=>response.json())
    //     .then((data)=>console.log('data'));
    // }
}
const removeFromCart = (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
if(localStorage.getItem('auth-token')){
    fetch('http://localhost:5000/removefromcart',{
        method:'POST',
        headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type': 'application/json',
            
        },
           body:JSON.stringify({itemId}),
        })
        .then((response)=>response.json())
        .then((data)=>console.log('data'));

}
}


const getTotalCartAmount = () =>{
    let totalAmount = 0;
     for (const item in cartItems){
        if(cartItems[item]>0){
            let itemInfo = all_products.find((product)=>product.id === Number(item));
            totalAmount += itemInfo.new_price * cartItems[item];
        }
        
     }
     return totalAmount;
}

const getTotalCartItems = () =>{
    let totalItem = 0;
    for(const item in cartItems)
    {
        if ( cartItems[item]>0)
        {
            totalItem+= cartItems[item];
        }
    }
return totalItem;

}


    
const contextValue = {getTotalCartAmount,all_products,cartItems,addToCart,removeFromCart,getTotalCartItems};
    return (
   <Context.Provider value={contextValue}>
   {props.children}
   </Context.Provider>
    );
}
export default ContextProvider;