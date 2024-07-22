import React, { useState } from 'react';

const Sidebar = ({ isOpen, handleClose, children }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleClose}
    >
      <div
        className={`fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-0 right-0 m-4 text-gray-600"
          onClick={handleClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
