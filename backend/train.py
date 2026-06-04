import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

from xgboost import XGBClassifier

# Load dataset
df = pd.read_csv(
    "./dataset/WA_Fn-UseC_-Telco-Customer-Churn.csv"
)

# Remove customerID
df.drop("customerID", axis=1, inplace=True)

# Fix TotalCharges column
df["TotalCharges"] = pd.to_numeric(
    df["TotalCharges"],
    errors="coerce"
)

df["TotalCharges"] = df["TotalCharges"].fillna(0)

# Encode categorical columns
label_encoders = {}

for column in df.columns:
    if df[column].dtype == "object":
        le = LabelEncoder()

        df[column] = le.fit_transform(df[column])

        label_encoders[column] = le

# Features and target
X = df.drop("Churn", axis=1)
y = df["Churn"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train model
model = XGBClassifier(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42
)

model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Feature importance
importance = model.feature_importances_

feature_importance = sorted(
    zip(X.columns, importance),
    key=lambda x: x[1],
    reverse=True
)

print("\nTop Feature Importances:")

for feature, score in feature_importance[:10]:
    print(f"{feature}: {score:.4f}")

# Save model + encoders
joblib.dump(
    {
        "model": model,
        "encoders": label_encoders
    },
    "./models/xgboost_churn.pkl"
)

print("\nModel saved successfully")