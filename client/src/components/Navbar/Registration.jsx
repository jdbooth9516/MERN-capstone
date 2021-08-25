import React from 'react';
import useForm from '../useForm/useForm';
import axios from 'axios';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

import '../../scss/Registraion.css';

const Registration = ({ history, setAlert }) => {
  const { values, handleChange, handleSubmit } = useForm(() => {
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
    // deconstruct the values
    const { password, password2 } = values;
    if (password === password2) {
      addUserToDataBase(payload);
    } else {
      setAlert('Passwords do not match', 'danger');
    }
  }

  return (
    <div className="form-body">
      <div className="form-container">
        <Form>
          <FormGroup>
            <Label for="name">Full Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              defaultValue=""
              onChange={handleChange}
              value={values.name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              defaultValue=""
              onChange={handleChange}
              value={values.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Create A Password"
              defaultValue=""
              onChange={handleChange}
              value={values.password}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password2">Re-enter Password</Label>
            <Input
              type="password"
              name="password2"
              id="password2"
              placeholder="Create A Password"
              defaultValue=""
              onChange={handleChange}
              value={values.password2}
            />
          </FormGroup>
          <button onClick={handleSubmit} className="build-btn">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

Registration.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Registration);
