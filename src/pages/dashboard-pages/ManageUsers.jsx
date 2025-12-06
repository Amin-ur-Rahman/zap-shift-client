import React from "react";
import useAxiosInstance from "../../contexts/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { FiArrowUp, FiArrowDown, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosInstance = useAxiosInstance();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });

  const handleAdmin = async (user, role) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    });
    if (confirm.isConfirmed) {
      try {
        const res = await axiosInstance.patch(`/users/${user._id}`, {
          role,
        });
        refetch();
        console.log(res.data);

        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Operation successful!",
            text: "user role has been changed.",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while updating the role.",
          icon: "error",
        });
        console.error("Role update failed:", error);
      }
    }
  };

  const handlePromoteToAdmin = async (user) => {
    console.log("Promote to admin:", user._id);
    await handleAdmin(user, "admin");

    // Add your promote logic here
  };

  const handleDemoteToMember = async (user) => {
    console.log("Demote to member:", user._id);
    await handleAdmin(user, "user");

    // Add your demote logic here
  };

  const handleDelete = (userId) => {
    console.log("Delete user:", userId);
    // Add your delete logic here
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
          Manage Users
        </h1>
        <p className="text-gray-600 mb-6">
          All types of users (General, Rider, Admin)
        </p>

        {/* Table */}
        <div className="overflow-x-auto bg-gray-50 rounded-2xl shadow-sm">
          <table className="w-full min-w-[800px]">
            {/* Table Header */}
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Image
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Email
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
              {users && users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`border-b border-gray-200 hover:bg-gray-100 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td>
                      <div className=" rounded-lg">
                        <img
                          src={user.photoUrl}
                          className="w-20 h-20 p-3 rounded-full"
                          alt=""
                        />
                      </div>
                    </td>
                    {/* Name */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-800 font-medium max-w-[200px] truncate">
                        {user.userName || "N/A"}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-800 max-w-[250px] truncate">
                        {user.userEmail || "N/A"}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "rider"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role || "member"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {/* Promote to Admin Button */}
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handlePromoteToAdmin(user)}
                            className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                            title="Promote to Admin"
                          >
                            <FiArrowUp />
                            Admin
                          </button>
                        )}

                        {/* Demote to Member Button */}
                        {user.role === "admin" && (
                          <button
                            onClick={() => handleDemoteToMember(user)}
                            className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                            title="Demote to Member"
                          >
                            <FiArrowDown />
                            Demote
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
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
                    colSpan="4"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No users found
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

export default ManageUsers;
