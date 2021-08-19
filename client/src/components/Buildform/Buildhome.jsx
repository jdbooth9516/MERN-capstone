import React, { useEffect } from 'react';
import BuildName from './BuildName';
import ConfirmBuild from './ConfirmBuild'

// redux imports
import { connect } from 'react-redux';
import BuildLayout from './BuildLayout';
import BuildSwitch from './BuildSwitch';
import BuildService from './BuildService';
import BuildExtra from './BuildExtra';

const Buildhome = ({
  user,
  buildnames,
  buildlayouts,
  buildswitch,
  buildservice,
  buildextra,
  total
}) => {
  useEffect(() => {}, [buildnames]);

  return (
    <div>
      {buildnames.length === 0 && <BuildName />}
      {buildnames.length > 0 && buildlayouts.length < 1 && <BuildLayout />}
      {buildlayouts.length == 1 && buildswitch.length < 1 && <BuildSwitch />}
      {buildswitch.length == 1 && buildservice.length < 1 && <BuildService />}
      {buildservice.length == 1 && buildextra.length < 1 && <BuildExtra />}
      {buildextra.length == 1 && <ConfirmBuild user={user}/>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  buildnames: state.buildname,
  buildlayouts: state.buildlayout,
  buildswitch: state.buildswitch,
  buildservice: state.buildservice,
  buildextra: state.buildextra,
  total: state.total
});

export default connect(mapStateToProps)(Buildhome);
