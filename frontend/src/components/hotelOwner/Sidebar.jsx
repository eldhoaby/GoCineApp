import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartBar, FaPlus, FaList } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <FaChartBar />, path: "/admin/dashboard" },
    { name: "Add Movie", icon: <FaPlus />, path: "/admin/add-room" }, // text updated
    { name: "List Movies", icon: <FaList />, path: "/admin/list-rooms" }, // text updated
  ];

  return (
    <div className="bg-white shadow-md h-screen p-4 w-64 fixed left-0 top-0">
      <div className="text-2xl font-bold mb-8 text-indigo-600">GoCine</div>

      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 
                ${
                  location.pathname === item.path
                    ? "bg-indigo-100 text-indigo-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
