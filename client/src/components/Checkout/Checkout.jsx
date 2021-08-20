import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import useForm from '../useForm/useForm';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Checkout = () => {
  //State
  const { values, handleChange, handleSubmit } = useForm(() => {
    createPaymentAccount(values);
  });
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    checkForCart();
  }, []);

  let cookieCrumble = document.cookie.split('=');
  const user = cookieCrumble[1];
  const userId = jwt.decode(user);

  //Methods

  const getCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/user`, {
        headers: { 'x-auth-token': user },
      });
      setCart(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getPaymentAccount = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/paymentaccount',
        { headers: { 'x-auth-token': user } }
      );
      setPayment(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  function createPaymentAccount(value) {
    const payload = {
      user: user.id,
      address: value.address,
      city: value.city,
      state: value.state,
      zip: value.zip,
    };
    async function addPaymentToDatabase() {
      try {
        await axios.post('http://localhost:5000/api/paymentaccount', payload, {
          headers: { 'x-auth-token': user },
        });
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
          <div>
            <button
              onClick={() => {
                getPaymentAccount();
              }}>
              Use Previous payment
            </button>
          </div>
          {payment.length === 0 && (
            <div className="form-container">
              <Form>
                <FormGroup>
                  <Label for="address">address</Label>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="address"
                    defaultValue=""
                    onChange={handleChange}
                    value={values.address}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city">city</Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="city"
                    defaultValue=""
                    onChange={handleChange}
                    value={values.city}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="state">state</Label>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="state"
                    defaultValue=""
                    onChange={handleChange}
                    value={values.state}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="zip">zip</Label>
                  <Input
                    type="text"
                    name="zip"
                    id="zip"
                    placeholder="zip"
                    defaultValue=""
                    onChange={handleChange}
                    value={values.zip}
                  />
                </FormGroup>
                <button onClick={handleSubmit} className="reg-submit">
                  Login
                </button>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
