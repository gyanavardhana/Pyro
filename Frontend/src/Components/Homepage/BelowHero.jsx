import React, { useEffect, useState } from "react";
import yourdata from "../../assets/yourdata.png";
import twenty from "../../assets/24-7.jpg";
import instants from "../../assets/instants.jpg";
import AccordionSection from "./Accordion";
import collab from "../../assets/collab.jpg";
import Cookies from 'js-cookie';
import { isTokenExpired } from "../../utils/authutils";
import { useNavigate } from "react-router-dom";
const BelowHero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handlesignup = () => {
    navigate('/signup');
  }
  useEffect(() => {
    const token = Cookies.get('authToken');
    setIsLoggedIn(token && !isTokenExpired(token));
  }, []);

  return (
    <>
      <div className="bg-green-100 py-20 px-4 md:px-10">
        <div className="max-w-4xl mx-auto mt-5 flex flex-col md:flex-row items-center justify-between">
          {/* Left Content Section */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
              Your data, your way
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Use Pyro to capture more than just numbers. Input sensor data,
              upload machine specifications, and set preferences for products
              you want to monitor. Whether it's real-time reports, historical
              data, or predictive analytics, Pyro keeps your information secure
              and accessible.
            </p>
          </div>
          {/* Right Image Section */}
          <div className="md:w-1/2">
            <img
              src={yourdata}
              alt="Data image"
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-52 flex flex-col md:flex-row items-center justify-between">
          {/* Left Content Section */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
            <img
              src={twenty}
              alt="24/7 image"
              className="w-full h-auto rounded-md"
            />
          </div>
          {/* Right Image Section */}
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
              24/7 access
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Pyro automatically syncs across all your devices so you can access
              your most important information anytime, anywhere. No internet? No
              problem—offline mode lets you continue to use Pyro even when
              connectivity is limited.
            </p>
            {!isLoggedIn && (
              <button onClick={handlesignup}className="bg-green-500 hover:bg-green-600 text-white text-xl font-semibold py-3 px-8 rounded-md shadow-md transition duration-300">
                Start for free
              </button>
            )}
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-52 flex flex-col md:flex-row items-center justify-between">
          {/* Left Content Section */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
              Instant insights
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Our powerful search features and interactive dashboards help you
              get the right information quickly and reliably. With Pyro, you can
              search through your data, visualize trends, and receive alerts
              about potential issues.
            </p>
            <a href="#" className="text-green-600 hover:underline">
              Learn more
            </a>
          </div>
          {/* Right Image Section */}
          <div className="md:w-1/2">
            <img
              src={instants}
              alt="Instant insights"
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-52 flex flex-col md:flex-row items-center justify-between">
          {/* Left Content Section */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
            <img
              src={collab}
              alt="Effortless collaboration"
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
          {/* Right Image Section */}
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
              Effortless collaboration
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Pyro makes it easy to collaborate on maintenance projects.
              Real-time updates keep all team members informed, and our
              leaderboard feature helps you track and compare product
              performance across your organization.
            </p>
            <a href="#" className="text-green-600 hover:underline">
              Learn more
            </a>
          </div>
        </div>
        <div className="max-w-4xl mt-52 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
            Pyro in action
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Monitor your machines and prevent breakdowns with our powerful With
            Pyro, you have everything you need to keep your machines running
            smoothly. Use it for data input, performance monitoring, and to find
            what you need, when you need it.
          </p>
        </div>
        <AccordionSection />
      </div>
      <div
        className="bg-teal-800 py-20 px-4 md:px-10"
        border-b
        border-black
      >
        <div className="max-w-4xl mx-auto text-center bg-teal-800 text-white">
          <h1 className="text-4xl mt-10 md:text-5xl font-bold mb-6">
            Predict failures, optimize maintenance
          </h1>
          <p className="text-lg text-white mb-8">
            Monitor your machines and prevent breakdowns with our powerful
            predictive maintenance dashboard, all in one place.
          </p>
          {!isLoggedIn && (
            <button onClick={handlesignup} className="bg-white hover:bg-teal-200 text-black text-xl font-semibold py-3 px-8 rounded-md shadow-md transition duration-300">
              Start for free
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BelowHero;
