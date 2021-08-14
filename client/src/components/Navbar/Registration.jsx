import React from 'react';
import useForm from '../useForm/useForm';
import axios from 'axios';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import '../../scss/Registration.css';

const Registration = ({ history }) => {
  const { values, handleChange, handleSubmit } = useForm(() => {
    console.log(values);
    registerUser(values);
  });

  function registerUser(values) {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    async function addUserToDataBase(payload) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/users',
          payload
        );
        history.push('/login');
      } catch (error) {
        console.error(error.message);
      }
    }
    addUserToDataBase(payload);
  }
  return (
    <div>
      <div className='form-container'>
        <Form>
          <FormGroup>
            <Label for='name'>Full Name</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='Full Name'
              defaultValue=''
              onChange={handleChange}
              value={values.name}
            />
          </FormGroup>
          <FormGroup>
            <Label for='email'>email</Label>
            <Input
              type='text'
              name='email'
              id='email'
              placeholder='email'
              defaultValue=''
              onChange={handleChange}
              value={values.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password</Label>
            <Input
              type='password'
              name='password'
              id='password'
              placeholder='Create A Password'
              defaultValue=''
              onChange={handleChange}
              value={values.password}
            />
          </FormGroup>
          <FormGroup>
            <Label for='password2'>Re-enter Password</Label>
            <Input
              type='password'
              name='password2'
              id='password2'
              placeholder='Create A Password'
              defaultValue=''
              onChange={handleChange}
              value={values.password2}
            />
          </FormGroup>
          <button onClick={handleSubmit} className='reg-submit'>
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
