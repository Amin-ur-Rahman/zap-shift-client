import React, { useContext, useRef, useState } from "react";
import useAxiosInstance from "../contexts/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../contexts/authContext/AuthContext";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useContext(AuthContext);
  const [selectedParcel, setSelectedParcel] = useState(null);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const {
    data: parcels,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["parcels", "pending"],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/parcels?email=${user.email}&deliveryStatus=pending`
      );
      return res.data;
    },
  });

  console.log(parcels);
  console.log("selectedParcel", selectedParcel);

  const district = selectedParcel?.receiverDistrict;
  const status = "available";

  const { data: riders, isLoading: ridersLoading } = useQuery({
    queryKey: ["riders", selectedParcel?._id],
    enabled: !!selectedParcel,

    queryFn: async () => {
      const res = await axiosInstance.get(
        `/riders?district=${district}&status=${status}`
      );
      return res.data;
    },
  });

  //   useEffect(() => {
  //     if (selectedParcel && modalRef.current) {
  //       modalRef.current.showModal();
  //     }
  //   }, [selectedParcel]);

  if (isLoading) return <div>Loading...</div>;
  if (!parcels || parcels.length === 0) return <div>No parcels found</div>;

  console.log("riders", riders);

  const handleAssignRider = async (rider) => {
    try {
      const assignInfo = {
        deliveryStatus: "on-transit",
        riderId: rider._id,
        riderName: rider.name,
        riderContact: rider.phone,
      };

      const res = await axiosInstance.patch(
        `/parcels/${selectedParcel._id}`,
        assignInfo
      );

      if (res.data.parcelUpdate.modifiedCount) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Rider has been assigned",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        modalRef.current.close();
        refetch();
      }
    } catch (err) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to assign rider",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      console.error(err);
    }
  };
  const handleOpenModal = async (parcel) => {
    setSelectedParcel(parcel);
    modalRef.current.showModal();
  };

  return (
    <div>
      <h1>Pending Parcels ({parcels.length})</h1>
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Parcel Name</th>
            <th className="border border-gray-300 p-2">Tracking ID</th>
            <th className="border border-gray-300 p-2">Delivery Status</th>
            <th className="border border-gray-300 p-2">Receiver District</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel.trackingId}>
              <td className="border border-gray-300 p-2">
                {parcel.parcelName}
              </td>
              <td className="border border-gray-300 p-2">
                {parcel.trackingId}
              </td>
              <td className="border border-gray-300 p-2">
                {parcel.deliveryStatus}
              </td>
              <td className="border border-gray-300 p-2">
                {parcel.receiverDistrict}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleOpenModal(parcel)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Find Rider
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog ref={modalRef} id="my_modal_2" className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg mb-4">Available Riders</h3>

          {ridersLoading ? (
            <p>Loading riders...</p>
          ) : riders?.length === 0 ? (
            <p>No riders available for this district</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">District</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {riders?.map((rider) => (
                  <tr key={rider._id}>
                    <td className="border p-2 text-center">
                      <img
                        src={rider.photoURL}
                        alt="rider"
                        className="w-12 h-12 rounded-full object-cover mx-auto"
                      />
                    </td>

                    <td className="border p-2">{rider.name}</td>
                    <td className="border p-2">{rider.phone || "N/A"}</td>
                    <td className="border p-2">{rider.district}</td>

                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AssignRiders;
