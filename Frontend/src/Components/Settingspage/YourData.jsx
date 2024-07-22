import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/authutils'; // Adjust the import path as needed
import * as XLSX from 'xlsx';

const YourData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('authToken');

        if (!token || isTokenExpired(token)) {
          alert('Session timed out');
          navigate('/login');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_APP_URL}setting/getdata`, {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token format matches your backend expectations
          },
        });
        setData(response.data.products); // Adjust this based on the structure of your API response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'Type',
        header: 'Type',
        size: 100,
      },
      {
        accessorKey: 'Airtemperature',
        header: 'Air Temperature',
        size: 150,
      },
      {
        accessorKey: 'Processtemperature',
        header: 'Process Temperature',
        size: 150,
      },
      {
        accessorKey: 'Rotationalspeed',
        header: 'Rotational Speed',
        size: 150,
      },
      {
        accessorKey: 'Torque',
        header: 'Torque',
        size: 100,
      },
      {
        accessorKey: 'Toolwear',
        header: 'Tool Wear',
        size: 100,
      },
      {
        accessorKey: 'count',
        header: 'Count',
        size: 100,
      },
      {
        accessorKey: 'prediction',
        header: 'Prediction',
        size: 100,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, // Data must be memoized or stable
  });

  const handleExport = () => {
    const filteredData = data.map(({ userid, _id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-green-800">Your Data</h2>
        <button
          onClick={handleExport}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-white px-4 py-2 rounded"
        >
          Download Excel
        </button>
      </div>
      <p className="text-lg text-gray-700 mb-4">Manage your data here.</p>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default YourData;
