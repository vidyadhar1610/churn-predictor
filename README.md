Customer Churn Prediction CRM

An AI-powered Customer Relationship Management (CRM) platform that predicts customer churn using Machine Learning and provides real-time risk analysis through a modern web interface.

Features
Customer churn prediction using XGBoost
Real-time prediction API
MongoDB Atlas database integration
Google OAuth authentication
React frontend
Express.js backend
Python ML inference engine
Customer data management
Risk level classification (Low / Medium / High)
Responsive modern UI
Tech Stack
Frontend
React.js
Vite
Tailwind CSS
Axios
Backend
Node.js
Express.js
Passport.js
Google OAuth 2.0
Express Session
Database
MongoDB Atlas
Mongoose
Machine Learning
Python
Pandas
Scikit-Learn
XGBoost
Joblib
Project Architecture
React Frontend
      │
      ▼
Google OAuth
      │
      ▼
Express Backend
      │
      ├── MongoDB Atlas
      │
      └── Python Prediction Engine
                │
                ▼
          XGBoost Model
Dataset

Dataset used:

Telco Customer Churn Dataset

Contains:

Customer demographics
Contract information
Internet services
Billing information
Customer churn labels

Total Records:

7043 Customers
Machine Learning Model

Algorithm:

XGBoost Classifier

Model Accuracy:

80.41%

Top Influential Features:

Contract
Online Security
Internet Service
Tech Support
Tenure
Monthly Charges
Installation
Clone Repository
git clone https://github.com/yourusername/customer-churn-crm.git

cd customer-churn-crm
Backend Setup
cd backend

npm install

Create .env

MONGO_URI=your_mongodb_connection_string

PORT=3000

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

SESSION_SECRET=your_secret_key

Run backend:

npm run dev
Frontend Setup
cd frontend

npm install

npm run dev
Machine Learning Setup

Install Python dependencies:

pip install pandas scikit-learn xgboost joblib

Train model:

python train.py

Run prediction server:

python predict_server.py
API Endpoints
Predict Customer Churn
POST /api/predict/:customerId

Example:

curl -X POST http://localhost:3000/api/predict/3668-QPYBK

Response:

{
  "customerID": "3668-QPYBK",
  "prediction": {
    "probability": 0.3297,
    "risk_level": "low"
  }
}
Authentication

Google OAuth 2.0 Authentication using Passport.js

Routes:

GET /auth/google
GET /auth/google/callback
GET /auth/logout
Future Improvements
Dashboard analytics
Customer segmentation
Churn trend visualization
Admin panel
JWT authentication
Email notifications
Customer retention recommendations
Deployment on AWS
Project Structure
customer-churn-crm
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── dataset
│   ├── train.py
│   ├── predict_server.py
│   └── index.js
│
├── frontend
│   ├── src
│   ├── pages
│   └── components
│
└── README.md
Author

Vidyadhar addari
