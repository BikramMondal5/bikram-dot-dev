# 🚀 Quick Deployment Guide (Vercel + Render)

This is the fastest way to deploy your portfolio. Total time: ~15 minutes.

---

## Prerequisites (5 minutes)

1. **GitHub Account** - Sign up at [github.com](https://github.com)
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) with GitHub
3. **Render Account** - Sign up at [render.com](https://render.com) with GitHub
4. **MongoDB Atlas** - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
5. **Gemini API Key** - Get from [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

---

## Step 1: MongoDB Setup (3 minutes)

1. Log into MongoDB Atlas
2. Click **"Build a Database"** → Select **FREE** tier
3. Choose a cloud provider and region (AWS, US East recommended)
4. Create a database user:
   - Username: `portfolio_user`
   - Password: Generate a secure password (save it!)
5. Click **"Network Access"** → **"Add IP Address"** → **"Allow Access from Anywhere"** (0.0.0.0/0)
6. Click **"Database"** → **"Connect"** → **"Connect your application"**
7. Copy the connection string (looks like: `mongodb+srv://portfolio_user:password@cluster0.xxxxx.mongodb.net/`)
8. Replace `<password>` with your actual password

---

## Step 2: Push Code to GitHub (2 minutes)

```bash
# If not already initialized
git init
git add .
git commit -m "Initial commit - ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend to Render (5 minutes)

1. Go to [render.com](https://render.com) and log in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in the details:
   - **Name**: `portfolio-rag-backend` (or any name you like)
   - **Region**: Choose closest to your users
   - **Root Directory**: `RAG`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Click **"Advanced"** → Add environment variables:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - Click **"Add Environment Variable"**
   - **Key**: `ALLOWED_ORIGINS`
   - **Value**: `https://your-app-name.vercel.app` (we'll update this later)
6. Select **"Free"** instance type
7. Click **"Create Web Service"**
8. Wait for deployment (~3 minutes)
9. **Copy the URL** shown at the top (e.g., `https://portfolio-rag-backend.onrender.com`)

### Test Your Backend:
Visit: `https://YOUR-BACKEND-URL.onrender.com/health`
You should see: `{"status":"healthy","service":"RAG Backend","version":"1.0.0"}`

---

## Step 4: Deploy Frontend to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js - keep default settings
5. Click **"Environment Variables"** and add:

   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB connection string from Step 1 |
   | `RAG_BACKEND_URL` | Your Render backend URL from Step 3 |
   | `EMAIL_USER` | Your Gmail address (for contact form) |
   | `EMAIL_PASSWORD` | Gmail App Password* |

   *To get Gmail App Password:
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Search for "App Passwords"
   - Create new app password for "Mail"

6. Click **"Deploy"**
7. Wait for deployment (~2 minutes)
8. **Copy your Vercel URL** (e.g., `https://your-app-name.vercel.app`)

---

## Step 5: Update CORS Settings (1 minute)

1. Go back to **Render Dashboard**
2. Open your backend service
3. Click **"Environment"** in the left sidebar
4. Update `ALLOWED_ORIGINS` value to your Vercel URL:
   ```
   https://your-app-name.vercel.app
   ```
5. Click **"Save Changes"**
6. Service will automatically redeploy

---

## Step 6: Verify Everything Works ✅

### Test Your Deployment:

1. **Frontend Homepage**: Visit your Vercel URL
   - Should load without errors ✓
   - All sections should render ✓

2. **Backend Health**: Visit `https://YOUR-BACKEND-URL/health`
   - Should return JSON with status "healthy" ✓

3. **Chat Widget**: 
   - Open chat widget on your site
   - Ask a question about your portfolio
   - Should get RAG-powered response ✓

4. **Contact Form**:
   - Fill out and submit contact form
   - Check your email for the message ✓

---

## Troubleshooting

### "Network error" in chat widget
- Check `RAG_BACKEND_URL` in Vercel environment variables
- Verify backend is running: visit `/health` endpoint
- Check `ALLOWED_ORIGINS` in Render includes your Vercel URL

### RAG returns generic responses
**Cause**: Your PDFs aren't ingested yet in production

**Solution**: 
1. Go to Render Dashboard → Your service
2. Click **"Shell"** tab
3. Run these commands:
   ```bash
   cd pdfs
   # Your PDFs should be here - if not, you need to add them
   ls
   cd ..
   python app/ingest.py
   ```

### MongoDB connection error
- Double-check connection string format
- Verify password doesn't have special characters (or is URL-encoded)
- Confirm IP whitelist includes 0.0.0.0/0

### Email not sending
- Verify Gmail App Password (not your regular password)
- Check 2-Step Verification is enabled
- Try generating a new App Password

---

## Adding PDFs to Production

Your RAG backend needs PDFs to answer questions. Here's how to add them:

### Option 1: Include in Git (Recommended for small files)
```bash
# Add PDFs to RAG/pdfs/ directory
cp your-resume.pdf RAG/pdfs/
cp your-portfolio.pdf RAG/pdfs/

# Commit and push
git add RAG/pdfs/
git commit -m "Add PDF documents"
git push

# Render will auto-deploy with new PDFs
# Then run ingest via Shell:
# python app/ingest.py
```

### Option 2: Manual Upload via Render Shell
1. Render Dashboard → Your service → **Shell**
2. Upload files using the upload button
3. Run: `python app/ingest.py`

---

## Next Steps

### Custom Domain (Optional)
- **Vercel**: Settings → Domains → Add your domain
- **Render**: Settings → Custom Domains → Add subdomain for API

### Performance Optimization
- Enable Vercel Analytics
- Set up error monitoring (Sentry)
- Configure caching headers

### Monitoring
- Render: Built-in logs and metrics
- Vercel: Deployment and function logs
- MongoDB Atlas: Database monitoring

---

## Costs

All services have generous free tiers:

| Service | Free Tier | Paid Plans Start At |
|---------|-----------|---------------------|
| Vercel | 100GB bandwidth/month | $20/month |
| Render | 750 hours/month | $7/month |
| MongoDB Atlas | 512MB storage | $9/month |
| Gemini API | 60 requests/minute | Pay-as-you-go |

**Estimated monthly cost for low-traffic site**: $0 (stays in free tier)

---

## Update Your Deployment

### Update Frontend:
```bash
git add .
git commit -m "Update message"
git push
# Vercel auto-deploys from GitHub
```

### Update Backend:
```bash
git add .
git commit -m "Update message"
git push
# Render auto-deploys from GitHub
```

### Update Environment Variables:
- **Vercel**: Settings → Environment Variables
- **Render**: Environment tab

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎉 Congratulations!

Your portfolio is now live! Share your URL:
- `https://your-app-name.vercel.app`

**What's working:**
- ✅ Next.js frontend with all components
- ✅ RAG-powered AI chat
- ✅ Contact form with email
- ✅ Testimonials system
- ✅ MongoDB database
- ✅ Production-ready infrastructure

Time to show it off! 🚀
