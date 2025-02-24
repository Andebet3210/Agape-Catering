import React from 'react';
import { FaPlus, FaBoxOpen, FaListUl } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const ManagerSidebar = () => {
  return (
    <div className="flex">
      <div className="p-4 font-bold w-64 min-h-screen bg-gray-100 border-r-2 border-gray-300">
        <div className="border-b-2 border-gray-300 mb-4 pb-2">Dashboard</div>
        <div className="space-y-4">
          {/* Add Items Link */}
          <NavLink
            to="/manager/add"
            className={({ isActive }) =>
              `flex items-center space-x-3 border rounded-lg p-2 transition duration-300 ${
                isActive ? 'bg-gray-400' : 'text-gray-700'
              } hover:bg-gray-200`
            }
          >
            <FaPlus className="w-4 h-4 text-green-600" />
            <span>Add Items</span>
          </NavLink>

          {/* List Items Link */}
          <NavLink
            to="/manager/list"
            className={({ isActive }) =>
              `flex items-center space-x-3 border rounded-lg p-2 transition duration-300 ${
                isActive ? 'bg-gray-400 ' : 'text-gray-700'
              } hover:bg-gray-200`
            }
          >
            <FaListUl className="w-4 h-4 text-blue-600" />
            <span>List Items</span>
          </NavLink>

          {/* Orders Link */}
          <NavLink
            to="/manager/orders"
            className={({ isActive }) =>
              `flex items-center space-x-3 border rounded-lg p-2 transition duration-300 ${
                isActive ? 'bg-gray-400  ' : 'text-gray-700'
              } hover:bg-gray-200`
            }
          >
            <FaBoxOpen className="w-4 h-4 text-red-400" />
            <span>Orders</span>
          </NavLink>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerSidebar;
