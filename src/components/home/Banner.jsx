import React from "react";
import deliverymanBig from "../../assets/big-deliveryman.png";
import deliverymanTiny from "../../assets/tiny-deliveryman.png";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const Banner = () => {
  return (
    <div
      className="w-[90dvw] bg-white rounded-2xl mx-auto mb-10 
      p-6 md:p-12 lg:p-20 
      flex flex-col md:flex-row items-center justify-between gap-10"
    >
      {/* LEFT */}
      <div
        id="left"
        className="flex-1 flex flex-col gap-5 text-center md:text-left"
      >
        <img
          src={deliverymanTiny}
          alt="deliverymanTiny"
          className="w-32 md:w-40 lg:w-52 mx-auto md:mx-0"
        />

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
          We Make Sure Your <br />
          <span className="text-cyan-400">Parcel Arrives</span> On Time <br />{" "}
          No Fuss.
        </h1>

        <p className="py-3 md:py-5 text-sm md:text-base">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            to="/"
            className="btn w-max primary-bg hover:bg-lime-500 border-0 text-gray-900 
            font-semibold px-6 py-2.5 rounded-full 
            flex items-center space-x-2 mx-auto sm:mx-0"
          >
            <span>Track Your Parcel</span>
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <FiArrowUpRight className="text-white" />
            </div>
          </Link>

          <Link className="py-2 px-4 rounded-2xl border border-gray-400 text-center mx-auto sm:mx-0">
            Be a Rider
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div id="right" className="flex-1 flex justify-center md:justify-end">
        <img
          src={deliverymanBig}
          alt="deliverymanBig"
          className="w-64 md:w-80 lg:w-full max-w-[450px]"
        />
      </div>
    </div>
  );
};

export default Banner;
