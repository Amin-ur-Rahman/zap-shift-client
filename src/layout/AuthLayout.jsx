import React from "react";
import authImage from "../assets/authImage.png";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-5 left-10">
        <Logo></Logo>
      </div>
      <div className="flex justify-between items-center bg-lime-50">
        <section className="flex-1">
          <Outlet></Outlet>
        </section>
        <div className="flex-1  hidden    md:flex items-center justify-center">
          <img src={authImage} alt="authImage" className="object-cover " />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
