import React, { useEffect, useRef } from 'react'

const Paypal = ({totalAmount}) => {

    const paypal = useRef()
    useEffect (()=>{
        if (!totalAmount) return;

     window.paypal.Buttons({ 
         createOrder: (data,actions,err) => {
            return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                    {
                     description: "",
                     amount:{
                        currency_code: "USD",
                        value: totalAmount.toFixed(2),
                     }   
                    }
                ]
            })
         },
         onApprove: async (data,actions) =>{
            const order =await actions.order.capture()
            console.log(order);

         },
         onErr: (err) =>{
            console.log(err);
         }
     }).render(paypal.current)
    }, [totalAmount])
  return (
    <div>
     <div ref={paypal}></div>
    </div>
  )
}

export default Paypal
