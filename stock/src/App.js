import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./App.css"; // Import CSS file

Chart.register(...registerables);

const GraphComponent = () => {
  const [graphData, setGraphData] = useState(null);
  const [symbol, setSymbol] = useState(""); // State to store user input
  const [predictedPrice, setPredictedPrice] = useState(null); // State to store predicted price
  const [loading, setLoading] = useState(false); // State to track loading state

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/predict?symbol=${symbol}`
      ); // Pass user input as query parameter
      setGraphData(response.data);
      // Extract predicted price
      if (response.data && response.data.result.prices.length > 0) {
        setPredictedPrice(response.data.result.prices.slice(-1)[0]);
      }
      // Clear the symbol input after fetching data
      setSymbol("");
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch data only if symbol is not empty
    if (symbol) {
      await fetchData();
    }
  };

  return (
    <div className="container">
      {/* Form for user to enter stock symbol */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
      {/* Display predicted price */}
      {predictedPrice && (
        <div className="predicted-price">
          <h2> Tomorrow's Predicted Price</h2>
          <p>{predictedPrice}</p>
        </div>
      )}
      {/* Display graph if data is available */}
      {loading && <p>Loading...</p>}
      {graphData && (
        <div className="chart-container">
          <Line
            data={{
              labels: graphData.result.labels,
              datasets: [
                {
                  label: "Price",
                  data: graphData.result.prices,
                  fill: false,
                  borderColor: "pink",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "day",
                  },
                  title: {
                    display: true,
                    text: "Date",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Price",
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GraphComponent;
