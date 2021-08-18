import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

// redux imports
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setService } from '../../actions/service';
import { removeBuildSwitch } from '../../actions/switch';

const BuildService = ({ setService, buildswitch, removeBuildSwitch }) => {
  //STATE
  const [services, setServices] = useState([]);

  //METHODS
  const getServices = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/products/switch'
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

  const handleChoice = (choice) => {
    setService(choice.name, choice.price);
  };

  const goBack = () => {
    console.log(buildswitch[0].id);
    removeBuildSwitch(buildswitch[0].id);
  };
  return (
    <Fragment>
      <div>
        <h2>Services</h2>
      </div>
      <div>
        {services.map((service, index) => (
          <div key={index} onClick={handleChoice(service)}>
            <div className='layout-title'>
              <h4>{service.name}</h4>
            </div>
            <div className='layout-body'>
              <p>{service.shortdesc}</p>
            </div>

            <div className='layout-hidden' id={`hidding-${index}`}>
              <h6>More Information:</h6>
              <p>{service.longdesc}</p>
            </div>

            <div className='layout-price'>
              <h5>$ {service.price}</h5>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          className='goback-btn'
          onClick={() => {
            goBack();
          }}>
          Go Back
        </button>
      </div>
    </Fragment>
  );
};

BuildService.propTypes = {
  setService: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buildswitch: state.buildswitch,
});

export default connect(mapStateToProps, { setService, removeBuildSwitch })(
  BuildService
);
