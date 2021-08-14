import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import useForm from '../UseForm/UseForm';

import './Login.css';

const Login = (props) => {
  const { values, handleChange, handleSubmit } = useForm(() => {
    loginUser(values);
  });

  function loginUser(values) {
    async function getUser(values) {
      try {
        const response = await axios.post(
          'http://localhost:8000/login/',
          values
        );
        const userData = JSON.stringify(response.data);
        console.log(userData);
        localStorage.setItem('user', userData);
        console.log(localStorage.getItem('user'));
        window.location.href = '/';
      } catch (error) {
        console.log(error.response);
        alert('Login failed, check username or password. ');
      }
    }
    getUser(values);
  }

  return (
    <div>
      <div className='form-container'>
        <Form>
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
              placeholder='Password'
              defaultValue=''
              onChange={handleChange}
              value={values.password}
            />
          </FormGroup>
          <button onClick={handleSubmit} className='reg-submit'>
            Login
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
