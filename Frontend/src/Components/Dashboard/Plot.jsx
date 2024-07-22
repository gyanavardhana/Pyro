import React, { useEffect, useRef, useState } from "react";
import embed from "vega-embed";
import axios from "axios";
import ProductDetails from "../MLpage/Productdetails";
import Reven from "../../assets/Revenue-bro.png";
const Plot = ({ product }) => {
  const chartRef = useRef(null);
  const [vegaSpec, setVegaSpec] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Type: "L",
    "Air Temperature": 300.0,
    "Process Temperature": 310.0,
    "Rotational Speed": 1500,
    Torque: 40.0,
    "Tool wear": 108,
    input_feature: "Air Temperature",
  });
  const [newFormData, setNewFormData] = useState({
    Type: "L",
    "Air Temperature": 300.0,
    "Process Temperature": 310.0,
    "Rotational Speed": 1500,
    Torque: 40.0,
    "Tool wear": 108,
  });

  // Update formData when product changes
  useEffect(() => {
    if (product) {
      const {
        name,
        Type,
        Airtemperature,
        Processtemperature,
        Rotationalspeed,
        Torque,
        Toolwear,
      } = product;
      console.log(
        name,
        Type,
        Airtemperature,
        Processtemperature,
        Rotationalspeed,
        Torque,
        Toolwear
      );
      setFormData({
        Type,
        "Air Temperature": Airtemperature,
        "Process Temperature": Processtemperature,
        "Rotational Speed": Rotationalspeed,
        Torque,
        "Tool wear": Toolwear,
        input_feature: formData.input_feature, // Preserve selected input feature
      });
      setNewFormData({
        name,
        Type,
        Airtemperature,
        Processtemperature,
        Rotationalspeed,
        Torque,
        Toolwear,
      });
    }
  }, [product]);

  useEffect(() => {
    if (vegaSpec && chartRef.current) {
      embed(chartRef.current, vegaSpec).catch((error) => console.error(error));
    }
  }, [vegaSpec]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    // Parse values that should be numbers
    if (name !== "Type" && name !== "input_feature") {
      parsedValue = parseFloat(value);
    }

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .post(`${import.meta.env.VITE_APP_FLASK}plot`, formData)
      .then((response) => {
        setVegaSpec(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
      {product ? (
        <>
          {/* Product Details Form */}
          <ProductDetails formData={newFormData} />

          {/* Form for Submitting Data */}
          <div className="mt-12 bg-white p-6 rounded-xl ">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Interactive Feature Analysis
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Input Feature:
                </label>
                <select
                  name="input_feature"
                  value={formData.input_feature}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md transition duration-150 ease-in-out hover:border-green-300"
                >
                  {[
                    "Air Temperature",
                    "Process Temperature",
                    "Rotational Speed",
                    "Torque",
                    "Tool wear",
                  ].map((feature) => (
                    <option key={feature} value={feature}>
                      {feature}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Submit
              </button>
            </form>

            {loading && (
              <div className="mt-4 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
                <span className="ml-2 text-green-600">Loading chart...</span>
              </div>
            )}

            {error && (
              <div
                className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>Error loading chart: {error.message}</p>
              </div>
            )}

            <div ref={chartRef} className="mt-6 "></div>
          </div>
        </>
      ) : (
        <>
  <div className="text-4xl text-green-800 font-extrabold text-center">
    Please select a product to see the metrics and interactive analysis.
    <img src={Reven} alt="Description of image" className="mx-auto" style={{ width: '480px', height: 'auto', maxHeight: '480px' }} />
  </div>
</>

      )}
    </div>
  );
};

export default Plot;
