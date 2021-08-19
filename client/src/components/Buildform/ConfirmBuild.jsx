import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

// redux import
import { connect } from 'react-redux';
import { removeBuildExtra } from '../../actions/extra';
import { removeFromTotal } from '../../actions/total';

const ConfirmBuild = ({
  user,
  buildnames,
  buildlayouts,
  buildswitch,
  buildservice,
  buildextra,
  removeBuildExtra,
  removeFromTotal,
  total,
}) => {
  console.log(user);

  const goBack = () => {
    removeFromTotal(total, buildextra[0].price);
    removeBuildExtra(buildextra[0].id);
  };

  return (
    <div className='confirmbuild-cont'>
      <div>
        <h2>Confirm Build</h2>
      </div>
      <div>
        <h5> Build Name</h5>
        <h3>{buildnames[0].msg}</h3>
      </div>
      <div>
        <h4> Layout Selection</h4>
        <h5> {buildlayouts[0].msg}</h5>
        <h5>$ {buildlayouts[0].price}</h5>
      </div>

      <div>
        <h4> Switch Selection</h4>
        <h5> {buildswitch[0].msg}</h5>
        <h5>$ {buildswitch[0].price}</h5>
      </div>

      <div>
        <h4> Service Selection</h4>
        <h5> {buildservice[0].msg}</h5>
        <h5>$ {buildservice[0].price}</h5>
      </div>

      <div>
        <h4> Extra Selection</h4>
        <h5> {buildextra[0].msg}</h5>
        <h5>$ {buildextra[0].price}</h5>
      </div>

      <div>
        <h4>Total Price</h4>
        <h3>$ {total} </h3>
      </div>

      <button>Confirm</button>
      <button
        onClick={() => {
          goBack();
        }}>
        Go Back
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  buildnames: state.buildname,
  buildlayouts: state.buildlayout,
  buildswitch: state.buildswitch,
  buildservice: state.buildservice,
  buildextra: state.buildextra,
  total: state.total,
});

export default connect(mapStateToProps, { removeBuildExtra, removeFromTotal })(
  ConfirmBuild
);
