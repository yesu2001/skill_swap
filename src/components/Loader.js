import React from "react";

const Loader = () => {
  return (
    <div className="h-screen bg-background flex justify-center items-center p-10">
      <div className="border-t-4 border-secondary rounded-full animate-spin w-12 h-12 p-10 m-10"></div>
    </div>
  );
};

export default Loader;
