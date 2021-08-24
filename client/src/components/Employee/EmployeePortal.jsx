import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LayoutChart from './charts/LayoutChart';
import SwitchChart from './charts/SwitchChart';
import { Link } from 'react-router-dom';

const EmployeePortal = () => {
  const [builds, setBuilds] = useState([]);
  const [chartsVis, setChartsVis] = useState('');

  useEffect(() => {
    checkForBuilds();
  }, [builds]);

  async function getAllBuilds() {
    const response = await axios.get('http://localhost:5000/api/build');
    setBuilds(response.data);
    console.log(response.data);
    createCarts();
  }

  const checkForBuilds = () => {
    if (builds.length === 0) {
      getAllBuilds();
    }
  };

  const createCarts = () => {
    setTimeout(() => {
      setChartsVis(
        <div>
          <div>{/* <SalesTable sold={sold} /> */}</div>
          <h4>Customer Interest by Builds</h4>
          <div>
            <LayoutChart />
          </div>
          <div>
            <SwitchChart />
          </div>
          <div>{/* <ServicesChart builds={builds} /> */}</div>
          <div>{/* <ExtrasChart builds={builds} /> */}</div>
        </div>
      );
    }, 500);
  };

  return (
    <div className='employee'>
      <h3>Employee Portal</h3>
      <div className='portal-container'>
        <div className='employee-options'>
          <h5>Product Options</h5>
          <Link to='/LayoutUpdate'>
            <button className='option-btn'>Layouts</button>
          </Link>
          <Link to='/SwitchUpdate'>
            <button className='option-btn'>Switches</button>
          </Link>
          <Link to='/ServicesUpdate'>
            <button className='option-btn'>Services</button>
          </Link>
          <Link to='/ExtrasUpdate'>
            <button className='option-btn'>Extras</button>
          </Link>
        </div>
        <div className='sales-container'>{chartsVis}</div>
      </div>
    </div>
  );
};

export default EmployeePortal;