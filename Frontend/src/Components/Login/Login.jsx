import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Pyro from "../../assets/pyro-icon.png";
import loginImage from "../../assets/login.png";  // Assuming you have a different image for the login page
import { useNavigate  } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}user/login`, { email, password });
      if (response.status === 200) {
        const { token } = response.data;
        Cookies.set("authToken", token, { expires: 7 }); // Set the cookie for 7 days
        alert("Login Successful");
        navigate("/");
        // Redirect to another page or clear the form here
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Internal Server Error");
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white mt-20 shadow-lg rounded-lg overflow-hidden flex w-3/4 max-w-4xl">
        <div className="w-full md:w-1/2 p-8">
          <div className="flex justify-center mb-4">
            <img src={Pyro} alt="Pyro Icon" className="h-14 w-55" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="hidden md:block md:w-1/2 bg-green-200 p-8">
          <img src={loginImage} alt="Login Illustration" className="w-full h-full object-cover"/>
        </div>
      </div>
    </div>
    </>
  );
}
