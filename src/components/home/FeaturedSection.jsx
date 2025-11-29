import React from "react";
import trackingImg from "../../assets/live-tracking.png";
import safeDeliveryImg from "../../assets/safe-delivery.png";

const FeaturedSection = () => {
  return (
    <div className="w-[90dvw] mx-auto my-20 flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="w-48 h-48  bg-lime-100 p-3 rounded-lg flex items-center justify-center">
            <img
              src={trackingImg}
              alt="Live Parcel Tracking"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="border-l-2 border-dashed border-gray-300 h-32 hidden md:block"></div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Live Parcel Tracking
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment's journey and get
            instant status updates for complete peace of mind.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="w-48 h-48 bg-lime-100 p-3 rounded-lg flex items-center justify-center">
            <img
              src={safeDeliveryImg}
              alt="100% Safe Delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="border-l-2 border-dashed border-gray-300 h-32 hidden md:block"></div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            100% Safe Delivery
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We ensure your parcels are handled with the utmost care and
            delivered securely to their destination. Our reliable process
            guarantees safe and damage-free delivery every time.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="w-48 h-48  bg-lime-100 p-3 rounded-lg  flex items-center justify-center">
            <img
              src={safeDeliveryImg}
              alt="24/7 Call Center Support"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="border-l-2 border-dashed border-gray-300 h-32 hidden md:block"></div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            24/7 Call Center Support
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our dedicated support team is available around the clock to assist
            you with any questions, updates, or delivery concerns—anytime you
            need us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
