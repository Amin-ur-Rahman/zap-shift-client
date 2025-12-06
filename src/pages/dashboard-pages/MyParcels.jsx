import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import AuthContext from "../../contexts/authContext/AuthContext";
import useAxiosInstance from "../../contexts/useAxiosInstance";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const response = await axiosInstance.get(`/parcels?email=${user.email}`);
      return response.data;
    },
  });

  const handlePayment = async (p) => {
    const paymentInfo = {
      cost: p.cost,
      senderEmail: p.senderEmail,
      _id: p._id,
      parcelName: p.parcelName,
    };
    const res = await axiosInstance.post(
      "/create-checkout-session",
      paymentInfo
    );
    console.log(res.data);
    window.location.assign(res.data.url);
  };

  const handleDelete = async (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosInstance.delete(`/parcels/${id}`);
          console.log(res.data);

          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          } else {
            throw new Error("404 error! request failed");
          }
        }
      })
      .catch((error) => console.log(error));
  };

  console.log(parcels);

  if (isLoading) return <div>loading...</div>;

  return parcels.length <= 0 ? (
    <div>no parcels on process!</div>
  ) : (
    <div>
      <h1>my parcels here:</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>parcel type</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((p, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{p.parcelName}</td>
                <td>{p.parcelType}</td>
                <td>
                  {p.paymentStatus === "paid" ? (
                    <button className="disabled text-green-400 font-semibold text-lg">
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePayment(p)}
                      className="primary-bg font-semibold px-3 py-1 rounded-xl"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td className="flex   gap-3 items-center justify-start">
                  <button
                    title="view details"
                    className="hover:cursor-pointer hover:scale-110"
                  >
                    <FiEye size={18}></FiEye>
                  </button>
                  <button
                    title="Edit order info"
                    className="hover:cursor-pointer hover:scale-110"
                  >
                    <FiEdit size={18}></FiEdit>
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(p._id);
                    }}
                    title="delete item"
                    className="hover:cursor-pointer hover:scale-110"
                  >
                    <FiTrash size={18}></FiTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
