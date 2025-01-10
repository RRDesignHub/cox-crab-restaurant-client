import React from "react";
import { RevolvingDot } from "react-loader-spinner";

export const LoadingSpin = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <RevolvingDot
        visible={true}
        height="80"
        width="80"
        color="#001735"
        ariaLabel="revolving-dot-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
