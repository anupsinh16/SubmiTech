/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
const user = localStorage.getItem("user");
const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-blue-300/40 via-purple-300/40 to-pink-300/40 border border-white/30 shadow-xl rounded-b-2xl">
      <div className="flex justify-between items-center px-6 py-2">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <a href='https://pict.edu/'><img src="https://pict.edu/images/pic.jpg" 
            alt="Logo" 
            className="max-h-12 border border-white/50 rounded-xl shadow-lg" 
          /></a>
          <h1 className="font-bold text-lg text-blue-500 tracking-wide drop-shadow-md">SubmiTech</h1>
        </div>

        {/* Hamburger Menu (Small Screens) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none hover:text-pink-500 transition duration-300 p-2 rounded-md bg-white/60 backdrop-blur-md"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`lg:flex lg:w-auto lg:static w-full absolute transition-all duration-500 ease-in-out backdrop-blur-md rounded-2xl p-4 shadow-lg ${
            isOpen ? 'top-12 left-4 right-4 bg-gradient-to-r from-white/70 via-gray-200/70 to-white/70 text-gray-900 rounded-lg' : 'top-[-500px]'
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:justify-center lg:items-center py-2 lg:py-0 font-medium space-y-2 lg:space-y-0 lg:space-x-6">
            {['Home', 'Student', 'Teacher', 'Admin'].map((item) => {
              const path = item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;

              return (
                <li key={item} className="text-center">
                  <Link
                    to={path}
                    className={`cursor-pointer text-sm tracking-wide transition duration-300 px-4 py-1 rounded-xl shadow-lg ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                        : 'hover:bg-gradient-to-r from-purple-300 to-pink-300 text-gray-900'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}

              {isLoggedIn && (
                <li>
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-xs px-4 py-2 shadow-lg"
                  >
                    Log-Out
                  </button>
                </li>
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
