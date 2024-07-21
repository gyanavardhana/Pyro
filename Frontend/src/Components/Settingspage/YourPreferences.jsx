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

        const response = await axios.get(`${import.meta.env.VITE_APP_URL}setting/getfavorites`, {
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

      const response = await axios.get(`${import.meta.env.VITE_APP_URL}setting/getfavorites`, {
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

  const header = renderHeader();

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Your Preferences</h2>
      <p className="text-lg text-gray-700 mb-4">
        Manage your preferences here.
      </p>
      <div className="card p-4">
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
      </div>
    </>
  );
};

export default YourPreferences;
