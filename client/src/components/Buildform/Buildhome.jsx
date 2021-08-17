import React, { useEffect } from 'react';
import BuildName from './BuildName';

// redux imports
import { connect } from 'react-redux';
import BuildLayout from './BuildLayout';

const Buildhome = ({ user, buildnames, buildlayouts }) => {
  useEffect(() => {}, [buildnames]);

  return (
    <div>
      {buildnames.length === 0 && <BuildName />}
      {buildnames.length > 0 && buildlayouts.length < 1 && <BuildLayout />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  buildnames: state.buildname,
  buildlayouts: state.buildlayout,
});

export default connect(mapStateToProps)(Buildhome);
