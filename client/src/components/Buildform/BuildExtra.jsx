import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

//redux imports

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setExtra } from '../../actions/extra';
import { removeBuildServices } from '../../actions/service';
import { setTotal, removeFromTotal } from '../../actions/total';

const BuildExtra = ({
  setExtra,
  buildservice,
  removeBuildServices,
  total,
  setTotal,
  removeFromTotal,
}) => {
  //STATE
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    checkForExtras();
  }, [extras]);

  //METHODS
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

  const handleChoice = (choice) => {
    setExtra(choice.name, choice.price);
    setTotal(total, choice.price);
  };

  const goBack = () => {
    removeFromTotal(total, buildservice[0].price);
    removeBuildServices(buildservice[0].id);
  };

  return (
    <Fragment>
      <div>
        <h2>Product extras</h2>
      </div>

      <div className='cards-container'>
        {extras.map((extra, index) => (
          <div
            className='layout-card'
            key={index}
            onClick={() => {
              handleChoice(extra);
            }}
            onMouseEnter={() => {
              const unhide = document.getElementById(`hidding-${index}`);
              unhide.style.display = 'block';
            }}
            onMouseLeave={() => {
              const hide = document.getElementById(`hidding-${index}`);
              hide.style.display = 'none';
            }}>
            <div className='layout-title'>
              <h4>{extra.name}</h4>
            </div>
            <div className='layout-body'>
              <p>{extra.shortdesc}</p>
            </div>

            <div className='layout-hidden' id={`hidding-${index}`}>
              <h6>More Information:</h6>
              <p>{extra.longdesc}</p>
            </div>

            <div className='layout-price'>
              <h5>$ {extra.price}</h5>
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

BuildExtra.propTypes = {
  setExtra: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buildservice: state.buildservice,
  total: state.total,
});

export default connect(mapStateToProps, {
  setExtra,
  removeBuildServices,
  setTotal,
  removeFromTotal,
})(BuildExtra);
