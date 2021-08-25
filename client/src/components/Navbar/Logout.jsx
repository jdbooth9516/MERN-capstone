import React from 'react';

const Logout = () => {
  const cookie = 'jwt=none; path=/;';
  document.cookie = cookie;

  window.location.href = '/';

  return <div></div>;
};

export default Logout;
