
import { useState } from 'react';

const userForm = (callback) => {
  const [values, setValues] = userState({});

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return { values, handleChange, handleSubmit }
};

export default userForm;
S
