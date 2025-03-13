import React from "react";
import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = ({smallHeight}) => {
  return (
    <div>
      <div
        className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
      >
        <ScaleLoader size={100} color="lime" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
