import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { isTokenExpired } from "../../utils/authutils"; // Adjust the import path as needed

const Star = ({ isFavourite, productId }) => {
  const [favorite, setFavorite] = useState(isFavourite);
  const token = Cookies.get("authToken");

  const handleClick = async () => {
    if (!token || isTokenExpired(token)) {
      alert("Session timed out");
      return;
    }

    try {
      if (favorite) {
        const response = await axios.delete(
          `${import.meta.env.VITE_APP_URL}leader/removefavorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: { productId },
          }
        );
        alert(response.data.message);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}leader/addfavorites`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert(response.data.message);
      }
      setFavorite(!favorite);
    } catch (error) {
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
