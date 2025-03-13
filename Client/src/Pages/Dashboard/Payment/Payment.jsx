import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const Payment = () => {
    const {id} = useParams()
   
    return (
       <div className='my-10'>
         <div>
            <h2 className='text-4xl text-center font-bold'>Payment</h2>
            </div>
            <div className='max-w-lg mx-auto my-10 '>
               <Elements stripe={stripePromise}>
               <CheckoutForm id={id}/>
               </Elements>
            </div>
       </div>
    );
};

export default Payment;