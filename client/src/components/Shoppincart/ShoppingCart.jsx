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

  const deleteBuild = async (buildName) => {
    const payload = {
      buildname: buildName,
    };
    try {
      await axios.delete(
        `http://localhost:5000/api/build/${buildName}`,
        {
          headers: { 'x-auth-token': user },
        },
        payload
      );
      getBuilds();
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkForBuilds = () => {
    if (builds.length === 0) {
      getBuilds();
    }
  };

  const createCart = async (build) => {
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
      <div>
        <Link to='/checkout'>
          <button className='build-btn'>Go to Checkout</button>
        </Link>
      </div>
      <div className='cards-container'>
        {builds.map((build, index) => (
          <div key={index} className='layout-card'>
            <div>
              <h5> Build Name</h5>
              <h6>{build.buildname}</h6>
            </div>
            <div>
              <h5> Layout Selection</h5>
              <h6> {build.products[0]}</h6>
            </div>

            <div>
              <h5> Switch Selection</h5>
              <h6> {build.products[1]}</h6>
            </div>

            <div>
              <h5> Service Selection</h5>
              <h6> {build.products[2]}</h6>
            </div>

            <div>
              <h5> Extra Selection</h5>
              <h6> {build.products[3]}</h6>
            </div>

            <div>
              <h5>Total Price</h5>
              <h6>$ {build.totalprice} </h6>
            </div>
            <button
              className='info-btn'
              onClick={() => {
                createCart(build);
              }}>
              Buy Now
            </button>
            <button
              className='category-btn-4'
              onClick={() => {
                deleteBuild(build.buildname);
              }}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div>
        <Link to='/checkout'>
          <button className='build-btn'>Go to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
