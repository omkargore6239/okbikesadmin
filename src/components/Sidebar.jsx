import React, { useState } from "react";
import { IoLayersOutline, IoPricetagsOutline } from "react-icons/io5";
import { LuBox, LuUsers2 } from "react-icons/lu";
import { RiMotorbikeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Dropdown from "./PriceDropdown";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { TbBrandBooking, TbReportSearch } from "react-icons/tb";


const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const SIDEBAR_LINKS = [
    { id: 1, path: "/", name: "Dashboard", icon: LuBox },
    { id: 2, path: "/storeMaster", name: "Store Master", icon: MdOutlineLocalGroceryStore },
    { id: 3, path: "/allBikes", name: "All Bikes", icon: RiMotorbikeLine },
    { id: 4, name: "Price Master", icon: IoLayersOutline,
      submenu: [
        { id: 31, path: "/priceMaster/deliveryAtLocationPrices", name: "Delivery At Location Prices" },
        { id: 32, path: "/priceMaster/PickUpTariffPlan", name: "Pick Up Tariff Plan" },
      ],
    },
    { id: 5, name: "Master Records", icon: IoLayersOutline,
        submenu:[
            { id: 51, path: "/masterRecords/allCategories", name:"All Categories"},
            { id: 52, path: "/masterRecords/allBrands", name:"All Brands"},
            { id: 53, path: "/masterRecords/allModels", name:"All Models"},
        ]
     },
    { id: 6, path: "/allOffers", name: "All Offers", icon: IoPricetagsOutline },
    { id: 7, path: "/allBookings", name: "All Bookings", icon: TbBrandBooking },
    { id: 8, path: "/allUsers", name: "All Users", icon: LuUsers2 },
    { id: 9, path: "/allRegisterCustomers", name: "All Register Customers", icon: LuUsers2},
    { id:10, name: "All Report" ,icon: TbReportSearch, 
      submenu:[
        {id: 54, path: "/allReport/bookingReport", name: "Booking Report"},
        {id: 55, path: "/allReport/salesReport" , name:"Sales Report"},
        {id: 56, path: "/allReport/gstReport", name:"GST Report"}
      ] 
    }
  ]

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white">
      <div>
        <img src="./Logo Bike.png" alt="logo" className="w-20 hidden md:flex" />
        <img src="./bike-svgrepo-com.svg" alt="logo" className="w-28 flex md:hidden" />
      </div>

      <ul className="mt-6 space-y-6">
        {SIDEBAR_LINKS.map((link, index) =>
          !link.submenu ? (
            <li key={index} className="font-medium rounded-md">
              <Link
                to={link.path}
                className={`flex justify-center md:justify-start items-center md:space-x-5 py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${
                  activeLink === index ? "bg-indigo-100 text-indigo-500" : ""
                }`}
                onClick={() => handleLinkClick(index)}
              >
                <span>{link.icon && link.icon()}</span>
                <span className="text-sm text-gray-500 hidden md:flex">{link.name}</span>
              </Link>
            </li>
          ) : (
            <li key={index} className="font-medium rounded-md">
              <Dropdown
                name={link.name}
                icon={link.icon}
                submenu={link.submenu}
                activeLink={activeLink}
                setActiveLink={handleLinkClick}
              />
            </li>
          )
        )}
      </ul>

      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
        <p className="flex items-center space-x-2 text-xs text-white py-2 px-4 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full">
          <span>?</span> <span className="hidden md:flex">Need Help</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;