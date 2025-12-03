import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom"; // remove if using Next.js

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md w-full">
        <AiFillCloseCircle size={60} className="text-red-500 mx-auto mb-4" />

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again anytime.
        </p>

        <Link
          to="/dashboard"
          className="inline-block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;
