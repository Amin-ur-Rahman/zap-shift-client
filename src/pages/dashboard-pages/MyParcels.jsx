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
      const response = await axiosInstance.get("/parcels");
      return response.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosInstance.delete(`/parcels/${id}`);
        console.log(res.data);

        if (res.data.acknowledged) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        } else {
          console.log(res.data.message);
        }
      }
    });
  };

  console.log(parcels);

  return (
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((p, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>{p.parcelName}</td>
                <td>{p.parcelType}</td>
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
