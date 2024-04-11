import React, { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import axios from "axios";
import { Line } from "react-chartjs-2";

Chart.register(...registerables);

const GraphComponent = () => {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/predict");
        setGraphData(response.data);
        // console.log("Data:", response.data);
        // console.log("Labels:", response.data.result.labels);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log("graphData:", graphData);
  // console.log(graphData.labels);

  return (
    <div style={{ width: "80%", height: "700px", margin: "0 auto" }}>
      {graphData && (
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
                type: "time", // Use "time" scale for dates
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
      )}
    </div>
  );
};


export default GraphComponent;
