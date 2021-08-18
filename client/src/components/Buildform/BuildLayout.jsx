import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

// redux imports
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLayout } from '../../actions/layout';
import { removeBuildName } from '../../actions/buildname';

const BuildLayout = ({ setLayout, buildnames, removeBuildName }) => {
  //STATE
  const [layouts, setlayouts] = useState([]);

  useEffect(() => {
    checkForLayouts();
  }, [layouts]);

  // METHOD
  const getLayouts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/products/layout'
      );
      setlayouts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkForLayouts = () => {
    if (layouts.length === 0) {
      getLayouts();
    }
  };

  const handleChoice = (choice) => {
    
    setLayout(choice.name, choice.price);
    
  }

  const goBack = () => {
    const buildname = buildnames;
    console.log(buildname[0].id);
    removeBuildName(buildname[0].id);
  };

  return (
    <Fragment>
      <div>
        <h2>Layouts</h2>
      </div>

      <div className={`cards-container`}>
        {layouts.map((layout, index) => (
          <div key={index} onClick = {() => {handleChoice(layout)}}>
            <div className='layout-title'>
              <h4>{layout.name}</h4>
            </div>
            <div className='layout-body'>
              <p>{layout.shortdesc}</p>
            </div>

            <div className='layout-hidden' id={`hidding-${index}`}>
              <h6>More Information:</h6>
              <p>{layout.longdesc}</p>
            </div>

            <div className='layout-price'>
              <h5>$ {layout.price}</h5>
            </div>
          </div>
        ))}
      </div>
      <div className='total-price'>
        <h3>Build Cost</h3>
        {/* <h3>$ {props.totalPrice} </h3> */}
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

BuildLayout.propTypes = {
  setLayout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buildnames: state.buildname,
});

export default connect(mapStateToProps, { setLayout, removeBuildName })(
  BuildLayout
);
