import React from "react";
import { Link } from "react-router-dom";
// import { Lock } from "react-icons/fa"; // or any icon you prefer

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md">
        <div className="text-5xl text-red-500 mb-4">
          <i className="fas fa-lock"></i>
        </div>

        <h1 className="text-2xl font-semibold mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
