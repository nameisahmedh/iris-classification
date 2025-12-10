# 🌸 Iris Flower Classification

A modern, responsive web application for classifying iris flowers using machine learning. Built with Flask, scikit-learn, and featuring a premium UI with smooth animations and gradients.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.0+-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🌟 Features

- **5 Machine Learning Models**: Choose from Random Forest, SVM, Decision Tree, K-Nearest Neighbors, or Naive Bayes
- **Interactive UI**: Clean, modern interface with split-screen design
- **Real-time Predictions**: Get instant species identification with confidence scores
- **Informative Homepage**: Learn about iris species and classification
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Premium Design**: Smooth animations, gradients, and interactive effects

## 📸 Screenshots

### Home Page
Beautiful landing page with information about iris classification and the three species.

### Prediction Interface
Split-screen design with form inputs on the left and real-time results on the right.

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/iris-classification.git
cd iris-classification
```

2. **Create a virtual environment** (recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Train the models**
```bash
python train_model.py
```
This will create a `models/` directory with all trained models and scalers.

5. **Run the application**
```bash
python iris.py
```

6. **Open your browser**
Navigate to `http://127.0.0.1:5000`

## 📁 Project Structure

```
iris-classification/
├── iris.py                 # Flask application
├── train_model.py          # ML model training script
├── requirements.txt        # Python dependencies
├── iris_train_data.csv     # Training dataset (121 samples)
├── iris_test_data.csv      # Test dataset (30 samples)
├── templates/
│   ├── home.html          # Landing page
│   └── predict.html       # Prediction interface
├── static/
│   ├── style.css          # Main styles
│   ├── premium.css        # Premium UI enhancements
│   └── script.js          # Frontend JavaScript
└── models/                # Generated ML models (gitignored)
    ├── random_forest.pkl
    ├── svm.pkl
    ├── decision_tree.pkl
    ├── k-nearest_neighbors.pkl
    ├── naive_bayes.pkl
    ├── scaler.pkl
    └── model_accuracies.pkl
```

## 🤖 Machine Learning Models

The application includes 5 different classification algorithms:

| Model | Test Accuracy | Best For |
|-------|---------------|----------|
| **SVM** | ~100% | High accuracy needed |
| **Random Forest** | ~96.7% | Balanced performance |
| **K-Nearest Neighbors** | ~93% | Quick predictions |
| **Naive Bayes** | ~93% | Probabilistic insights |
| **Decision Tree** | ~90% | Interpretability |

## 🎨 UI Features

- **Gradient Backgrounds**: Smooth color transitions
- **Floating Animations**: Icons gently float for visual interest
- **Hover Effects**: Cards lift and transform on interaction
- **Gradient Text**: Titles with color gradients
- **Smooth Transitions**: All interactions use ease curves
- **Responsive Grid**: Adapts to any screen size

## 📊 Input Features

The model requires four measurements (in centimeters):

1. **Sepal Length**: Length of the sepal
2. **Sepal Width**: Width of the sepal  
3. **Petal Length**: Length of the petal
4. **Petal Width**: Width of the petal

## 🌺 Iris Species

The application classifies three species:

- **Iris Setosa** 🌸: Characterized by smaller petals and wider sepals
- **Iris Versicolor** 🌺: Medium-sized flowers with balanced proportions
- **Iris Virginica** 🌼: Largest flowers with long petals and sepals

## 🛠️ Technology Stack

- **Backend**: Flask (Python web framework)
- **ML**: scikit-learn (Random Forest, SVM, Decision Tree, KNN, Naive Bayes)
- **Frontend**: HTML5, CSS3, JavaScript
- **Data Processing**: pandas, numpy
- **Styling**: Custom CSS with animations and gradients

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1024px
- **Desktop**: 1025px+

## 🔧 API Endpoints

### GET `/`
Returns the home page

### GET `/predict-page`
Returns the prediction interface

### POST `/predict`
Makes a prediction

**Request Body:**
```json
{
  "sepal_length": 5.1,
  "sepal_width": 3.5,
  "petal_length": 1.4,
  "petal_width": 0.2,
  "model": "Random Forest"
}
```

**Response:**
```json
{
  "prediction": "Iris-setosa",
  "species": "Setosa",
  "confidence": {
    "Setosa": 1.0,
    "Versicolor": 0.0,
    "Virginica": 0.0
  },
  "confidence_percentage": 100.0,
  "model_accuracy": 96.67,
  "model_name": "Random Forest"
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Your Name**
- GitHub: [@nameisahmedh](https://github.com/nameisahmedh)

## 🙏 Acknowledgments

- Dataset from the classic [Iris flower dataset](https://archive.ics.uci.edu/ml/datasets/iris)
- Built with Flask and scikit-learn
- UI design inspired by modern web design principles

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ and Python
