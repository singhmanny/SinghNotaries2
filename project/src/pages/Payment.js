import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51N6Q8tAaJk6jpItYNUQChkrlVeNeOoTxS0aIeaa6trYzCrtsvR2dwcmrKhztDgKLkGG197e0m1ZZbKr2ZJEC0ojW00GFNxJGdO");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const payment = async () => {
      try {
        const response = await axios.post("pay", {
        });
        const data = response.data;
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    payment();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options} >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}