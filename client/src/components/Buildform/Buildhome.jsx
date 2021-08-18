import React, { useEffect } from 'react';
import BuildName from './BuildName';

// redux imports
import { connect } from 'react-redux';
import BuildLayout from './BuildLayout';
import BuildSwitch from './BuildSwitch';
import BuildService from './BuildService';

const Buildhome = ({
  user,
  buildnames,
  buildlayouts,
  buildswitch,
  buildservice,
}) => {
  useEffect(() => {}, [buildnames]);

  return (
    <div>
      {buildnames.length === 0 && <BuildName />}
      {buildnames.length > 0 && buildlayouts.length < 1 && <BuildLayout />}
      {buildlayouts.length == 1 && buildswitch.length < 1 && <BuildSwitch />}
      {buildswitch.length == 1 && buildservice.length < 1 && <BuildService />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  buildnames: state.buildname,
  buildlayouts: state.buildlayout,
  buildswitch: state.buildswitch,
  buildservice: state.buildservice,
});

export default connect(mapStateToProps)(Buildhome);
