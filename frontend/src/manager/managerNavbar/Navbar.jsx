import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const ManagerNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-600 flex flex-wrap items-center justify-between p-4 border-b-2 border-gray-300">
      {/* Logo */}
      <img className="h-10 w-auto mb-2 md:mb-0" src={assets.logo} alt="Logo" />

      {/* Welcome Text */}
      <div className="text-blue-600 font-bold text-xl md:text-3xl text-center flex-grow">
        Welcome Manager
      </div>

      {/* Home Link */}
      <div
        className="cursor-pointer text-green-400 hover:text-green-600 text-sm md:text-lg mx-4"
        onClick={() => navigate('Header')}
      >
        Home
      </div>

      {/* Profile Picture */}
      <img
        className="h-10 w-10 rounded-full object-cover"
        src={assets.manager_profile}
        alt="Profile"
      />
    </div>
  );
};

export default ManagerNavbar;
