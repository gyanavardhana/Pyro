import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/authutils'; // Adjust the import path as needed
import Navbar from "../Homepage/Navbar";
const Table = ({ selectionMode, selectedProduct, onSelectionChange }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
    name: { value: null, matchMode: "contains" },
    Type: { value: null, matchMode: "contains" },
    Airtemperature: { value: null, matchMode: "contains" },
    Processtemperature: { value: null, matchMode: "contains" },
    Rotationalspeed: { value: null, matchMode: "contains" },
    Torque: { value: null, matchMode: "contains" },
    Toolwear: { value: null, matchMode: "contains" },
    count: { value: null, matchMode: "contains" },
    prediction: { value: null, matchMode: "contains" },
  });

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
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const refreshData = async () => {
    try {
      const token = Cookies.get('authToken');

      if (!token || isTokenExpired(token)) {
        alert('Session timed out');
        navigate('/login');
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_APP_URL}setting/getdata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl text-900 font-bold">Your Data</span>
        </div>
        <InputText
          type="search"
          value={value || ""}
          onChange={onGlobalFilterChange}
          placeholder="Global Search"
          className="ml-auto"
          size={20}
        />
      </div>
    );
  };

  const header = renderHeader();

  return (
    <>
    <div className="flex justify-center items-center min-h-screen">
      <div className="card p-4 rounded-lg w-full max-w-6xl">
        <DataTable
          value={products}
          rows={6}
          header={header}
          filters={filters}
          onFilter={(e) => setFilters(e.filters)}
          selection={selectedProduct}
          onSelectionChange={onSelectionChange}
          dataKey="_id"
          tableStyle={{ minWidth: "60rem" }}
          paginator
        >
          {selectionMode && <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>}
          <Column field="name" header="Name" sortable filter filterPlaceholder="Search"/>
          <Column field="Type" header="Type"   />
          <Column field="Airtemperature" header="Air Temperature"/>
          <Column field="Processtemperature" header="Process Temperature"  />
          <Column field="Rotationalspeed" header="Rotational Speed"   />
          <Column field="Torque" header="Torque"   />
          <Column field="Toolwear" header="Tool Wear"  />
        </DataTable>
      </div>
    </div>
    </>
  );
};

export default Table;
