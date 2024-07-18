import React from 'react';
import AzureMLImage from '../../assets/Azureml.jpg';

const WhatsNew = () => {
  return (
    <div className="bg-white py-10 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between border-b border-black">
      {/* Left Content Section */}
      <div className="max-w-4xl  mx-36 text-center md:text-left mb-8 md:mb-0 md:mr-4">
        <p className="text-sm md:text-base font-medium text-gray-600">WHAT'S NEW</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Introducing machine learning integration</h2>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          Our latest update brings Azure ML integration, allowing for more accurate predictions and deeper insights into your machine performance.
        </p>
        <a href="#" className="text-green-600 hover:underline">Read more</a>
      </div>

      {/* Right Image Section */}
      <div className="md:w-1/2">
        <img src={AzureMLImage} alt="Azure ML Image" className="w-full h-auto rounded-md" />
      </div>
    </div>
  );
};

export default WhatsNew;
