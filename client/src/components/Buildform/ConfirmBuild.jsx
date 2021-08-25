import React from 'react';
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
  axios.defaults.headers.common['x-auth-token'] = user;
  const addBuildToDatabase = async () => {
    console.log(user);
    const payload = {
      buildname: buildnames[0].msg,
      products: [
        buildlayouts[0].msg,
        buildswitch[0].msg,
        buildservice[0].msg,
        buildextra[0].msg,
      ],
      totalprice: total,
    };
    console.log(payload);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/build',
        payload,
        { headers: { 'x-auth-token': user } }
      );
      console.log(response.data);
      alert(`Build ${buildnames[0].msg} has been created`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const goBack = () => {
    removeFromTotal(total, buildextra[0].price);
    removeBuildExtra(buildextra[0].id);
  };

  return (
    <div className="confirmbuild-cont">
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

      <button
        onClick={() => {
          addBuildToDatabase();
        }}>
        Confirm
      </button>
      <button
        onClick={() => {
          goBack();
        }}>
        Go Back
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
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
