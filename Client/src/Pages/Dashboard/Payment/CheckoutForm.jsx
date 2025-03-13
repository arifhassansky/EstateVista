import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ id }) => {
  const axiosSecure = useAxiosSecure()

  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  console.log(id);

  const {
    data: offer,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userOffers", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`${import.meta.env.VITE_URL}/offer/${id}`);
      return data;
    },
  });

  useEffect(() => {
    if (offer?.offerAmount > 0) {
      axiosSecure
        .post(`${import.meta.env.VITE_URL}/create-payment-intent`, {
          price: parseInt(offer?.offerAmount),
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [offer?.offerAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          email: user.email,
          price: offer?.offerAmount,
          transactionId: paymentIntent.id,
          date: new Date().toISOString(), 
          offerIds: offer?._id, 
          status: "pending",
        };

        const res = await axiosSecure.post(`${import.meta.env.VITE_URL}/payments`, payment);
        console.log("payment saved", res.data);
        refetch();
        if (res.data?.paymentResult?.insertedId) {
            toast.success("Thank You for the Payment")
            navigate('/dashboard/paymentHistory')
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
              
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
         className="p-4 border-2 border-primary/30 focus:outline-primary/60 rounded-md "
      />
      <button
        className="btn w-full text-white bg-primary hover:bg-secondary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
