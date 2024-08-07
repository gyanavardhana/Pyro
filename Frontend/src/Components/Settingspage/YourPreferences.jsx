import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { FilterMatchMode } from "primereact/api";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/authutils'; // Adjust the import path as needed
import * as XLSX from 'xlsx';
import Loader from '../Loader'; // Import your Loader component

const YourPreferences = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Airtemperature: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Processtemperature: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Rotationalspeed: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Torque: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Toolwear: { value: null, matchMode: FilterMatchMode.CONTAINS },
    count: { value: null, matchMode: FilterMatchMode.CONTAINS },
    prediction: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [loading, setLoading] = useState(true); // Add loading state

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

        setLoading(true); // Set loading to true when starting to fetch data
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}setting/getfavorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
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

      setLoading(true); // Set loading to true when starting to refresh data
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}setting/getfavorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is refreshed or error occurs
    }
  };

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  const predictionBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.prediction === "0" ? "All Well" : "Not Well"}
        severity={rowData.prediction === "0" ? "success" : "danger"}
        className={
          rowData.prediction === "0"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }
      />
    );
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl text-900 font-bold">Preferences</span>
          <Button icon="pi pi-refresh" rounded raised onClick={refreshData} />
        </div>
        <InputText
          type="search"
          value={value || ""}
          onChange={onGlobalFilterChange}
          placeholder="Global Search"
          className="ml-auto"
        />
      </div>
    );
  };

  const handleExport = () => {
    const filteredData = products.map(({ userid, _id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Preferences');
    XLSX.writeFile(workbook, 'preferences.xlsx');
  };

  const header = renderHeader();

  return (
    <>
      
      <div className="card p-4">
        {loading ? (
          <>
          
          <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader />
            <h2 className="text-center pt-8 text-4xl md:text-5xl font-bold text-green-900 mb-6">
              Loading your data
            </h2>
          </div>
        </>
        ) : (
          <>
          <h2 className="text-3xl font-bold mb-4 text-green-800">Your Preferences</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg text-gray-700 mb-4">Manage your preferences here.</p>
        <Button
          onClick={handleExport}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-white px-4 py-2 rounded"
        >
          Download Excel
        </Button>
      </div>
          <DataTable
            value={products}
            paginator
            rows={5}
            header={header}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            tableStyle={{ minWidth: "60rem" }}
            className="p-datatable-striped"
            emptyMessage="No data found."
          >
            <Column
              field="name"
              header="Name"
              sortable
              filter
              filterPlaceholder="Search"
            />
            <Column
              field="Type"
              header="Type"
              sortable
              filterPlaceholder="Search"
            />
            <Column
              field="Airtemperature"
              header="Air Temperature"
              sortable
              filterPlaceholder="Search"
            />
            <Column
              field="Processtemperature"
              header="Process Temperature"
              sortable
              filterPlaceholder="Search"
            />
            <Column
              field="Rotationalspeed"
              header="Rotational Speed"
              sortable
              filterPlaceholder="Search"
            />
            <Column
              field="Torque"
              header="Torque"
              sortable
              filterPlaceholder="Search"
            />
            <Column
              field="Toolwear"
              header="Tool Wear"
              sortable
              filterPlaceholder="Search"
            />
            <Column
              field="count"
              header="Count"
              sortable
              filterPlaceholder="Search"
            />
            <Column
              field="prediction"
              header="Prediction"
              body={predictionBodyTemplate}
              sortable
              filterPlaceholder="Search"
            />
          </DataTable>
          </>
        )}
      </div>
    </>
  );
};

export default YourPreferences;
