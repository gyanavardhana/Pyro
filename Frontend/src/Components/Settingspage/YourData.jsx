import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/authutils'; // Adjust the import path as needed

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Your Data</h2>
      <p className="text-lg text-gray-700 mb-4">Manage your data here.</p>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default YourData;
