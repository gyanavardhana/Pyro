import React, { useState } from 'react';
import predict from '../../assets/predict.jpg';
import SensorDataImage from '../../assets/track.jpg';
import LeaderboardImage from '../../assets/compare.jpg';
import MachineSpecsImage from '../../assets/transform.jpg';

const AccordionSection = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Initialize with 0 for the first item to be active

  // Array of accordion items with title, description, and corresponding image
  const accordionItems = [
    {
      title: 'Predict and Prevent',
      description:
        'Harness the power of Azure ML to forecast machine failures, optimize maintenance schedules, and keep your operations running smoothly.',
      image: predict,
    },
    {
      title: 'Track and Analyze',
      description:
        'Monitor real-time sensor data, visualize performance metrics, and gain actionable insights through interactive dashboards and customizable reports.',
      image: SensorDataImage,
    },
    {
      title: 'Compare and Improve',
      description:
        'Leverage our leaderboard to benchmark your products against industry standards, identify top performers, and drive continuous improvement in durability.',
      image: LeaderboardImage,
    },
    {
      title: 'Upload and Transform',
      description:
        'Seamlessly input your sensor data and machine specifications to generate instant predictions, update leaderboards, and enhance overall system intelligence.',
      image: MachineSpecsImage,
    },
  ];

  const handleItemClick = (index) => {
    // Toggle accordion item visibility
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-green-100 py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section - Accordion */}
          <div className="md:w-2/3"> {/* Adjusted width for smaller left section */}
            {accordionItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-300 pb-4 mb-4 cursor-pointer"
                onClick={() => handleItemClick(index)}
              >
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {item.title}
                </h3>
                {/* Render description only if activeIndex matches current index or if it's the first item */}
                {(activeIndex === index || (activeIndex === null && index === 0)) && (
                  <p className="text-sm text-gray-700">{item.description}</p>
                )}
              </div>
            ))}
          </div>
          {/* Right Section - Image */}
          <div className="mt-10 mx-auto max-w-full"> {/* Adjusted width for larger right section */}
            <img
              src={accordionItems[activeIndex]?.image || ''}
              alt="Accordion Image"
              className="w-full h-80 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
