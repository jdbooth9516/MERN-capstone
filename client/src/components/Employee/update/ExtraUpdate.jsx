import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import useForm from '../../useForm/useForm';
import axios from 'axios';

const ExtraUpdate = () => {
  const { values, handleChange, handleSubmit } = useForm(() => {
    updateExtras(values);
  });

  const [extras, setExtras] = useState([]);

  useEffect(() => {
    checkForExtras();
  }, [extras]);

  const getExtras = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/products/extra'
      );
      setExtras(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkForExtras = () => {
    if (extras.length === 0) {
      getExtras();
    }
  };

  const updateExtras = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/products', values);
      getExtras();
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatedExtras = extras.map((extra, index) => (
    <div key={index} className='layout-view'>
      <div className='layout-view-item'>
        <h5>Name</h5>
        <p>{extra.name}</p>
      </div>
      <div className='layout-view-item'>
        <h5>Short Description</h5>
        <p className='layout-view-item'>{extra.shortdesc}</p>
      </div>
      <div className='layout-view-item'>
        <h5>Long Description</h5>
        <p className='layout-view-item'>{extra.longdesc}</p>
      </div>
      <div className='layout-view-item'>
        <h5>Price</h5>
        <p>{extra.price}</p>
      </div>
    </div>
  ));

  return (
    <div className='update-section'>
      <div>{formatedExtras}</div>
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
            Update
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ExtraUpdate;
