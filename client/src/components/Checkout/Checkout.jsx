import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import useForm from '../useForm/useForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { setAlert } from '../../actions/alert';

const promise = loadStripe(
  'pk_test_51J09k7IegiEVwxhXQzJAvrbfhn0KdEmpKypJglBe5AUr2q51UH2kTbJBPXMRRpMi4BV1CAfHFYXuaRjlkVpzWbza006lO7p2Rg'
);

const Checkout = () => {
  //State
  const { values, handleChange, handleSubmit } = useForm(() => {
    createPaymentAccount(values);
  });
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState([]);
  const [cardForm, setCardForm] = useState(false);

  useEffect(() => {
    checkForCart();
  }, [cart, payment]);

  let cookieCrumble = document.cookie.split('=');
  const token = cookieCrumble[1];
  const userId = jwt.decode(token);

  //Methods

  const getCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/user`, {
        headers: { 'x-auth-token': token },
      });
      setCart(response.data);
      getPaymentAccount();
    } catch (error) {
      setAlert('No Payment Account found Please enter on below.');
    }
  };

  const getPaymentAccount = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/paymentaccount',
        { headers: { 'x-auth-token': token } }
      );
      setPayment(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  function createPaymentAccount(value) {
    const payload = {
      user: userId,
      address: value.address,
      city: value.city,
      state: value.state,
      zip: value.zip,
    };
    async function addPaymentToDatabase() {
      try {
        await axios.post('http://localhost:5000/api/paymentaccount', payload, {
          headers: { 'x-auth-token': token },
        });
        getPaymentAccount();
      } catch (error) {
        console.error(error.message);
      }
    }
    addPaymentToDatabase();
  }

  const checkForCart = () => {
    if (cart.length === 0) {
      getCart();
    }
  };

  return (
    <div>
      <h6>checkout</h6>
      <div>
        {cart.map((item, index) => (
          <div key={index}>
            <h6>{item.builds[0].buildname}</h6>
            <h6> $ {item.builds[0].totalprice}</h6>
          </div>
        ))}
        <div>
          {payment.length === 0 && (
            <div className='form-container'>
              <Form>
                <FormGroup>
                  <Label for='address'>address</Label>
                  <Input
                    type='text'
                    name='address'
                    id='address'
                    placeholder='address'
                    defaultValue=''
                    onChange={handleChange}
                    value={values.address}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='city'>city</Label>
                  <Input
                    type='text'
                    name='city'
                    id='city'
                    placeholder='city'
                    defaultValue=''
                    onChange={handleChange}
                    value={values.city}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='state'>state</Label>
                  <Input
                    type='text'
                    name='state'
                    id='state'
                    placeholder='state'
                    defaultValue=''
                    onChange={handleChange}
                    value={values.state}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='zip'>zip</Label>
                  <Input
                    type='text'
                    name='zip'
                    id='zip'
                    placeholder='zip'
                    defaultValue=''
                    onChange={handleChange}
                    value={values.zip}
                  />
                </FormGroup>
                <button onClick={handleSubmit} className='reg-submit'>
                  Login
                </button>
              </Form>
            </div>
          )}
          {/* Shows a payment account if one is already present*/}
          {payment && (
            <div>
              <div>
                <h3>Current Payment Account</h3>
                <h5> {payment.address}</h5>
                <h5> {payment.city}</h5>
                <h5> {payment.state}</h5>
                <h5> {payment.zip}</h5>
              </div>
              <div>
                <button
                  onClick={() => {
                    setCardForm(!cardForm);
                  }}>
                  Checkout
                </button>
              </div>
              <ReactModal isOpen={cardForm}>
                <Elements stripe={promise}>
                  <CheckoutForm
                    cart={cart[0]}
                    setCardForm={setCardForm}
                    user={userId.user}
                  />
                </Elements>
              </ReactModal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
