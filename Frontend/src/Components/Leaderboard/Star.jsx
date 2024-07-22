import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { isTokenExpired } from "../../utils/authutils"; // Adjust the import path as needed
import { toast, Zoom } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const Star = ({ isFavourite, productId }) => {
  const [favorite, setFavorite] = useState(isFavourite);
  const token = Cookies.get("authToken");

  const handleClick = async () => {
    if (!token || isTokenExpired(token)) {
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
      return;
    }

    try {
      let response;
      if (favorite) {
        response = await axios.delete(
          `${import.meta.env.VITE_APP_URL}leader/removefavorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: { productId },
          }
        );
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Zoom,
        });
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_APP_URL}leader/addfavorites`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Zoom,
        });
      }
      setFavorite(!favorite);
    } catch (error) {
      toast.error("Error updating favorite status", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Zoom,
      });
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <FaStar
      onClick={handleClick}
      color={favorite ? "gold" : "grey"}
      size={24} // Adjust the size as needed
      style={{ cursor: "pointer" }}
    />
  );
};

export default Star;
