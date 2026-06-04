import sys
import json
import joblib
import pandas as pd

# Load trained model once
saved_data = joblib.load(
    "./models/xgboost_churn.pkl"
)

model = saved_data["model"]
encoders = saved_data["encoders"]

print("Prediction server started", flush=True)

# Listen forever
while True:
    try:
        line = sys.stdin.readline()

        if not line:
            continue

        data = json.loads(line)

        request_id = data["id"]

        features = data["features"]

        df = pd.DataFrame([features])

        # Encode categorical columns
        for column in df.columns:
            if column in encoders:
                df[column] = encoders[column].transform(
                    df[column]
                )

        # Predict probability
        probability = model.predict_proba(df)[0][1]

        # Risk level logic
        if probability > 0.7:
            risk_level = "high"
        elif probability > 0.4:
            risk_level = "medium"
        else:
            risk_level = "low"

        result = {
            "id": request_id,
            "probability": float(probability),
            "risk_level": risk_level
        }

        print(json.dumps(result), flush=True)

    except Exception as e:
        error_result = {
            "error": str(e)
        }

        print(json.dumps(error_result), flush=True)