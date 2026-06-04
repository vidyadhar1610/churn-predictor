import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customerID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    gender: String,

    SeniorCitizen: Number,

    Partner: String,

    Dependents: String,

    tenure: Number,

    PhoneService: String,

    MultipleLines: String,

    InternetService: String,

    OnlineSecurity: String,

    OnlineBackup: String,

    DeviceProtection: String,

    TechSupport: String,

    StreamingTV: String,

    StreamingMovies: String,

    Contract: String,

    PaperlessBilling: String,

    PaymentMethod: String,

    MonthlyCharges: Number,

    TotalCharges: Number,

    Churn: String,
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model(
  "Customer",
  customerSchema
);

export default Customer;