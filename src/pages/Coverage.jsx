import React, { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router-dom";

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.location.value;

    const location = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (location) {
      const query = [location.latitude, location.longitude];
      console.log("query", query);
      mapRef.current.flyTo(query, 12);
    }
  };
  console.log(serviceCenters);

  const position = [23.685, 90.3563];
  return (
    <div
      className="w-[90dvw] bg-white rounded-2xl mx-auto mb-10 
      p-6 md:p-12 lg:p-20 flex flex-col  gap-10"
    >
      <h1 className="text-3xl text-center font-bold secondary-text">
        We are available in 64 districts
      </h1>
      <form
        onSubmit={handleSearch}
        className="flex items-center w-xl relative gap-4 bg-gray-200 rounded-full  shadow-sm max-w-4xl mx-auto"
      >
        <FiSearch className="text-2xl ml-2 text-gray-600 flex-shrink-0" />

        <input
          name="location"
          type="text"
          placeholder="Search here"
          className="flex-1 bg-transparent outline-none px-6 py-4 text-gray-700 placeholder-gray-400 text-base"
        />

        <button
          type="submit"
          className="primary-bg absolute right-0 text-gray-800 font-semibold px-10 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 flex-shrink-0"
        >
          Search
        </button>
      </form>

      {/* ------------map container----------------- */}

      <div className="min-h-[60dvh] max-h-screen w-3/4 mx-auto rounded-2xl border ">
        <MapContainer
          className="h-[80dvh] rounded-2xl"
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>
                  {center.region} {center.district}
                </strong>
                <p>Service Area:{center.covered_area.join(",")}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
