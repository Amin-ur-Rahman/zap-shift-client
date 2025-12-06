import React from "react";
import { useForm, useWatch } from "react-hook-form";
import agentPending from "../assets/agent-pending.png";
import { useLoaderData } from "react-router-dom";
import useAxiosInstance from "../contexts/useAxiosInstance";
import Swal from "sweetalert2";

const BeARider = () => {
  const serviceCenters = useLoaderData();
  const regionsArray = serviceCenters.map((c) => c.region);
  const sortedArray = [...new Set(regionsArray)];
  const axiosInstance = useAxiosInstance();
  console.log(sortedArray);

  const { register, handleSubmit, control } = useForm();

  const riderRegion = useWatch({ control, name: "region" });

  const riderDistrictsByRegion = () => {
    const regionsArray = serviceCenters.filter(
      (center) => center.region === riderRegion
    );
    const districts = regionsArray.map((r) => r.district);
    return districts;
  };

  const onSubmit = async (data) => {
    console.log("Rider Application Data:", data);
    const response = await Swal.fire({
      title: "Proceed next?",
      text: `You are bout to place a request for this role`,

      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#caeb66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    });
    if (!response.isConfirmed) return;

    const res = await axiosInstance.post("/riders", data);
    console.log(res.data);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="w-[90dvw] mx-auto">
        {/* Header Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tertiary-text mb-4">
            Be a Rider
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Form Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Form */}
            <div>
              <h2 className="text-2xl font-bold tertiary-text mb-6">
                Tell us about yourself
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Your Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>

                {/* Driving License Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Driving License Number
                  </label>
                  <input
                    {...register("drivingLicense")}
                    type="text"
                    placeholder="Driving License Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>

                {/* Your Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>

                {/* Your Region */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Region
                  </label>
                  <select
                    {...register("region")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                  >
                    <option value="">Select your Region</option>
                    {sortedArray.map((r, i) => (
                      <option key={i}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Your District */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your District
                  </label>
                  <select
                    {...register("district")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                  >
                    {riderDistrictsByRegion().map((d, i) => (
                      <option key={i}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* NID No */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    NID No
                  </label>
                  <input
                    {...register("nid")}
                    type="text"
                    placeholder="NID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    type="text"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>

                {/* Bike Brand Model and Year */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bike Brand Model and Year
                  </label>
                  <input
                    {...register("bikeModel")}
                    type="text"
                    placeholder="Bike Brand Model and Year"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>

                {/* Bike Registration Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bike Registration Number
                  </label>
                  <input
                    {...register("bikeRegistration")}
                    type="text"
                    placeholder="Bike Registration Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>

                {/* Tell Us About Yourself */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tell Us About Yourself
                  </label>
                  <textarea
                    {...register("about")}
                    placeholder="Tell Us About Yourself"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full primary-bg text-gray-800 font-semibold py-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Right Side - Image Placeholder */}
            <div className="hidden lg:flex mt-20 justify-center ">
              <div className="w-full max-w-md h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
                <img src={agentPending} alt="agentPending" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeARider;
