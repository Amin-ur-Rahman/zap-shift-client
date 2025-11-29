import React from "react";

import locationMechant from "../../assets/location-merchant.png";
import beMerchant from "../../assets/be-a-merchant-bg.png";

const MerchantCTA = () => {
  return (
    <div className="tertiary-bg w-[90dvw] mx-auto rounded-3xl my-20 p-10 md:p-16 lg:p-20 relative overflow-hidden">
      <div className="max-w-2xl relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Merchant and Customer Satisfaction is Our First Priority
        </h2>

        <p className="text-white text-base md:text-lg mb-8 leading-relaxed opacity-90">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-gradient-to-br from-gray-300 to-lime-300 text-gray-800 font-semibold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105">
            Become a Merchant
          </button>

          <button className="border-2 border-lime-300 text-white font-semibold px-8 py-4 rounded-full hover:bg-lime-300 hover:text-gray-800 transition-all duration-300 hover:scale-105">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>
      <img src={beMerchant} alt="beMerchant" className="absolute top-0" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full hidden lg:flex items-center justify-center  ">
        <div className="text-white text-sm">
          <img src={locationMechant} alt="location-merchant" />
        </div>
      </div>
    </div>
  );
};

export default MerchantCTA;
