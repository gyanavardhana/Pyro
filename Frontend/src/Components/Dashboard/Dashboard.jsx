import React, { useState } from 'react';
import ReusableTable from './Table'; // Adjust the import path as needed
import Plot from './Plot'; // Adjust the import path as needed
import Navbar from '../Homepage/Navbar';

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rowClick, setRowClick] = useState(false);

  return (
    <div className="flex h-screen ">
      {/* Table Section */}
      <Navbar />
      <div className="flex-1 p-4 bg-green-100 overflow-hidden">
        <ReusableTable
          selectionMode={rowClick ? null : 'radiobutton'}
          selectedProduct={selectedProduct}
          onSelectionChange={(e) => {
            setSelectedProduct(e.value);
            console.log(e.value); // Log the selected product immediately
          }}
        />
      </div>

      {/* Plot Section */}
      <div className="flex-1 p-4 mt-20 bg-gradient-to-r from-green-50 to-blue-50 overflow-auto">
        <Plot product={selectedProduct} />
      </div>
    </div>
  );
};

export default Dashboard;
