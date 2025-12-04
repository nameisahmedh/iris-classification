# Deployment Guide for Iris Classification App

This guide will help you deploy your Iris Classification Flask app to Render (free hosting).

## Prerequisites
- ✅ GitHub repository already set up
- ✅ Code pushed to GitHub
- ✅ Deployment files created

## Option 1: Deploy to Render (Recommended - FREE)

### Step 1: Create Render Account
1. Go to [https://render.com](https://render.com)
2. Click "Get Started" or "Sign Up"
3. Sign up with your **GitHub account** (easiest option)

### Step 2: Create New Web Service
1. Once logged in, click **"New +"** button in the top right
2. Select **"Web Service"**
3. Click **"Connect GitHub"** if not already connected
4. Find and select your repository: `iris-classification`

### Step 3: Configure the Service
Render will auto-detect your `render.yaml` file, but verify these settings:

- **Name**: `iris-classification` (or your preferred name)
- **Environment**: `Python`
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn iris:app`
- **Plan**: Select **"Free"**

### Step 4: Deploy!
1. Click **"Create Web Service"**
2. Render will start building and deploying your app
3. This may take 5-10 minutes (it needs to train the ML models)
4. Watch the logs to track progress

### Step 5: Access Your App
Once deployment is complete, you'll get a URL like:
- `https://iris-classification-xxxx.onrender.com`

Your app is now live! 🎉

## Option 2: Deploy to Railway (Alternative - FREE)

### Step 1: Create Railway Account
1. Go to [https://railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub

### Step 2: Deploy
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `iris-classification` repository
4. Railway will auto-detect it's a Python app
5. Add these environment variables:
   - `PYTHON_VERSION`: `3.11.0`
6. Click "Deploy"

### Step 3: Configure Build
In Railway settings:
- **Build Command**: `pip install -r requirements.txt && python train_model.py`
- **Start Command**: `gunicorn iris:app`

Your app will be deployed at a Railway URL!

## Important Notes

### First Deployment
- ⏰ First deployment takes longer (5-10 minutes) because it trains the ML models
- 📊 Models are trained during the build process automatically
- 🔄 Subsequent deployments are faster

### Free Tier Limitations
**Render Free Tier:**
- App goes to sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (cold start)
- 750 hours/month free (enough for demos)

**Railway Free Tier:**
- $5 credit per month
- No sleep mode
- Better for testing

### Keeping Your App Awake (Optional)
If you want to prevent Render from sleeping:
1. Use a service like [UptimeRobot](https://uptimerobot.com)
2. Ping your app every 10 minutes

## Troubleshooting

### Build Fails
- Check the logs in Render/Railway dashboard
- Ensure `requirements.txt` has all dependencies
- Verify Python version compatibility

### Models Not Loading
- Make sure `build.sh` runs `train_model.py`
- Check that training data CSV files are in the repository

### App Returns 502/503
- App is cold starting (wait 30 seconds)
- Check logs for errors

## Updating Your Deployed App

After making changes locally:
```bash
git add .
git commit -m "Your update message"
git push
```

Render/Railway will automatically detect the push and redeploy! 🚀

## Custom Domain (Optional)

Both Render and Railway allow you to add a custom domain:
1. Go to your service settings
2. Add your custom domain
3. Update your domain's DNS records as instructed

---

**Need Help?** 
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
