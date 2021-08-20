import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const Checkout = () => {
  //State
  const [cart, setCart] = useState([]);

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
      </div>
    </div>
  );
};

export default Checkout;
