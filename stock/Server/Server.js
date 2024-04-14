const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();

app.use(cors());

const executePython = async (script, args) => {
  const arguments = args.map((arg) => arg.toString());

  const py = spawn("python", [script, ...arguments]);

  const result = await new Promise((resolve, reject) => {
    let output;

    py.stdout.on("data", (data) => {
      output = JSON.parse(data);
    });

    py.stderr.on("data", (data) => {
      console.error(`[python] Error occured: ${data}`);
      reject(`Error occured in ${script}`);
    });

    py.on("exit", (code) => {
      console.log(`Child process exited with code ${code}`);
      resolve(output);
    });
  });

  return result;
};

app.get("/predict", async (req, res) => {
  const { symbol } = req.query; // Get stock symbol from query parameter
  console.log(`stock : ${symbol}`);

  try {
    const result = await executePython("stock_prediction.py", [symbol]); // Pass symbol to Python script
    // console.log(result);
    res.json({ result: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(3001, () => {
  console.log("[server] Application started!");
});
