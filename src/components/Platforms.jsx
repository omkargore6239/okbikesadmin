import React from "react";
import { CiGlobe } from "react-icons/ci";
import { FaApple, FaTabletAlt } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";

const Platforms = () => {
  return (
    <div className="p-5 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Booking Platforms</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* Website Bookings */}
        <div className="space-y-2 text-gray-600 flex flex-col items-center bg-gray-100 p-4 rounded-lg">
          <CiGlobe className="text-4xl text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">124</h1>
          <p className="text-sm">Website</p>
        </div>

        {/* iOS Bookings */}
        <div className="space-y-2 text-gray-600 flex flex-col items-center bg-gray-100 p-4 rounded-lg">
          <FaApple className="text-4xl text-gray-800" />
          <h1 className="text-2xl font-bold text-gray-900">87</h1>
          <p className="text-sm">iOS</p>
        </div>

        {/* Android Bookings */}
        <div className="space-y-2 text-gray-600 flex flex-col items-center bg-gray-100 p-4 rounded-lg">
          <DiAndroid className="text-4xl text-green-500" />
          <h1 className="text-2xl font-bold text-gray-900">156</h1>
          <p className="text-sm">Android</p>
        </div>

        {/* Tablet Bookings */}
        <div className="space-y-2 text-gray-600 flex flex-col items-center bg-gray-100 p-4 rounded-lg">
          <FaTabletAlt className="text-4xl text-purple-500" />
          <h1 className="text-2xl font-bold text-gray-900">45</h1>
          <p className="text-sm">Tablets</p>
        </div>
      </div>
    </div>
  );
};

export default Platforms;
