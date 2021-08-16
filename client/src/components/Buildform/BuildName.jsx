import React, { Fragment } from 'react';
import useForm from '../useForm/useForm';
import { Form, FormGroup, Label, Input } from 'reactstrap';

// redux imports
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setName } from '../../actions/buildname';

const BuildName = ({setName}) => {
  const { values, handleChange, handleSubmit } = useForm(() => {
    setBuildName(values);
  });

  function setBuildName(values) {
    setName(values.name);
  }

  return (
    <Fragment className='name-container'>
      <div>
        <h2> Name your build </h2>
      </div>
      <Form>
        <FormGroup>
          <Label for='name'> Build Name </Label>
          <Input
            type='text'
            name='name'
            id='name'
            placeholder='build name'
            defaultValue=''
            onChange={handleChange}
            value={values.name}
          />
        </FormGroup>
        <button className='reg-submit' onClick={handleSubmit}>
          Confirm
        </button>
      </Form>
    </Fragment>
  );
};

BuildName.propTypes = {
  setName: PropTypes.func.isRequired,
};

export default connect(null, { setName })(BuildName);