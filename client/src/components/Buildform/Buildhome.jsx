import React, { useEffect } from 'react';
import BuildName from './BuildName';

// redux imports
import { connect } from 'react-redux';

const Buildhome = ({ user, buildnames }) => {
  useEffect(() => {}, [buildnames]);

  return <div>{buildnames.length === 0 && <BuildName />}</div>;
};

const mapStateToProps = (state) => ({
  buildnames: state.buildname,
});

export default connect(mapStateToProps)(Buildhome);
