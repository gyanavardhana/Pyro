import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/authutils"; // Adjust the import path as needed
import Navbar from "../Homepage/Navbar";
import Star from "./Star"; // Adjust the import path as needed
import Loader from "../Loader"; // Adjust the import path as needed
const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("authToken");

        if (!token || isTokenExpired(token)) {
          alert("Session timed out");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}leaderboard/getleaderboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ensure the token format matches your backend expectations
            },
          }
        );
        setData(response.data); // Adjust this based on the structure of your API response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "averageRiskScore",
        header: "Average Durability Score",
        size: 150,
      },
      {
        accessorKey: "ratio",
        header: "Ratio",
        size: 100,
      },
      {
        accessorKey: "riskPercentage",
        header: "Durability Percentage",
        size: 150,
      },
      {
        accessorKey: "isFavourite",
        header: "Favourites",
        size: 100,
        Cell: ({ cell, row }) => (
          <Star isFavourite={cell.getValue()} productId={row.original._id} />
        ),
      },
      {
        accessorKey: "rank",
        header: "Rank",
        size: 100,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, // Data must be memoized or stable
  });

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader />
          <h2 className="text-center pt-8 text-4xl md:text-5xl font-bold text-green-900 mb-6">
            Loading your data
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-green-100">
        <h2 className="text-center pt-24 text-4xl md:text-5xl font-bold text-green-900 mb-6">
          Leaderboard
        </h2>
        <div className="flex justify-center min-h-screen">
          <div className="bg-green-100 p-6 rounded w-full max-w-7xl">
            <MaterialReactTable table={table} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
