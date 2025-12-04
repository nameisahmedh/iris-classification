"""
Iris Classification Flask Web Application
Multi-page app with home and prediction pages
"""

from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

# Global variables for models
models = {}
scaler = None
model_accuracies = {}

def load_all_models():
    """Load all trained models and scaler"""
    global models, scaler, model_accuracies
    
    try:
        scaler = joblib.load('models/scaler.pkl')
        model_accuracies = joblib.load('models/model_accuracies.pkl')
        
        model_files = {
            'Random Forest': 'models/random_forest.pkl',
            'SVM': 'models/svm.pkl',
            'Decision Tree': 'models/decision_tree.pkl',
            'K-Nearest Neighbors': 'models/k-nearest_neighbors.pkl',
            'Naive Bayes': 'models/naive_bayes.pkl'
        }
        
        for model_name, filename in model_files.items():
            if os.path.exists(filename):
                models[model_name] = joblib.load(filename)
                print(f"✓ Loaded {model_name}")
        
        print(f"✓ Loaded {len(models)} models successfully")
        return True
        
    except Exception as e:
        print(f"✗ Error loading models: {e}")
        return False

@app.route('/')
def home():
    """Render the home page"""
    return render_template('home.html')

@app.route('/predict-page')
def predict_page():
    """Render the prediction page"""
    return render_template('predict.html', 
                         model_names=list(models.keys()),
                         model_accuracies=model_accuracies)

@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests"""
    try:
        data = request.get_json()
        
        required_fields = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'model']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400
        
        model_name = data['model']
        if model_name not in models:
            return jsonify({'error': f'Invalid model: {model_name}'}), 400
        
        model = models[model_name]
        
        features = np.array([[
            float(data['sepal_length']),
            float(data['sepal_width']),
            float(data['petal_length']),
            float(data['petal_width'])
        ]])
        
        if np.any(features < 0) or np.any(features > 10):
            return jsonify({'error': 'Feature values should be between 0 and 10'}), 400
        
        features_scaled = scaler.transform(features)
        prediction = model.predict(features_scaled)[0]
        probabilities = model.predict_proba(features_scaled)[0]
        class_names = model.classes_
        model_accuracy = model_accuracies[model_name]['test_accuracy'] * 100
        
        result = {
            'prediction': prediction,
            'species': prediction.split('-')[1].capitalize(),
            'confidence': {
                class_name.split('-')[1].capitalize(): float(prob) 
                for class_name, prob in zip(class_names, probabilities)
            },
            'confidence_percentage': float(max(probabilities) * 100),
            'model_accuracy': model_accuracy,
            'model_name': model_name
        }
        
        return jsonify(result)
        
    except ValueError as e:
        return jsonify({'error': f'Invalid input values: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

# Load models when the module is imported (for gunicorn/production)
load_all_models()

if __name__ == '__main__':
    print("\n" + "="*50)
    print("IRIS CLASSIFICATION WEB APPLICATION")
    print("="*50)
    
    print("\n✓ Server starting...")
    print("✓ Home: http://127.0.0.1:5000")
    print("✓ Predict: http://127.0.0.1:5000/predict-page")
    print("\nPress CTRL+C to stop the server\n")
    print("="*50 + "\n")
    
    app.run(debug=True, host='127.0.0.1', port=5000)
