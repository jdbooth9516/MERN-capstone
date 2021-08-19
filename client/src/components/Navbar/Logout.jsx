import React, { useEffect } from 'react';

const Logout = ({ history, getUser }) => {
  const cookie = 'jwt=none; path=/;';
  document.cookie = cookie;

  window.location.href = '/';

  return <div></div>;
};

export default Logout;
