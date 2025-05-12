import React from 'react';

const HeaderCard = ({ children, className = '' }) => {
  return (
    <div className={`header-card ${className}`}>
      {children}
    </div>
  );
};

export default HeaderCard;
