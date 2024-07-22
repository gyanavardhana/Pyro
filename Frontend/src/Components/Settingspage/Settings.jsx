// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import Data from "./YourData"; // Updated import
import Preferences from "./YourPreferences"; // Updated import
import Cookies from "js-cookie";
import Navbar from "../Homepage/Navbar";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("data");

  const handleLogout = () => {
    Cookies.remove("authToken");
    window.location.href = "/"; // Redirect to the homepage
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-green-50 mt-16">
        <div className="w-1/5 bg-green-200 p-6"> {/* Reduced sidebar width */}
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("data")}
              className={`block text-xl p-3 w-full rounded-md transition duration-300 ${
                activeTab === "data"
                  ? "bg-green-600 text-white"
                  : "bg-green-200 hover:bg-green-300"
              }`}
            >
              Data
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`block text-xl p-3 w-full rounded-md transition duration-300 ${
                activeTab === "preferences"
                  ? "bg-green-600 text-white"
                  : "bg-green-200 hover:bg-green-300"
              }`}
            >
              Preferences
            </button>
            <button
              onClick={handleLogout}
              className="block text-xl p-3 w-full rounded-md bg-green-200 text-black hover:bg-red-500 hover:text-white transition duration-300"
            >
              Logout
            </button>
          </nav>
        </div>
        <div className="w-4/5 bg-gradient-to-r from-green-50 to-blue-50 p-8"> {/* Adjusted content area width */}
          {activeTab === "data" && <Data />}
          {activeTab === "preferences" && <Preferences />}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
