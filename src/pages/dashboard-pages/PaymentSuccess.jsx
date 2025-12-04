import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"; // remove if you're using Next.js
import { FiCheckCircle } from "react-icons/fi";
import useAxiosInstance from "../../contexts/useAxiosInstance";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const session_id = params.get("session_id");
  const axiosInstance = useAxiosInstance();
  console.log(session_id);

  useEffect(() => {
    if (session_id) {
      axiosInstance
        .patch(`/on-payment-success?session_id=${session_id}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [axiosInstance, session_id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md w-full">
        <FiCheckCircle size={60} className="text-green-500 mx-auto mb 4" />

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. Thank you for using our
          service.
        </p>

        <div className="my-5">
          <p className="font-semibold">
            Your transaction ID:
            <small> {paymentInfo.transactionId}</small>
          </p>
          <p className="font-semibold">
            Your tracking ID:
            <small>{paymentInfo.trackingId}</small>
          </p>
        </div>

        <Link
          to="/dashboard"
          className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
