import React from "react";
import useAxiosInstance from "../../contexts/useAxiosInstance";
import AuthContext from "../../contexts/authContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const AproveRider = () => {
  const axiosInstance = useAxiosInstance();
  // const {user} = useContext(AuthContext);
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riders", "status-pending"],
    queryFn: async () => {
      const res = await axiosInstance.get("/riders");
      return res.data;
    },
  });

  console.log(riders);

  const updateRiderStatus = async (rider, status) => {
    const patchInfo = {
      status: status,
      email: rider.email,
      workStatus: "available",
    };
    Swal.fire({
      title: "Approve rider request",
      text: "this user will be marked as a rider",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosInstance.patch("/riders", patchInfo);
        refetch();
        console.log(res.data);
      }
    });
  };

  const handleApprove = (rider) => {
    console.log("Approve rider:", rider._id);
    updateRiderStatus(rider, "approved");
  };

  const handleReject = (rider) => {
    console.log("Reject rider:", rider._id);
    updateRiderStatus(rider, "declined");
  };

  const handleDelete = (riderId) => {
    console.log("Delete rider:", riderId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="w-[90dvw] mx-auto">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold tertiary-text mb-8">
          Rider Approval Page
        </h1>

        {/* Table */}
        <div className="overflow-x-auto bg-gray-50 rounded-2xl shadow-sm">
          <table className="w-full min-w-[1000px]">
            {/* Table Header */}
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Index
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Rider Name
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Email
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  District
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {riders && riders.length > 0 ? (
                riders.map((rider, index) => (
                  <tr
                    key={rider._id}
                    className={`border-b border-gray-200 hover:bg-gray-100 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {/* Index */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-800 font-medium">
                        {index + 1}
                      </div>
                    </td>

                    {/* Rider Name */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-800 font-medium max-w-[150px] truncate">
                        {rider.name || "N/A"}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-800 max-w-[200px] truncate">
                        {rider.email || "N/A"}
                      </div>
                    </td>

                    {/* District */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-800 whitespace-nowrap">
                        {rider.district || "N/A"}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          rider.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : rider.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : rider.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {rider.status || "N/A"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {/* Approve Button */}
                        <button
                          onClick={() => handleApprove(rider)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          title="Approve"
                        >
                          <FiCheck className="text-lg" />
                        </button>

                        {/* Reject Button */}
                        <button
                          onClick={() => handleReject(rider)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                          title="Reject"
                        >
                          <FiX className="text-lg" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(rider._id)}
                          className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No riders found
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

export default AproveRider;
