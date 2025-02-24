 import React, { useContext, useState, useRef } from 'react';
 import { assets } from '../../assets/assets';
 import {
   FaSearch,
   FaShoppingCart,
   FaBars,
   FaShoppingBag,
   FaSignOutAlt,
   FaUser,
   FaCog,
   FaHistory,
 } from 'react-icons/fa';
 import { Link, useNavigate } from 'react-router-dom';
 import { StoreContext } from '../../context/StoreContext';

 const Navbar = ({ setShowLogin }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const { token, setToken } = useContext(StoreContext);
   
   const navigate = useNavigate();
    const timeoutRef = useRef(null);

   const logout =()=>{
     localStorage.removeItem("token");
     setToken("");
     navigate("/")
   };
  

   const handleLogout = () => {
     setToken('');
     localStorage.removeItem('token');
   };

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
           <Link to="/category" className="cursor-pointer hover:text-gray-400">
             Category
           </Link>
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

           {!token ? (
             <button
               onClick={() => setShowLogin(true)}
               className="bg-blue-500 rounded-full text-white px-6 hover:text-gray-400 transition"
             >
               Login/Sign Up
             </button>
           ) : (
             <div
               className="relative"
               onMouseEnter={() => setIsProfileOpen(true)}
               onMouseLeave={() =>
                 setTimeout(() => setIsProfileOpen(false), 800)
               } // Delay added
             >
               <FaUser className="w-7 h-7 cursor-pointer text-gray-600 hover:text-gray-800" />
               {isProfileOpen && (
                 <ul className="absolute right-0 mt-2 w-32 border-red-400 bg-white shadow-lg rounded-lg py-2 border transition-opacity duration-400">
                   <li className="flex items-center px-4 py-2 hover:bg-red-400 cursor-pointer">
                     <FaShoppingBag className="mr-2" />
                     <Link to="/orders">Orders</Link>
                   </li>
                   <hr />
                   <li className="flex items-center px-4 py-2 hover:bg-red-400 cursor-pointer">
                    <FaCog className="mr-2" />
                    <Link to="/manage-profile">Manage Profile</Link> {/* New "Manage Profile" option */}
                  </li>
                  <hr />
                  
                   <li onClick={logout}
                     className="flex items-center px-4 py-2 hover:bg-red-400 cursor-pointer"
                    //  onClick={handleLogout}
                   >
                     <FaSignOutAlt className="mr-2" />
                     Logout
                   </li>
                 </ul>
               )}
             </div>
           )}
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
             <li className="cursor-pointer hover:text-gray-400">
               <Link to="/category">Category</Link>
             </li>
             <li className="cursor-pointer hover:text-gray-400">
               <Link to="/feedback">Feedback</Link>
             </li>
             <button
               className="bg-blue-500 rounded text-white px-4 py-1 hover:text-gray-400 transition"
               onClick={() => setShowLogin(true)}
             >
               Login/Sign Up
             </button>
           </ul>
         </div>
       )}
     </div>
   );
 };

 export default Navbar;
