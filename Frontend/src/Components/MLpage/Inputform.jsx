const InputForm = ({ formData, handleChange, handleSubmit, loading, error }) => (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Input Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
            required
          />
        </div>
        <div>
          <label htmlFor="Type" className="block text-sm font-medium text-gray-700">Type</label>
          <select
            id="Type"
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
          >
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="H">H</option>
          </select>
        </div>
        {['Airtemperature', 'Processtemperature', 'Rotationalspeed', 'Torque', 'Toolwear'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              id={field}
              name={field}
              type="number"
              step={field === 'Rotationalspeed' || field === 'Toolwear' ? '1' : 'any'}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Product...
            </>
          ) : (
            <>
              Create Product
            </>
          )}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-2 border rounded-md bg-red-100 text-red-700 animate-pulse">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
  
  export default InputForm;
  