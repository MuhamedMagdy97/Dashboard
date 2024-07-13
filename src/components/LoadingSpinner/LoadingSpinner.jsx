import React from "react";
import { InfinitySpin} from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <>
    <div className="text-center loading-spinner">   <InfinitySpin
  visible={true}
  width="200"
  color="#350a99"
  ariaLabel="infinity-spin-loading"
  /></div>
    </>
  );
};

export default LoadingSpinner;
