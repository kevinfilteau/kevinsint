import React from 'react';
import Background from '../shared/Background';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Background />
      <div className="wrapper">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
