// LoadingSpinner.jsx
import React from 'react';
import { Rings } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Rings color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default LoadingSpinner;
