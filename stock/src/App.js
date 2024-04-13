// import React, { useState, useEffect } from "react";
// import { Chart, registerables } from 'chart.js';
// import 'chartjs-adapter-date-fns';
// import axios from "axios";
// import { Line } from "react-chartjs-2";

// Chart.register(...registerables);

// const GraphComponent = () => {
//   const [graphData, setGraphData] = useState(null);
//   const [symbol, setSymbol] = useState(""); // State to store user input

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3001/predict?symbol=${symbol}`); // Pass user input as query parameter
//       setGraphData(response.data);
//     } catch (error) {
//       console.error("Error fetching graph data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [symbol]); // Add symbol as a dependency

//   console.log(`FE : ${symbol}`)

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     fetchData(); // Fetch data when the form is submitted
//   };

//   return (
//     <div style={{ width: "80%", height: "700px", margin: "0 auto" }}>
//       {/* Input field for user to enter stock symbol */}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter Stock Symbol"
//           value={symbol}
//           onChange={(e) => setSymbol(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       {graphData && (
//         <Line
//           data={{
//             labels: graphData.result.labels,
//             datasets: [
//               {
//                 label: "Price",
//                 data: graphData.result.prices,
//                 fill: false,
//                 borderColor: "pink",
//               },
//             ],
//           }}
//           options={{
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: {
//               x: {
//                 type: "time",
//                 time: {
//                   unit: "day",
//                 },
//                 title: {
//                   display: true,
//                   text: "Date",
//                 },
//               },
//               y: {
//                 title: {
//                   display: true,
//                   text: "Price",
//                 },
//               },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default GraphComponent;
import React, { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import axios from "axios";
import { Line } from "react-chartjs-2";

Chart.register(...registerables);

const GraphComponent = () => {
  const [graphData, setGraphData] = useState(null);
  const [symbol, setSymbol] = useState(""); // State to store user input

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/predict?symbol=${symbol}`); // Pass user input as query parameter
      setGraphData(response.data);
      // Clear the symbol input after fetching data
      setSymbol("");
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch data only if symbol is not empty
    if (symbol) {
      await fetchData();
    }
  };

  return (
    <div style={{ width: "80%", height: "700px", margin: "0 auto" }}>
      {/* Form for user to enter stock symbol */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
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
      )}
    </div>
  );
};

export default GraphComponent;

