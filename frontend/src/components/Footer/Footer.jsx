import React from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="text-white font-sans font-light bg-gray-700 mt-16">
      <div className="flex  flex-col md:flex-row justify-between px-6 py-3 mx-auto max-w-6xl ">
        <div className="flex flex-col gap-4 w-full md:w-[50%]">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-red-400 font-mono md:font-bold sm:font-semibold">
            Agape Catering
          </h1>
          <p className="text-sm md:text-base">
            Agape Catering represents various catering services known for
            quality food and community engagement. From full-service event
            catering in Baltimore to Mediterranean and barbecue specialties in
            Ohio and Indiana, each branch offers diverse, customizable menus. In
            Ethiopia, Agape Catering Services excels in authentic local cuisine,
            all united by a commitment to excellence and hospitality.
          </p>

          <div className="flex gap-4 pl-4 md:pl-16">
            <FaPhone
              className="w-8 h-8 text-gray-300 hover:text-white transition-transform transform hover:scale-110 cursor-pointer"
              title="Phone"
            />
            <FaEnvelope
              className="w-8 h-8 text-gray-300 hover:text-white transition-transform transform hover:scale-110 cursor-pointer"
              title="Email"
            />
            <FaFacebook
              className="w-8 h-8 text-gray-300 hover:text-white transition-transform transform hover:scale-110 cursor-pointer"
              title="Facebook"
            />
            <FaTiktok
              className="w-8 h-8 text-gray-300 hover:text-white transition-transform transform hover:scale-110 cursor-pointer"
              title="TikTok"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full md:w-[50%] mt-6 md:mt-0">
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
            <h2 className="text-lg font-semibold">Company</h2>
            <ul className="text-center md:text-left p-4 cursor-pointer">
              <li className="hover:text-gray-400">Home</li>
              <li className="hover:text-gray-400">About Us</li>
              <li className="hover:text-gray-400">Delivery</li>
              <li className="hover:text-gray-400">Privacy Policy</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end w-full md:w-1/2">
            <h2 className="text-lg font-semibold">Get in Touch</h2>
            <ul className="text-center md:text-right cursor-pointer">
              <li className="flex items-center gap-2 hover:text-gray-400">
                <FaPhone /> +251-909090909
              </li>
              <li className="flex items-center gap-2 hover:text-gray-400">
                <FaEnvelope /> agapecatering@gmail.com
              </li>
              <li className="flex items-center gap-2 hover:text-gray-400">
                <FaFacebook /> .......
              </li>
              <li className="flex items-center gap-2 hover:text-gray-400">
                <FaTiktok /> .....................
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="w-full border-gray-200" />
      <p className="text-sm text-center py-5">
        Copyright © {new Date().getFullYear()} Agape Catering. All Rights
        Reserved.
      </p>
    </div>
  );
};

export default Footer;
