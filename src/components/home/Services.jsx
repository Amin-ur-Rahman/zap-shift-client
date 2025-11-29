import React from "react";
import service from "../../assets/service.png";

const Services = () => {
  return (
    <div className="tertiary-bg w-[90dvw] mx-auto p-20 rounded-2xl text-center my-10 flex flex-col justify-center items-center gap-10">
      <h1 className="text-4xl font-bold text-white text-center">
        Our Services
      </h1>
      <p className="text-white text-[0.9rem] max-w-lg">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div
        id="grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <div
          id="card"
          className="transition-all ease-in duration-300 rounded-xl max-w-md bg-white px-6 hover:bg-gradient-to-br hover:from-gray-300 hover:to-lime-300 py-10 flex flex-col gap-5 justify-center items-center"
        >
          <div className="bg-gradient-to-br from-gray-300 to-lime-300 w-max h-max rounded-full">
            <img
              src={service}
              alt="service"
              className="h-20 w-20 rounded-full"
            />
          </div>
          <h3 className="font-bold text-lg secondary-text text-center">
            Express & Standard Delivery
          </h3>
          <p className="text-black">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div
          id="card"
          className="transition-all ease-in duration-300 rounded-xl max-w-md bg-white px-6 hover:bg-gradient-to-br hover:from-gray-300 hover:to-lime-300 py-10 flex flex-col gap-5 justify-center items-center"
        >
          <div className="bg-white w-max h-max rounded-full">
            <img
              src={service}
              alt="service"
              className="h-20 w-20 rounded-full"
            />
          </div>
          <h3 className="font-bold text-lg secondary-text text-center">
            Nationwide Delivery
          </h3>
          <p className="text-black">
            We deliver parcels nationwide with home delivery in every district,
            ensuring your products reach customers within 48–72 hours.
          </p>
        </div>
        <div
          id="card"
          className="transition-all ease-in duration-300 rounded-xl max-w-md bg-white px-6 hover:bg-gradient-to-br hover:from-gray-300 hover:to-lime-300 py-10 flex flex-col gap-5 justify-center items-center"
        >
          <div className="bg-gradient-to-br from-gray-300 to-lime-300 w-max h-max rounded-full">
            <img
              src={service}
              alt="service"
              className="h-20 w-20 rounded-full"
            />
          </div>
          <h3 className="font-bold text-lg secondary-text text-center">
            Fulfillment Solution
          </h3>
          <p className="text-black">
            We also offer customized service with inventory management support,
            online order processing, packaging, and after sales support.
          </p>
        </div>
        <div
          id="card"
          className="transition-all ease-in duration-300 rounded-xl max-w-md bg-white px-6 hover:bg-gradient-to-br hover:from-gray-300 hover:to-lime-300 py-10 flex flex-col gap-5 justify-center items-center"
        >
          <div className="bg-gradient-to-br from-gray-300 to-lime-300 w-max h-max rounded-full">
            <img
              src={service}
              alt="service"
              className="h-20 w-20 rounded-full"
            />
          </div>
          <h3 className="font-bold text-lg secondary-text text-center">
            Cash on Home Delivery
          </h3>
          <p className="text-black">
            100% cash on delivery anywhere in Bangladesh with guaranteed safety
            of your product.
          </p>
        </div>
        <div
          id="card"
          className="transition-all ease-in duration-300 rounded-xl max-w-md bg-white px-6 hover:bg-gradient-to-br hover:from-gray-300 hover:to-lime-300 py-10 flex flex-col gap-5 justify-center items-center"
        >
          <div className="bg-gradient-to-br from-gray-300 to-lime-300 w-max h-max rounded-full">
            <img
              src={service}
              alt="service"
              className="h-20 w-20 rounded-full"
            />
          </div>
          <h3 className="font-bold text-lg secondary-text text-center">
            Corporate Service / Contract In Logistics
          </h3>
          <p className="text-black">
            Customized corporate services which includes warehouse and inventory
            management support.
          </p>
        </div>
        <div
          id="card"
          className="transition-all ease-in duration-300 rounded-xl max-w-md bg-white px-6 hover:bg-gradient-to-br hover:from-gray-300 hover:to-lime-300 py-10 flex flex-col gap-5 justify-center items-center"
        >
          <div className="bg-gradient-to-br from-gray-300 to-lime-300 w-max h-max rounded-full">
            <img
              src={service}
              alt="service"
              className="h-20 w-20 rounded-full"
            />
          </div>
          <h3 className="font-bold text-lg secondary-text text-center">
            Parcel Return
          </h3>
          <p className="text-black">
            Through our reverse logistics facility we allow end customers to
            return or exchange their products with online business merchants.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
