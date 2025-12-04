// Iris Classification - Split-Screen UI with Rotating Examples

// Expanded example data with more variations
const examples = {
    setosa: [
        { sepal_length: 5.1, sepal_width: 3.5, petal_length: 1.4, petal_width: 0.2 },
        { sepal_length: 4.9, sepal_width: 3.0, petal_length: 1.4, petal_width: 0.2 },
        { sepal_length: 5.4, sepal_width: 3.9, petal_length: 1.7, petal_width: 0.4 },
        { sepal_length: 5.0, sepal_width: 3.6, petal_length: 1.4, petal_width: 0.2 }
    ],
    versicolor: [
        { sepal_length: 6.0, sepal_width: 2.9, petal_length: 4.5, petal_width: 1.5 },
        { sepal_length: 5.7, sepal_width: 2.8, petal_length: 4.5, petal_width: 1.3 },
        { sepal_length: 6.3, sepal_width: 3.3, petal_length: 4.7, petal_width: 1.6 },
        { sepal_length: 5.6, sepal_width: 3.0, petal_length: 4.5, petal_width: 1.5 }
    ],
    virginica: [
        { sepal_length: 6.5, sepal_width: 3.0, petal_length: 5.8, petal_width: 2.2 },
        { sepal_length: 7.7, sepal_width: 3.8, petal_length: 6.7, petal_width: 2.2 },
        { sepal_length: 6.7, sepal_width: 3.3, petal_length: 5.7, petal_width: 2.5 },
        { sepal_length: 6.9, sepal_width: 3.1, petal_length: 5.4, petal_width: 2.1 }
    ]
};

// Species emoji mapping
const speciesEmoji = {
    'Setosa': '🌸',
    'Versicolor': '🌺',
    'Virginica': '🌼'
};

// DOM Elements
const form = document.getElementById('predictionForm');
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const errorText = document.getElementById('errorText');
const welcomeState = document.getElementById('welcomeState');
const randomExampleBtn = document.getElementById('randomExampleBtn');

// Get random example from all species
function getRandomExample() {
    const species = ['setosa', 'versicolor', 'virginica'];
    const randomSpecies = species[Math.floor(Math.random() * species.length)];
    const speciesExamples = examples[randomSpecies];
    const randomExample = speciesExamples[Math.floor(Math.random() * speciesExamples.length)];
    return randomExample;
}

// Fill form with data
function fillForm(data) {
    document.getElementById('sepal_length').value = data.sepal_length;
    document.getElementById('sepal_width').value = data.sepal_width;
    document.getElementById('petal_length').value = data.petal_length;
    document.getElementById('petal_width').value = data.petal_width;
}

// Hide all states
function hideAllStates() {
    resultsDiv.classList.add('hidden');
    loadingDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    welcomeState.classList.add('hidden');
}

// Show error message
function showError(message) {
    hideAllStates();
    errorText.textContent = message;
    errorDiv.classList.remove('hidden');
    
    setTimeout(() => {
        errorDiv.classList.add('hidden');
        welcomeState.classList.remove('hidden');
    }, 5000);
}

// Show loading state
function showLoading() {
    hideAllStates();
    loadingDiv.classList.remove('hidden');
}

// Display prediction results
function showResults(data) {
    hideAllStates();
    
    // Update species name
    const speciesNameDiv = document.getElementById('speciesName');
    const species = data.species;
    speciesNameDiv.textContent = `Iris ${species}`;
    
    // Update species icon
    const speciesIcon = document.getElementById('speciesIcon');
    speciesIcon.textContent = speciesEmoji[species] || '🌸';
    
    // Update model used
    const modelUsedDiv = document.getElementById('modelUsed');
    modelUsedDiv.textContent = data.model_name;
    
    // Update model accuracy
    const modelAccuracyDiv = document.getElementById('modelAccuracy');
    modelAccuracyDiv.textContent = `${data.model_accuracy.toFixed(2)}%`;
    
    // Update prediction confidence
    const predictionConfidenceDiv = document.getElementById('predictionConfidence');
    const confidence = data.confidence_percentage;
    predictionConfidenceDiv.textContent = `${confidence.toFixed(2)}%`;
    
    // Update confidence badge
    const confidenceBadge = document.getElementById('confidenceBadge');
    if (confidence >= 80) {
        confidenceBadge.textContent = 'High Confidence';
        confidenceBadge.style.backgroundColor = '#2e7d32';
    } else if (confidence >= 60) {
        confidenceBadge.textContent = 'Medium Confidence';
        confidenceBadge.style.backgroundColor = '#f57c00';
    } else {
        confidenceBadge.textContent = 'Low Confidence';
        confidenceBadge.style.backgroundColor = '#d32f2f';
    }
    
    // Update confidence breakdown
    const confidenceBreakdown = document.getElementById('confidenceBreakdown');
    confidenceBreakdown.innerHTML = '';
    
    // Sort confidence scores in descending order
    const sortedConfidence = Object.entries(data.confidence)
        .sort((a, b) => b[1] - a[1]);
    
    sortedConfidence.forEach(([species, confidence]) => {
        const percentage = (confidence * 100).toFixed(2);
        
        const confidenceItem = document.createElement('div');
        confidenceItem.className = 'confidence-item';
        
        confidenceItem.innerHTML = `
            <span class="confidence-label">${speciesEmoji[species] || '🌸'} Iris ${species}</span>
            <span class="confidence-value">${percentage}%</span>
        `;
        
        confidenceBreakdown.appendChild(confidenceItem);
    });
    
    // Show results
    resultsDiv.classList.remove('hidden');
}

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get selected model
    const modelSelect = document.getElementById('model_select');
    if (!modelSelect.value) {
        showError('Please select a model');
        return;
    }
    
    // Get form data
    const formData = {
        sepal_length: parseFloat(document.getElementById('sepal_length').value),
        sepal_width: parseFloat(document.getElementById('sepal_width').value),
        petal_length: parseFloat(document.getElementById('petal_length').value),
        petal_width: parseFloat(document.getElementById('petal_width').value),
        model: modelSelect.value
    };
    
    // Validate input
    for (const [key, value] of Object.entries(formData)) {
        if (key === 'model') continue;
        if (isNaN(value) || value < 0 || value > 10) {
            showError(`Invalid value for ${key.replace('_', ' ')}. Please enter a number between 0 and 10.`);
            return;
        }
    }
    
    // Show loading state
    showLoading();
    
    try {
        // Make prediction request
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Show results
            showResults(data);
        } else {
            // Show error from server
            showError(data.error || 'Prediction failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Network error. Please check your connection and try again.');
    }
});

// Handle random example button
randomExampleBtn.addEventListener('click', () => {
    const randomData = getRandomExample();
    fillForm(randomData);
    
    // Visual feedback
    randomExampleBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        randomExampleBtn.style.transform = '';
    }, 150);
});

// Auto-load a random example on page load
window.addEventListener('load', () => {
    const randomData = getRandomExample();
    fillForm(randomData);
});

console.log('🌸 Iris Classification - Split Screen UI Ready');
