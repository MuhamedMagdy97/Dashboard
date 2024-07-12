import React from "react";
import { ThreeDots } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <ThreeDots color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default LoadingSpinner;
