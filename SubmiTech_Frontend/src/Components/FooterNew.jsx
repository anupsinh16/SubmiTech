/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const FooterNew = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-300/40 via-purple-300/40 to-pink-300/40 border-t border-white/30 backdrop-blur-md shadow-inner">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-10 text-gray-800">

        {/* Logo and Tagline */}
        <div className="flex flex-col items-center sm:items-start space-y-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwuy6pDzwEKU_LzwyumGntBC-iljLNsC_aaQ&s"
              alt="Logo"
              className="w-12 h-12 rounded-xl shadow-md border border-white/40"
            />
            <h2 className="font-bold text-xl text-blue-900 tracking-wide drop-shadow-md">
              SubmiTech
            </h2>
          </div>
          <p className="text-sm text-gray-700 max-w-xs">
            Innovate. Integrate. Iterate.
          </p>
        </div>

        {/* Portal Navigation Links */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 text-sm font-medium">
          <h3 className="text-md font-semibold text-gray-900">Portal Links</h3>
          {['Home', 'Student', 'Teacher', 'Admin'].map((item) => (
            <Link
              key={item}
              to={item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`}
              className="hover:text-purple-700 transition"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Official & External Links */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 text-sm font-medium">
          <h3 className="text-md font-semibold text-gray-900">Official Links</h3>
          <a
            href="https://pict.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-700 transition"
          >
            PICT Official Website
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-gray-600 py-4 border-t border-white/20 px-4">
        © {new Date().getFullYear()} SubmiTech | Developed for PICT
      </div>
    </footer>
  );
};

export default FooterNew;
