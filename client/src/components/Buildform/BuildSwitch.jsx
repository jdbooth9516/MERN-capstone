import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

// redux imports

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSwitch } from '../../actions/switch';
import { removeBuildLayout } from '../../actions/layout';
import { setTotal, removeFromTotal } from '../../actions/total';

const BuildSwitch = ({
  setSwitch,
  buildlayout,
  removeBuildLayout,
  total,
  setTotal,
  removeFromTotal,
}) => {
  //STATE
  const [switches, setSwitches] = useState([]);

  useEffect(() => {
    checkForSwitches();
  }, [switches]);

  //METHOD
  const getSwitches = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/products/switch'
      );
      setSwitches(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkForSwitches = () => {
    if (switches.length === 0) {
      getSwitches();
    }
  };

  const handleChoice = choice => {
    setSwitch(choice.name, choice.price);
    setTotal(total, choice.price);
  };

  const goBack = () => {
    removeFromTotal(total, buildlayout[0].price);
    removeBuildLayout(buildlayout[0].id);
  };

  return (
    <Fragment>
      <div>
        <h2>Switches</h2>
      </div>

      <div className="cards-container">
        {switches.map((kswitches, index) => (
          <div
            className="layout-card"
            key={index}
            onClick={() => {
              handleChoice(kswitches);
            }}>
            <div className="layout-title">
              <h4>{kswitches.name}</h4>
            </div>
            <div className="layout-body">
              <p>{kswitches.shortdesc}</p>
            </div>

            <div className="layout-hidden" id={`hidding-${index}`}>
              <h6>More Information:</h6>
              <p>{kswitches.longdesc}</p>
            </div>

            <div className="layout-price">
              <h5>$ {kswitches.price}</h5>
            </div>
          </div>
        ))}
      </div>
      <div className="total-price">
        <h3>Build Cost</h3>
        <h3>$ {total} </h3>
      </div>

      <div>
        <button
          className="goback-btn"
          onClick={() => {
            goBack();
          }}>
          Go Back
        </button>
      </div>
    </Fragment>
  );
};

BuildSwitch.propTypes = {
  setSwitch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  buildlayout: state.buildlayout,
  total: state.total,
});

export default connect(mapStateToProps, {
  setSwitch,
  removeBuildLayout,
  setTotal,
  removeFromTotal,
})(BuildSwitch);
