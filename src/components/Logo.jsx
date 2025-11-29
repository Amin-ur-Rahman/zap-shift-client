import React from "react";

import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={logo} alt="logo" />
      <h1 className="text-2xl font-extrabold mt-4 -ml-2">ZapShift</h1>
    </div>
  );
};

export default Logo;
