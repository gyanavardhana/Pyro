const ProductDetails = ({ formData }) => (
    <div className="mt-8 bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg border border-green-200">
      <h3 className="text-2xl font-bold mb-6 text-green-800 border-b-2 border-green-300 pb-2">
        Product Details
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Type", value: formData.Type },
          { label: "Air Temperature", value: `${formData.Airtemperature} K` },
          { label: "Process Temperature", value: `${formData.Processtemperature} K` },
          { label: "Rotational Speed", value: `${formData.Rotationalspeed} RPM` },
          { label: "Torque", value: `${formData.Torque} Nm` },
          { label: "Tool Wear", value: `${formData.Toolwear} min` },
        ].map((item, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center space-x-3"
          >
            <div className="flex-shrink-0">
              <span className="inline-block h-8 w-8 rounded-full bg-green-200 text-green-600 text-center leading-8">
                {item.label[0]}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-lg font-semibold text-green-700">{item.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

export default ProductDetails;