import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import useForm from '../../useForm/useForm';
import axios from 'axios';

const ServiceUpdate = () => {
  const { values, handleChange, handleSubmit } = useForm(() => {
    updateService(values);
  });
  const [services, setServices] = useState([]);

  useEffect(() => {
    checkForServices();
  }, [services]);

  const getServices = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/products/service'
      );
      setServices(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkForServices = () => {
    if (services.length === 0) {
      getServices();
    }
  };

  const updateService = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/products', values);
      getServices();
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatedServices = services.map((service, index) => (
    <div key={index} className='layout-view'>
      <div className='layout-view-item'>
        <h5>Name</h5>
        <p>{service.name}</p>
      </div>
      <div className='layout-view-item'>
        <h5>Short Description</h5>
        <p className='layout-view-item'>{service.shortdesc}</p>
      </div>
      <div className='layout-view-item'>
        <h5>Long Description</h5>
        <p className='layout-view-item'>{service.longdesc}</p>
      </div>
      <div className='layout-view-item'>
        <h5>Price</h5>
        <p>{service.price}</p>
      </div>
    </div>
  ));

  return (
    <div className='update-section'>
      <div>{formatedServices}</div>
      <div className='form-container'>
        <Form>
          <FormGroup>
            <Label for='name'>Name</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='name'
              defaultValue=''
              onChange={handleChange}
              value={values.name}
            />
          </FormGroup>
          <FormGroup>
            <Label for='shortdesc'> Short Discription</Label>
            <Input
              type='text'
              name='shortdesc'
              id='shortdesc'
              placeholder='Short Description'
              defaultValue=''
              onChange={handleChange}
              value={values.shortdesc}
            />
          </FormGroup>
          <FormGroup>
            <Label for='longdesc'>Long Discription</Label>
            <Input
              type='text'
              name='longdesc'
              id='longdesc'
              placeholder='Long Description'
              defaultValue=''
              onChange={handleChange}
              value={values.longdesc}
            />
          </FormGroup>
          <FormGroup>
            <Label for='price'>Price</Label>
            <Input
              type='text'
              name='price'
              id='price'
              placeholder='price'
              defaultValue=''
              onChange={handleChange}
              value={values.price}
            />
          </FormGroup>
          <button onClick={handleSubmit} className='info-btn'>
            {' '}
            Update
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ServiceUpdate;
