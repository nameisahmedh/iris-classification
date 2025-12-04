#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Train the models if they don't exist
python train_model.py
