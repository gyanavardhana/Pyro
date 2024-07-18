import React, { useState } from "react";
import Pyro from "../../assets/pyro-icon.png";
import Hero from "./Hero";
import WhatsNew from "./Whatsnew";
import BelowHero from "./BelowHero";
import Footer from "./Footer";
export default function Navbar() {
  const [openMenu, setOpenMenu] = useState({
    leaderboard: false,
    dashboard: false,
    mlUpload: false,
    login: false,
  });

  const handleToggle = (menu) => {
    setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleClose = (menu) => {
    setOpenMenu((prev) => ({ ...prev, [menu]: false }));
  };

  const renderMenu = (menuName, buttonText, options, positionClass) => (
    <div className="relative">
      <button
        id={`${menuName}-button`}
        aria-controls={openMenu[menuName] ? `${menuName}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu[menuName] ? "true" : undefined}
        onClick={() => handleToggle(menuName)}
        className="text-black text-xl hover:bg-green-200 px-4 py-2"
      >
        {buttonText}
      </button>
      {openMenu[menuName] && (
        <div
          id={`${menuName}-menu`}
          className={`absolute ${positionClass} mt-2 w-48 bg-green-100 border  rounded shadow-lg border-b border-black`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleClose(menuName)}
              className="px-4 py-2 text-gray-700 hover:bg-green-200 cursor-pointer "
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
    <nav className="bg-green-100 p-4 flex flex-wrap justify-between items-center shadow-md w-full fixed top-0 border-b border-black">
      <div className="flex items-center space-x-4">
        <img src={Pyro} alt="Pyro Icon" className="h-14 w-55" />
        {renderMenu(
          "leaderboard",
          "Leaderboard",
          ["Option 1", "Option 2", "Option 3"],
          "left-0"
        )}
        {renderMenu(
          "dashboard",
          "Dashboard",
          ["Profile", "My account", "Logout"],
          "left-0"
        )}
        {renderMenu(
          "mlUpload",
          "ML/Upload",
          ["Upload 1", "Upload 2", "Upload 3"],
          "left-0"
        )}
      </div>
      <div className="flex items-center">
        {renderMenu(
          "login",
          "Login",
          ["Login Option 1", "Login Option 2"],
          "right-0"
        )}
      </div>
    </nav>
    </>
  );
}
