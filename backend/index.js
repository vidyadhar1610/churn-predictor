import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { spawn } from "child_process";
import readline from "readline";
import { v4 as uuidv4 } from "uuid";
import protect from "./middleware/authMiddleware.js";
import session from "express-session";

import passport from "./config/passport.js";

import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import Customer from "./models/Customer.js";
import authRoutes from "./routes/authRoutes.js";



await connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret:
      process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());

/*
-----------------------------------
START PYTHON PROCESS ONCE
-----------------------------------
*/

const pythonProcess = spawn(
  "C:/Users/vidya/AppData/Local/Programs/Python/Python313/python.exe",
  ["predict_server.py"]
);

const rl = readline.createInterface({
  input: pythonProcess.stdout,
});

const pendingRequests = new Map();

/*
-----------------------------------
READ PYTHON RESPONSES
-----------------------------------
*/

rl.on("line", (line) => {
  try {
    const result = JSON.parse(line);

    if (result.id && pendingRequests.has(result.id)) {
      const resolve = pendingRequests.get(result.id);

      resolve(result);

      pendingRequests.delete(result.id);
    } else {
      console.log("Python:", result);
    }
  } catch (error) {
    console.log("Python Log:", line);
  }
});

pythonProcess.stderr.on("data", (data) => {
  console.error(`Python Error: ${data}`);
});

/*
-----------------------------------
ROOT ROUTE
-----------------------------------
*/

app.get("/", (req, res) => {
  res.json({
    message: "Customer Churn CRM Backend Running",
  });
});

/*
-----------------------------------
PREDICT ROUTE
-----------------------------------
*/

app.post("/api/predict",protect, async (req, res) => {
  try {
    const features = req.body;

    const requestId = uuidv4();

    const predictionPromise = new Promise((resolve) => {
      pendingRequests.set(requestId, resolve);
    });

    pythonProcess.stdin.write(
      JSON.stringify({
        id: requestId,
        features,
      }) + "\n"
    );

    const result = await predictionPromise;

    res.json({
      prediction: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Prediction failed",
    });
  }
});

/*
-----------------------------------
START SERVER
-----------------------------------
*/
app.use("/auth", authRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});