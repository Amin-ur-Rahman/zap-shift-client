import React from "react";
import booking from "../../assets/bookingIcon.png";

const HowItWorks = () => {
  return (
    <div className="w-[90dvw] mx-auto py-10 flex flex-wrap gap-10 justify-center ">
      <div
        id="card"
        className="p-4 rounded-2xl border-2 max-w-72 border-gray-300 bg-white"
      >
        <img src={booking} alt="bookingIcon" />
        <h3 className="secondary-text font-bold ">Booking Pick & Drop</h3>
        <p className="base-text text-[0.9rem]">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
      <div
        id="card"
        className="p-4 rounded-2xl border-2 max-w-72 border-gray-300 bg-white"
      >
        <img src={booking} alt="bookingIcon" />
        <h3 className="secondary-text font-bold ">Booking Pick & Drop</h3>
        <p className="base-text text-[0.9rem]">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
      <div
        id="card"
        className="p-4 rounded-2xl border-2 max-w-72 border-gray-300 bg-white"
      >
        <img src={booking} alt="bookingIcon" />
        <h3 className="secondary-text font-bold ">Booking Pick & Drop</h3>
        <p className="base-text text-[0.9rem]">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
      <div
        id="card"
        className="p-4 rounded-2xl border-2 max-w-72 border-gray-300 bg-white"
      >
        <img src={booking} alt="bookingIcon" />
        <h3 className="secondary-text font-bold ">Booking Pick & Drop</h3>
        <p className="base-text text-[0.9rem]">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
