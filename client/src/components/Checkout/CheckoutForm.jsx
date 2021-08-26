import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../../scss/Checkout.css';
import axios from 'axios';

export default function CheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const intentPayload = {
    totalprice: props.cart.builds[0].totalprice,
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    console.log(intentPayload);
    sendOrder();
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const sendOrder = async () => {
    const body = intentPayload;
    const response = await axios.post(
      'http://localhost:5000/api/checkout',
      body
    );
    console.log(response.data);
    setClientSecret(response.data.clientSecret);
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: props.user.email,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      alert('Payment Successful');
      props.setCardForm(false);
    }
  };

  return (
    <div className=' card-entry'>
      <button
        className='close-btn'
        onClick={() => {
          props.setCardForm(false);
        }}>
        x
      </button>
      <form id='payment-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className='info-btn'
          disabled={processing || disabled || succeeded}
          id='submit'>
          <span id='button-text'>
            {processing ? (
              <div className='spinner' id='spinner'></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
