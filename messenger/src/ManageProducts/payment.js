import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PaymentIcon from '@mui/icons-material/Payment';


export default function StripePayment(props) {
    console.log("product in the payment", props)
    const {product} = props


    const makePayment = token =>{
        const body={
            token, 
            product
          };
      
          const headers = {
            "content-type": "application/json"
          };
      
          return fetch(`http://localhost:8000/api/payment`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
          })
          .then(response =>{
            console.log("RESPONSE", response)
            const {status} = response;
            console.log("STATUS",status)
          })
          .catch(error => console.log(error))

    }
    
    return (
        <div>

            <StripeCheckout
                stripeKey={process.env.STRIPE_PK}
                token={makePayment}
                name={`Buy ${product.title}`}
                amount={product.price*100}
                shippingAddress
                billingAddress
            
            >
            <Fab variant="extended" size="medium" color="primary">
                <span style={{"margin-right":10}}>Buy</span>  <PaymentIcon fontSize= "small"/>
            </Fab>
            

            </StripeCheckout>
            
        </div>
    )
}
