"""
Iris Classification Model Training Script - Multi-Model Support
Trains multiple models and saves them with their accuracies
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import joblib
import os

def load_data():
    """Load training and test datasets"""
    print("Loading datasets...")
    train_df = pd.read_csv('iris_train_data.csv')
    test_df = pd.read_csv('iris_test_data.csv')
    
    print(f"Training samples: {len(train_df)}")
    print(f"Test samples: {len(test_df)}")
    
    return train_df, test_df

def train_all_models(train_df, test_df):
    """Train multiple models and save with accuracies"""
    print("\n" + "="*50)
    print("TRAINING MULTIPLE MODELS")
    print("="*50)
    
    feature_cols = ['sepal length in cm', 'sepal width in cm', 
                    'petal length in cm', 'petal width in cm']
    
    # Prepare data
    X_train = train_df[feature_cols].values
    y_train = train_df['class'].values
    X_test = test_df[feature_cols].values
    y_test = test_df['class'].values
    
    # Standardize features
    print("\nStandardizing features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Define models
    models = {
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
        'SVM': SVC(kernel='rbf', probability=True, random_state=42),
        'Decision Tree': DecisionTreeClassifier(max_depth=10, random_state=42),
        'K-Nearest Neighbors': KNeighborsClassifier(n_neighbors=5),
        'Naive Bayes': GaussianNB()
    }
    
    # Create models directory
    os.makedirs('models', exist_ok=True)
    
    # Train and save each model
    model_accuracies = {}
    
    for model_name, model in models.items():
        print(f"\nTraining {model_name}...")
        model.fit(X_train_scaled, y_train)
        
        # Evaluate
        train_pred = model.predict(X_train_scaled)
        test_pred = model.predict(X_test_scaled)
        
        train_acc = accuracy_score(y_train, train_pred)
        test_acc = accuracy_score(y_test, test_pred)
        
        model_accuracies[model_name] = {
            'train_accuracy': train_acc,
            'test_accuracy': test_acc
        }
        
        print(f"  Train Accuracy: {train_acc*100:.2f}%")
        print(f"  Test Accuracy: {test_acc*100:.2f}%")
        
        # Save model
        model_filename = f"models/{model_name.lower().replace(' ', '_')}.pkl"
        joblib.dump(model, model_filename)
        print(f"  ✓ Saved: {model_filename}")
    
    # Save scaler
    joblib.dump(scaler, 'models/scaler.pkl')
    print(f"\n✓ Saved scaler: models/scaler.pkl")
    
    # Save accuracies
    joblib.dump(model_accuracies, 'models/model_accuracies.pkl')
    print(f"✓ Saved accuracies: models/model_accuracies.pkl")
    
    return model_accuracies

if __name__ == "__main__":
    print("\n" + "="*50)
    print("IRIS CLASSIFICATION - MULTI-MODEL TRAINING")
    print("="*50)
    
    # Load data
    train_df, test_df = load_data()
    
    # Train models
    accuracies = train_all_models(train_df, test_df)
    
    print("\n" + "="*50)
    print("TRAINING COMPLETE!")
    print("="*50)
    print("\nModel Summary:")
    for model_name, acc in accuracies.items():
        print(f"  {model_name}: {acc['test_accuracy']*100:.2f}% test accuracy")
    
    print("\nAll models saved in 'models/' directory")
    print("Ready to run Flask application!")
    print("="*50 + "\n")
