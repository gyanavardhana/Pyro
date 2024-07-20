import React, { useState, useEffect, useRef } from "react";
import Pyro from "../../assets/pyro-icon.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState({
    leaderboard: false,
    dashboard: false,
    mlUpload: false,
    login: false,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("authToken"); // Get the authToken cookie
    if (token) {
      setIsLoggedIn(true); // Update login status
    }
  }, []);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenMenu((prev) => ({ ...prev, [menu]: true }));
  };

  const handleMouseLeave = (menu) => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu((prev) => ({ ...prev, [menu]: false }));
    }, 100);
  };

  const handleOptionClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    Cookies.remove("authToken"); // Remove the authToken cookie
    setIsLoggedIn(false); // Update login status
    alert("Logged out successfully");
    navigate("/"); // Redirect to the home page or login page
  };

  const renderMenu = (menuName, buttonText, options, optionPaths, positionClass) => (
    <div
      className="relative"
      onMouseEnter={() => handleMouseEnter(menuName)}
      onMouseLeave={() => handleMouseLeave(menuName)}
    >
      <button
        id={`${menuName}-button`}
        className="text-black text-xl hover:bg-green-200 px-4 py-2"
      >
        {buttonText}
      </button>
      {openMenu[menuName] && (
        <div
          id={`${menuName}-menu`}
          className={`absolute ${positionClass} mt-2 w-48 bg-green-100 border rounded shadow-lg border-b border-black`}
          onMouseEnter={() => handleMouseEnter(menuName)}
          onMouseLeave={() => handleMouseLeave(menuName)}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(optionPaths[index])}
              className="px-4 py-2 text-gray-700 hover:bg-green-200 cursor-pointer"
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
        <div className="flex items-center space-x-16">
          <img src={Pyro} alt="Pyro Icon" className="h-10 w-55 cursor-pointer" onClick={() => handleOptionClick('/')} />
          {renderMenu(
            "leaderboard",
            "Leaderboard",
            ["Option 1", "Option 2", "Option 3"],
            [],
            "left-0"
          )}
          {renderMenu(
            "dashboard",
            "Dashboard",
            ["Profile", "My account", "Logout"],
            [],
            "left-0"
          )}
          {renderMenu(
            "mlUpload",
            "ML/Upload",
            ["Upload 1", "Upload 2", "Upload 3"],
            [],
            "left-0"
          )}
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-black text-xl hover:bg-green-200 px-4 py-2"
            >
              Logout
            </button>
          ) : (
            renderMenu(
              "login",
              "Login",
              ["Signup", "Login"],
              ["/signup", "/login"],
              "right-0"
            )
          )}
        </div>
      </nav>
    </>
  );
}
