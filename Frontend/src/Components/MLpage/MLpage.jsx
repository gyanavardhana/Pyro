import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../Homepage/Navbar";

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    Type: "L",
    Airtemperature: 300.0,
    Processtemperature: 310.0,
    Rotationalspeed: 1500,
    Torque: 40.0,
    Toolwear: 108,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (name !== "name" && name !== "Type") {
      parsedValue = parseFloat(value);
    }

    if (name === "Rotationalspeed" || name === "Toolwear") {
      parsedValue = parseInt(value, 10);
    }

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = Cookies.get("authToken");

    if (!token) {
      alert("Session timed out");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}ml/createproduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPredictionResult(response.data.prediction.prediction);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-10 bg-gradient-to-br from-green-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Input Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="Type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="Type"
                name="Type"
                value={formData.Type}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="H">H</option>
              </select>
            </div>
            {[
              "Airtemperature",
              "Processtemperature",
              "Rotationalspeed",
              "Torque",
              "Toolwear",
            ].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  id={field}
                  name={field}
                  type="number"
                  step={
                    field === "Rotationalspeed" || field === "Toolwear"
                      ? "1"
                      : "any"
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Creating Product..." : "Create Product"}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 border rounded bg-red-100 text-red-700">
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-8">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-4xl font-extrabold mb-6">Create Product</h2>
              <p className="text-xl mb-8">
                Enter your product details and get instant maintenance
                predictions.
              </p>
              {predictionResult !== null && !loading && (
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4">Prediction Result</h3>
                  <div
                    className={`py-3 px-6 text-white font-semibold rounded-lg text-center text-lg ${
                      predictionResult === 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {predictionResult === 0
                      ? "No Maintenance Needed"
                      : "Maintenance Needed"}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Display input details */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Input Details</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Type:</strong> {formData.Type}
              </li>
              <li>
                <strong>Air Temperature:</strong> {formData.Airtemperature} K
              </li>
              <li>
                <strong>Process Temperature:</strong>{" "}
                {formData.Processtemperature} K
              </li>
              <li>
                <strong>Rotational Speed:</strong> {formData.Rotationalspeed}{" "}
                RPM
              </li>
              <li>
                <strong>Torque:</strong> {formData.Torque} Nm
              </li>
              <li>
                <strong>Tool Wear:</strong> {formData.Toolwear} min
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProductForm;
