import React from "react";
import PyroIcon from "../../assets/pyro-icon.png";

export default function Footer() {
  return (
    <footer className="bg-green-200 text-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <img src={PyroIcon} alt="Pyro Icon" className="h-10 w-auto mb-2" />
            <p className="text-lg font-semibold">Contact Us</p>
            <p className="mt-2">123 Green Street, City, Country</p>
            <p>contact@example.com</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-green-600">
              About Us
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700 pt-4 text-sm flex justify-between">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-green-600">
              Terms of Service
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Cookies Policy
            </a>
            <div className="flex space-x-2">
              <a href="#" className="text-gray-700 hover:text-green-600">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
