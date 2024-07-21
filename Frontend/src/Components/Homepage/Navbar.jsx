import React, { useState, useEffect, useRef } from "react";
import Pyro from "../../assets/pyro-icon.png";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { isTokenExpired } from "../../utils/authutils";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState({
    login: false,
    profile: false,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    setIsLoggedIn(token && !isTokenExpired(token));
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
    const token = Cookies.get('authToken');
    if (!token || isTokenExpired(token)) {
      alert('Session timed out');
      navigate('/login');
      return;
    }
    navigate(path);
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    setIsLoggedIn(false);
    alert("Logged out successfully");
    console.log(window.location.pathname);
    if (window.location.pathname === "/") {
      window.location.reload();
    }else{
      navigate('/');
    }
  };

  return (
    <>
      <nav className="bg-green-100 p-4 flex flex-wrap justify-between items-center shadow-md w-full fixed top-0 border-b border-black">
        <div className="flex items-center space-x-16">
          <img src={Pyro} alt="Pyro Icon" className="h-10 w-55 cursor-pointer" onClick={() => navigate('/')} />
          <button
            className="text-black text-xl hover:bg-green-200 px-4 py-2"
            onClick={() => handleOptionClick('/leaderboard')}
          >
            Leaderboard
          </button>
          <button
            className="text-black text-xl hover:bg-green-200 px-4 py-2"
            onClick={() => handleOptionClick('/dashboard')}
          >
            Dashboard
          </button>
          <button
            className="text-black text-xl hover:bg-green-200 px-4 py-2"
            onClick={() => handleOptionClick('/mlupload')}
          >
            ML/Upload
          </button>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('profile')}
              onMouseLeave={() => handleMouseLeave('profile')}
            >
              <button
                id="profile-button"
                className="text-black text-xl hover:bg-green-200 px-4 py-2"
              >
                Profile
              </button>
              {openMenu.profile && (
                <div
                  id="profile-menu"
                  className="absolute right-0 mt-2 w-48 bg-green-100 border rounded shadow-lg border-b border-black"
                  onMouseEnter={() => handleMouseEnter('profile')}
                  onMouseLeave={() => handleMouseLeave('profile')}
                >
                  <div
                    onClick={() => handleOptionClick('/settings')}
                    className="px-4 py-2 text-gray-700 hover:bg-green-200 cursor-pointer"
                  >
                    Settings
                  </div>
                  <div
                    onClick={handleLogout}
                    className="px-4 py-2 text-gray-700 hover:bg-green-200 cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('login')}
              onMouseLeave={() => handleMouseLeave('login')}
            >
              <button
                id="login-button"
                className="text-black text-xl hover:bg-green-200 px-4 py-2"
              >
                Login
              </button>
              {openMenu.login && (
                <div
                  id="login-menu"
                  className="absolute right-0 mt-2 w-48 bg-green-100 border rounded shadow-lg border-b border-black"
                  onMouseEnter={() => handleMouseEnter('login')}
                  onMouseLeave={() => handleMouseLeave('login')}
                >
                  <div
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 text-gray-700 hover:bg-green-200 cursor-pointer"
                  >
                    Signup
                  </div>
                  <div
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-gray-700 hover:bg-green-200 cursor-pointer"
                  >
                    Login
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
