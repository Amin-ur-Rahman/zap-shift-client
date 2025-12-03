import React from "react";
import { Link } from "react-router-dom"; // remove if you're using Next.js
import { FiCheckCircle } from "react-icons/fi";

const PaymentSuccess = () => {
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
