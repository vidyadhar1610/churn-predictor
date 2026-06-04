import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import Customer from "./models/Customer.js";

dotenv.config();

const results = [];

const importData = async () => {
  try {
    await connectDB();

    fs.createReadStream(
      "./dataset/WA_Fn-UseC_-Telco-Customer-Churn.csv"
    )
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          customerID: data.customerID,
          gender: data.gender,
          SeniorCitizen: Number(data.SeniorCitizen),
          Partner: data.Partner,
          Dependents: data.Dependents,
          tenure: Number(data.tenure),
          PhoneService: data.PhoneService,
          MultipleLines: data.MultipleLines,
          InternetService: data.InternetService,
          OnlineSecurity: data.OnlineSecurity,
          OnlineBackup: data.OnlineBackup,
          DeviceProtection: data.DeviceProtection,
          TechSupport: data.TechSupport,
          StreamingTV: data.StreamingTV,
          StreamingMovies: data.StreamingMovies,
          Contract: data.Contract,
          PaperlessBilling: data.PaperlessBilling,
          PaymentMethod: data.PaymentMethod,
          MonthlyCharges: Number(data.MonthlyCharges),
          TotalCharges:
            Number(data.TotalCharges) || 0,
          Churn: data.Churn,
        });
      })
      .on("end", async () => {
        try {
          console.log(
            `CSV Loaded: ${results.length} rows`
          );

          await Customer.deleteMany();

          console.log("Old customers deleted");

          const inserted =
            await Customer.insertMany(results);

          console.log(
            `${inserted.length} customers inserted`
          );

          process.exit(0);
        } catch (error) {
          console.error(
            "Insert Error:",
            error
          );

          process.exit(1);
        }
      });
  } catch (error) {
    console.error("Seed Error:", error);

    process.exit(1);
  }
};

importData();