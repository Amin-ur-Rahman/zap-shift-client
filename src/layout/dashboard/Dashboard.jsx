import React, { useState } from "react";
import { FiHome, FiSettings } from "react-icons/fi";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Link, Outlet } from "react-router-dom";
// import useAxiosInstance from "../../contexts/useAxiosInstance";
// import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../contexts/authContext/AuthContext";
import { FaDropbox } from "react-icons/fa";
import { BiKey } from "react-icons/bi";

const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);
  // const { user } = useContext(AuthContext);

  const handleSideClick = () => {
    setExpanded((prev) => !prev);
  };

  // const axiosInstance = useAxiosInstance();

  //   const {
  //     data: parcels = [],
  //     refetch,
  //     isLoading,
  //   } = useQuery({
  //     queryKey: ["my-parcels", user.email],
  //     queryFn: async () => {
  //       const response = await axiosInstance.get("/parcels");
  //       return response.data;
  //     },
  //   });
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar   mx-auto   border-t-2 bg-base-300 border-b-2 border-gray-300   mb-10 ">
          <label
            onClick={handleSideClick}
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}

            {expanded ? (
              <GoSidebarExpand size={24}></GoSidebarExpand>
            ) : (
              <GoSidebarCollapse size={24}></GoSidebarCollapse>
            )}
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <section className="p-10 rounded-2xl bg-white min-h-screen w-[90dvw] mx-auto">
          <Outlet></Outlet>
        </section>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex pt-3 min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full space-y-3 grow">
            {/* List item */}
            <Link
              to="/"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:cursor-pointer hover:bg-base-100"
              data-tip="Homepage"
            >
              {/* Home icon */}
              <FiHome size={22}></FiHome>
              <span className="is-drawer-close:hidden">Homepage</span>
            </Link>
            <Link
              to="/dashboard/my-parcels"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:cursor-pointer hover:bg-base-100"
              data-tip="My parcels"
            >
              {/* Home icon */}
              <FaDropbox size={22}></FaDropbox>
              <span className="is-drawer-close:hidden">My Parcels</span>
            </Link>
            <Link
              to="/dashboard/approve-rider"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:cursor-pointer hover:bg-base-100"
              data-tip="Rider Approval page"
            >
              {/* Home icon */}
              <BiKey size={22}></BiKey>
              <span className="is-drawer-close:hidden">
                Rider Approval page
              </span>
            </Link>

            {/* List item */}
            <Link>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <FiSettings size={22}></FiSettings>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
