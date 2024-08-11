import React, { useEffect, useState } from "react";
import Dashboard from "../../assets/MLUpload3.png";
import WorkIcon from "../../assets/location.jpg";
import MonitorIcon from "../../assets/monitor.jpg";
import InsightsIcon from  "../../assets/insights.jpg";
import BugIcon from  "../../assets/issue.jpg";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { isTokenExpired } from "../../utils/authutils";

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('authToken');
    setIsLoggedIn(token && !isTokenExpired(token));
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div
      className="bg-green-100 py-20 px-4 md:px-10 border-b border-black"
      style={{ marginTop: "64px" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
          Predict failures, optimize maintenance
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Monitor your machines and prevent breakdowns with our powerful
          predictive maintenance dashboard, all in one place.
        </p>
        {!isLoggedIn && (
          <>
            <button 
              onClick={handleSignupClick} 
              className="bg-green-500 hover:bg-green-600 text-white text-xl font-semibold py-3 px-8 rounded-md shadow-md transition duration-300"
            >
              Start for free
            </button>
            <p className="mt-6 text-gray-800">
              Already have an account?{" "}
              <span
                className="cursor-pointer text-green-600 hover:underline"
                onClick={handleLoginClick}
              >
                Log in now
              </span>
            </p>
          </>
        )}
      </div>
      <img
        src={Dashboard}
        alt="Dashboard"
        className="mt-10 mx-auto rounded-xl max-w-full"
      />

      {/* Section with four blocks */}
      <div className="bg-green-100 py-10 px-4 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Block 1 */}
          <div className="flex flex-col items-center text-center">
            <img
              src={WorkIcon}
              alt="location icon"
              className="h-20 w-50 mb-5"
            />
            <h3 className="text-4xl font-medium text-gray-900 mb-2">
              Work anywhere
            </h3>
            <p className="text-xl text-gray-700">
              Access your dashboard from any device - your data syncs
              automatically.
            </p>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col items-center text-center">
            <img
              src={MonitorIcon}
              alt="Monitor icon"
              className="h-20 w-50 mb-5"
            />
            <h3 className="text-4xl font-medium text-gray-900 mb-2">
              Monitor everything
            </h3>
            <p className="text-xl text-gray-700">
              Input sensor data, view analytics, receive machine failure
              predictions in real-time.
            </p>
          </div>

          {/* Block 3 */}
          <div className="flex flex-col items-center text-center">
            <img
              src={InsightsIcon}
              alt="Insights icon"
              className="h-20 w-50 mb-5"
            />
            <h3 className="text-4xl font-medium text-gray-900 mb-2">
              Turn insights into action
            </h3>
            <p className="text-xl text-gray-700">
              Optimize your maintenance schedules and prevent costly breakdowns.
            </p>
          </div>

          {/* Block 4 */}
          <div className="flex flex-col items-center text-center">
            <img
              src={BugIcon}
              alt="Issue icon"
              className="h-20 w-50 mb-5"
            />
            <h3 className="text-4xl font-medium text-gray-900 mb-2">
              Find issues fast
            </h3>
            <p className="text-xl text-gray-700">
              Powerful search and visualization tools help you identify
              potential problems quickly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
