import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { FaSearch, FaShoppingCart, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-2 flex items-center bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="flex-1 flex justify-start">
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-16 h-8 sm:w-20 sm:h-10"
          />
        </Link>
      </div>

      <div className="sm:hidden flex items-center space-x-4">
        <FaSearch
          className="w-6 h-6 cursor-pointer hover:text-gray-400"
          title="Search"
        />
        <Link to="/cart">
          <FaShoppingCart
            className="w-6 h-6 cursor-pointer hover:text-gray-400"
            title="Cart"
          />
        </Link>
        <FaBars
          className="w-6 h-6 cursor-pointer hover:text-gray-400"
          onClick={() => setIsOpen(!isOpen)}
          title="Menu"
        />
      </div>

      <div className="hidden sm:flex flex-1 justify-end px-4 sm:px-16">
        <ul className="flex items-center space-x-4 sm:space-x-8 text-sm sm:text-md font-medium text-black">
          <Link to="/" className="cursor-pointer hover:text-gray-400">
            Home
          </Link>

          <Link to="/menu" className="cursor-pointer hover:text-gray-400">
            Menu
          </Link>
          <div className="flex flex-col items-center cursor-pointer min-w-[100px] sm:min-w-[120px]">
            <Link to="/category" className="cursor-pointer hover:text-gray-400">
              Category
            </Link>
          </div>
          <Link to="/cart">
            <FaShoppingCart
              className="w-5 h-5 cursor-pointer hover:text-gray-400"
              title="Cart"
            />
          </Link>
          <FaSearch
            className="w-5 h-5 cursor-pointer hover:text-gray-400"
            title="Search"
          />
          <Link to="/feedback" className="cursor-pointer hover:text-gray-400">
            Feedback
          </Link>
          <Link to="/contact" className=" cursor-pointer hover:text-gray-400">
            Contact Us
          </Link>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-blue-500 rounded-full text-white px-6 hover:text-gray-400 transition"
          >
            Login/Sign Up
          </button>
        </ul>
      </div>

      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-lg p-4 sm:hidden">
          <ul className="flex flex-col space-y-4 text-center text-black">
            <li className="cursor-pointer hover:text-gray-400">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-400">
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/menu" className="cursor-pointer hover:text-gray-400">
                Category
              </Link>
            </li>
            <li className="cursor-pointer hover:text-gray-400">Feedback</li>
            <li className="cursor-pointer hover:text-gray-400">Contact Us</li>
            <button className="bg-blue-500 rounded text-white px-4 py-1 hover:text-gray-400 transition">
              Login/Sign Up
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
