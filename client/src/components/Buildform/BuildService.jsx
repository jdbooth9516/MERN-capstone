import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

// redux imports
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setService } from '../../actions/service';
import { removeBuildSwitch } from '../../actions/switch';
import { setTotal, removeFromTotal } from '../../actions/total';

const BuildService = ({
  setService,
  buildswitch,
  removeBuildSwitch,
  total,
  setTotal,
  removeFromTotal,
}) => {
  //STATE
  const [services, setServices] = useState([]);

  useEffect(() => {
    checkForServices();
  }, [services]);

  //METHODS
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

  const handleChoice = (choice) => {
    setService(choice.name, choice.price);
    setTotal(total, choice.price);
  };

  const goBack = () => {
    removeFromTotal(total, buildswitch[0].price);
    removeBuildSwitch(buildswitch[0].id);
  };
  return (
    <Fragment>
      <div>
        <h2>Services</h2>
      </div>
      <div>
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => {
              handleChoice(service);
            }}>
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
      <div className='total-price'>
        <h3>Build Cost</h3>
        <h3>$ {total} </h3>
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
  total: state.total,
});

export default connect(mapStateToProps, {
  setService,
  removeBuildSwitch,
  setTotal,
  removeFromTotal,
})(BuildService);
