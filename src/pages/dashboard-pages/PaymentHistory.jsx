import React, { useContext } from "react";
import useAxiosInstance from "../../contexts/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../contexts/authContext/AuthContext";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);

  const axiosInstance = useAxiosInstance();
  const {
    data: payments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">
          Error loading payment history
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="w-[90dvw] mx-auto">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold tertiary-text mb-8">
          Payment History
        </h1>

        {/* Table */}
        <div className=" w-3/4 mx-auto  bg-gray-50 rounded-2xl shadow-sm">
          <table className="mx-auto  w-full">
            {/* Table Header */}
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Parcel Info
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Recipient Info
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Tracking Number
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Payment Info
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {payments && payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className={`border-b border-gray-200 hover:bg-gray-100 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {/* Parcel Info */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-800 font-medium whitespace-nowrap">
                        {payment.parcelName || "N/A"}
                      </div>
                    </td>

                    {/* Recipient Info */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-800 max-w-[200px]">
                        <div className="font-medium truncate">
                          {payment.receiverName || "N/A"}
                        </div>
                        <div className="text-gray-600 text-xs mt-1 truncate">
                          {payment.receiverPhone || "N/A"}
                        </div>
                      </div>
                    </td>

                    {/* Tracking Number */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-800 font-medium whitespace-nowrap">
                        {payment.trackingId || "N/A"}
                      </div>
                    </td>

                    {/* Payment Info */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-800 whitespace-nowrap">
                        ৳ {payment.price || "0"} ({payment.status || "Pending"})
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4">
                      <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors whitespace-nowrap">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No payment history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
