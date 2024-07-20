import React, { useEffect, useRef, useState } from 'react';
import embed from 'vega-embed';
import axios from 'axios';

const Plot = () => {
  const chartRef = useRef(null);
  const [vegaSpec, setVegaSpec] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Type: "L",
    "Air Temperature": 300.0,
    "Process Temperature": 310.0,
    "Rotational Speed": 1500,
    "Torque": 40.0,
    "Tool wear": 108,
    "input_feature": "Air Temperature",
  });

  useEffect(() => {
    if (vegaSpec && chartRef.current) {
      embed(chartRef.current, vegaSpec).catch((error) => console.error(error));
    }
  }, [vegaSpec]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    // Parse values that should be numbers
    if (name !== 'Type' && name !== 'input_feature') {
      parsedValue = parseFloat(value);
    }

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .post('', formData)
      .then((response) => {
        setVegaSpec(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Vega Chart Example</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type:</label>
          <select name="Type" value={formData.Type} onChange={handleChange}>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="H">H</option>
          </select>
        </div>
        <div>
          <label>Air Temperature:</label>
          <input
            type="number"
            name="Air Temperature"
            value={formData["Air Temperature"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Process Temperature:</label>
          <input
            type="number"
            name="Process Temperature"
            value={formData["Process Temperature"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rotational Speed:</label>
          <input
            type="number"
            name="Rotational Speed"
            value={formData["Rotational Speed"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Torque:</label>
          <input
            type="number"
            name="Torque"
            value={formData.Torque}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tool Wear:</label>
          <input
            type="number"
            name="Tool wear"
            value={formData["Tool wear"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Input Feature:</label>
          <select
            name="input_feature"
            value={formData.input_feature}
            onChange={handleChange}
          >
            <option value="Air Temperature">Air Temperature</option>
            <option value="Process Temperature">Process Temperature</option>
            <option value="Rotational Speed">Rotational Speed</option>
            <option value="Torque">Torque</option>
            <option value="Tool wear">Tool wear</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error loading chart: {error.message}</div>}
      <div ref={chartRef}></div>
    </div>
  );
};

export default Plot;
