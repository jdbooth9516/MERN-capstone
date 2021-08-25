import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShoppingCart = () => {
  const [builds, setBuilds] = useState([]);
  useEffect(() => {
    checkForBuilds();
  }, [builds]);

  let cookieCrumble = document.cookie.split('=');
  const user = cookieCrumble[1];

  const getBuilds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/build/user', {
        headers: { 'x-auth-token': user },
      });
      setBuilds(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkForBuilds = () => {
    if (builds.length === 0) {
      getBuilds();
    }
  };

  const createCart = async build => {
    const payload = {
      user: build.user,
      builds: build,
    };
    try {
      await axios.post('http://localhost:5000/api/cart', payload, {
        headers: { 'x-auth-token': user },
      });
    } catch (error) {}
  };

  return (
    <div>
      {builds.map((build, index) => (
        <div key={index}>
          <div>
            <h6> Build Name</h6>
            <h6>{build.buildname}</h6>
          </div>
          <div>
            <h6> Layout Selection</h6>
            <h6> {build.products[0]}</h6>
          </div>

          <div>
            <h6> Switch Selection</h6>
            <h6> {build.products[1]}</h6>
          </div>

          <div>
            <h6> Service Selection</h6>
            <h6> {build.products[2]}</h6>
          </div>

          <div>
            <h6> Extra Selection</h6>
            <h6> {build.products[3]}</h6>
          </div>

          <div>
            <h6>Total Price</h6>
            <h6>$ {build.totalprice} </h6>
          </div>
          <button
            onClick={() => {
              createCart(build);
            }}>
            Add to Cart
          </button>
        </div>
      ))}
      <div>
        <Link to="/checkout">
          <button>Go to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
