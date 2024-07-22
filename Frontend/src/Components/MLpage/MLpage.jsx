import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import generateAndOpenPdf from "./Genpdf";
import PredictionResult from "./Predictresult";
import ProductDetails from "./Productdetails";
import GenerateReport from "./Genreport";
import Sidebar from "./Sidebar";
import InputForm from "./Inputform";
import { toast, Zoom } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

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
  const [pdfLoading, setPdfLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const navigateToLogin = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1500); // Delay navigation to match Toastify autoClose duration
  };

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
      toast.error("Session timed out", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Zoom,
      });
      navigateToLogin();
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
      toast.success("Product created successfully!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Zoom,
      });
      setIsSidebarOpen(false); // Close sidebar after loading
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Zoom,
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePdf = async () => {
    setPdfLoading(true);
    try {
      await generateAndOpenPdf();
    } catch (error) {
      toast.error("Error generating or opening PDF", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Zoom,
      });
      console.error("Error generating or opening PDF:", error);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-10 justify-center bg-gradient-to-br from-green-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex">
        <Sidebar
          isOpen={isSidebarOpen}
          handleClose={() => setIsSidebarOpen(false)}
        >
          <InputForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        </Sidebar>
        <div className="w-3/4 p-8 ">
          <div className="max-w-5xl mx-auto  bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Open Sidebar to Enter Product Details
              </button>

              <ProductDetails formData={formData} />
              <h2 className="text-4xl text-green-800 font-extrabold mb-6 mt-8">
                Predict your Product
              </h2>
              <p className="text-xl mb-8">
                Enter your product details and get instant maintenance
                predictions.
              </p>
              {predictionResult !== null && !loading && (
                <>
                  <PredictionResult predictionResult={predictionResult} />
                  <GenerateReport
                    handleGeneratePdf={handleGeneratePdf}
                    pdfLoading={pdfLoading}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProductForm;
