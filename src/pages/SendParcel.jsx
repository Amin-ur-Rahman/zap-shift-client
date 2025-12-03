import React, { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosInstance from "../contexts/useAxiosInstance";
import AuthContext from "../contexts/authContext/AuthContext";

const SendParcel = () => {
  //   const [parcelType, setParcelType] = useState("document");
  const { register, handleSubmit, control, reset } = useForm();
  const { user } = useContext(AuthContext);
  // if (user) console.log(user);
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();

  const axiosInstance = useAxiosInstance();
  //   console.log(serviceCenters);
  const regionsDup = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDup)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  //   console.log(senderRegion);

  // console.log(regions);

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const isDocument = data.parcelType.toLowerCase() === "document";
    const isSameDistrict =
      data.senderDistrict.toLowerCase() === data.receiverDistrict.toLowerCase();
    const weight = parseFloat(data.parcelWeight);
    let price = 0;

    if (isDocument) {
      price = isSameDistrict ? 60 : 80;
    } else {
      if (weight <= 3) {
        price = isSameDistrict ? 110 : 150;
      } else {
        const basePrice = isSameDistrict ? 110 : 150;
        const extraweight = weight - 3;
        const extraChargeByWeight = extraweight * 40;
        price = isSameDistrict
          ? basePrice + extraChargeByWeight
          : basePrice + extraChargeByWeight + 40;
      }
    }
    console.log(price, "will be charged");

    Swal.fire({
      title: "Proceed next?",
      text: `you will be charged ${price} taka`,

      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#caeb66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then((result) => {
      console.log(result);

      if (result.isConfirmed) {
        Swal.fire({
          title: "Parcel created! willing to pay now?",
          text: `you will be charged ${price} taka`,

          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#caeb66",
          cancelButtonColor: "#d33",
          confirmButtonText: "Proceed",
        }).then((result) => {
          console.log("payment confirmation", result);
          if (result.isConfirmed) {
            axiosInstance
              .post("/parcels", {
                ...data,
                cost: price,
                paymentStatus: "unpaid",
              })
              .then((res) => {
                console.log(res.data);
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setTimeout(() => {
                  navigate("/dashboard/my-parcels");
                }, 2000);
              });
          }
        });
      }
    });
  };

  const districtsByRegions = (region) => {
    const regionsArray = serviceCenters.filter((c) => c.region === region);
    const districts = regionsArray.map((r) => r.district);
    return districts;
  };

  useEffect(() => {
    if (user) {
      reset({
        senderName: user.displayName,
        senderEmail: user.email,
      });
    }
  }, [user, reset]);

  //   const priceCalculator = (weight) => {

  //   }

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="w-[90dvw] mx-auto bg-gray-50 rounded-3xl p-8 md:p-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold tertiary-text mb-2">
          Send A Parcel
        </h1>
        <p className="text-gray-700 font-semibold mb-8">
          Enter your parcel details
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Parcel Type Radio Buttons */}
          <div className="flex items-center gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="document"
                {...register("parcelType")}
                // checked={parcelType === "document"}
                // onChange={(e) => setParcelType(e.target.value)}
                className="w-5 h-5 accent-green-500"
              />
              <span className="font-medium text-gray-700">Document</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType")}
                // checked={parcelType === "non-document"}
                // onChange={(e) => setParcelType(e.target.value)}
                className="w-5 h-5 accent-gray-400"
              />
              <span className="font-medium text-gray-700">Not-Document</span>
            </label>
          </div>

          {/* Parcel Name and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Parcel Name
              </label>
              <input
                {...register("parcelName")}
                type="text"
                placeholder="Parcel Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Parcel Weight (KG)
              </label>
              <input
                {...register("parcelWeight")}
                type="text"
                placeholder="Parcel Weight (KG)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          {/* Sender and Receiver Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sender Details */}
            <div className="space-y-5">
              <h3 className="font-bold text-gray-800 mb-4">Sender Details</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sender Name
                </label>
                <input
                  //   defaultValue={user?.displayName}
                  {...register("senderName")}
                  type="text"
                  placeholder="Sender Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sender Email
                </label>
                <input
                  //   defaultValue={user?.email}
                  {...register("senderEmail")}
                  type="email"
                  placeholder="Sender Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <input
                  {...register("senderAddress")}
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sender Phone No
                </label>
                <input
                  {...register("senderPhone")}
                  type="text"
                  placeholder="Sender Phone No"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              {/* sender region------------------- */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sender Region
                </label>
                <select
                  {...register("senderRegion")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                >
                  <option value="" disabled={true}>
                    Select your Region
                  </option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {/* sender districs-------------- */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sender District
                </label>
                <select
                  {...register("senderDistrict")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                >
                  <option value="" disabled={true}>
                    Select your District
                  </option>
                  {districtsByRegions(senderRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pickup Instruction
                </label>
                <textarea
                  {...register("pickupInstruction")}
                  placeholder="Pickup Instruction"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Receiver Details */}
            <div className="space-y-5">
              <h3 className="font-bold text-gray-800 mb-4">Receiver Details</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Receiver Name
                </label>
                <input
                  {...register("receiverName")}
                  type="text"
                  placeholder="Receiver Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Receiver Address
                </label>
                <input
                  {...register("receiverAddress")}
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Receiver Contact No
                </label>
                <input
                  {...register("receiverPhone")}
                  type="text"
                  placeholder="Receiver Contact No"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              {/* receivers region------------------- */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Receivers Region
                </label>
                <select
                  {...register("receiverRegion")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                >
                  <option value="" disabled={true}>
                    Select your Region
                  </option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {/* receivers districs-------------- */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Receiver District
                </label>
                <select
                  {...register("receiverDistrict")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                >
                  <option value="" disabled={true}>
                    Receivers District
                  </option>
                  {districtsByRegions(receiverRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Instruction
                </label>
                <textarea
                  {...register("deliveryInstruction")}
                  placeholder="Delivery Instruction"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Note */}
          <p className="text-sm text-gray-600">* PickUp Time 4pm-7pm Approx.</p>

          {/* Submit Button */}
          <button
            type="submit"
            className="primary-bg text-gray-800 font-semibold px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Proceed to Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
