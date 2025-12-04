# Git Setup Instructions

Follow these steps to initialize and push to GitHub:

## 1. Initialize Git Repository

```bash
cd c:\Users\Ahmed\OneDrive\Desktop\Iris_classification
git init
```

## 2. Add All Files

```bash
git add .
```

## 3. Create Initial Commit

```bash
git commit -m "Initial commit: Iris Classification Web App with ML models"
```

## 4. Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `iris-classification`
3. Do NOT initialize with README (we already have one)

## 5. Link Local Repository to GitHub

Replace `yourusername` with your actual GitHub username:

```bash
git remote add origin https://github.com/yourusername/iris-classification.git
git branch -M main
git push -u origin main
```

## 6. Future Updates

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

## Important Notes

- The `.gitignore` file prevents uploading of:
  - Generated models (`models/` directory)
  - Python cache files
  - Virtual environment (`iris_env/`)
  - IDE configuration files

- Users who clone your repo will need to run:
  ```bash
  pip install -r requirements.txt
  python train_model.py
  ```

## Optional: Add Screenshots

To make your README more attractive, you can add screenshots:

1. Take screenshots of your app
2. Create a `screenshots/` folder
3. Add images to the folder
4. Update README.md to include them

---

**Your project is now ready for GitHub! 🚀**
