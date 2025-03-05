/* eslint-disable no-unused-vars */
import React, { use } from 'react'
import { useState } from 'react';

const Navbar = () => {
  const [current, setCurrent] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
    
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-violet-200/30 border border-white/20 shadow-lg">
        <div className="flex justify-between items-center px-10 py-2">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwuy6pDzwEKU_LzwyumGntBC-iljLNsC_aaQ&s" alt="Logo" className="max-h-16 border rounded-2xl shadow-2xl" />
            <h1 className="font-bold text-xl ">SubmiTech</h1>
          </div>

          {/* Hamburger Menu (Small Screens) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none hover:text-pink-300"
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
            className={`lg:flex lg:w-auto lg:static w-full absolute bg-white/30 lg:bg-transparent transition-all duration-300 ease-in-out ${
              isOpen ? 'top-20 left-0 right-0 px-6' : 'top-[-500px]'
            }`}
          >
            <ul className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 lg:py-0 font-semibold space-y-3 lg:space-y-0 lg:space-x-6">
              {['Home','Student','Teacher','Admin'].map((item) => (
                
                <li
                  key={item}
                  className={`cursor-pointer ${
                    current === item
                      ? 'text-white bg-violet-400 transition duration-300 border border-transparent rounded-2xl px-3 py-1'
                      : 'hover:bg-violet-300 transition duration-300 border border-transparent rounded-2xl px-3 py-1'
                  }`}
                  onClick={() => {
                    setCurrent(item);
                    setIsOpen(false); // Close the menu on small screens
                  }}
                >
                  <a to={`/${(item.replace(' ', '').toLowerCase() === "home")?'':item.replace(' ', '').toLowerCase()}`}>{item}</a>
                </li>
                
              ))}

              <li>
              {isLoggedIn && (<button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-700 focus:ring-4
               focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-600">Log-Out</button>)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
