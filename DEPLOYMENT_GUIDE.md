# Deployment Guide for Portfolio with RAG Integration

This guide covers deploying your Next.js portfolio with the Python RAG backend.

## Table of Contents
1. [Environment Variables Setup](#environment-variables-setup)
2. [Option 1: Deploy on Vercel (Frontend) + Render/Railway (Backend)](#option-1-vercel--render-recommended)
3. [Option 2: Deploy Everything on a VPS](#option-2-deploy-on-vps)
4. [Option 3: Deploy on Railway (Full Stack)](#option-3-deploy-on-railway-full-stack)

---

## Environment Variables Setup

### Required Environment Variables

#### For Next.js (Frontend):
Create a `.env.local` file (or set in your hosting platform):
```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# RAG Backend URL (will be different in production)
RAG_BACKEND_URL=https://your-rag-backend-url.com

# Email Configuration (for contact form)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Optional: Vapi AI (for voice agent)
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_key_if_needed
```

#### For Python RAG Backend:
Create a `RAG/.env` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

---

## Option 1: Vercel + Render (Recommended)

### Part A: Deploy Frontend on Vercel

**Step 1: Prepare Your Repository**
```bash
# Make sure your code is pushed to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
```

**Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

**Step 3: Add Environment Variables in Vercel**
Go to Project Settings → Environment Variables and add:
- `MONGODB_URI`
- `RAG_BACKEND_URL` (add this after deploying backend)
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- Any other variables you need

**Step 4: Deploy**
Click "Deploy" and wait for the build to complete.

### Part B: Deploy RAG Backend on Render

**Step 1: Create render.yaml**
Create this file in your `RAG/` directory:

```yaml
services:
  - type: web
    name: portfolio-rag-backend
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: GEMINI_API_KEY
        sync: false
      - key: ALLOWED_ORIGINS
        value: https://your-vercel-domain.vercel.app
```

**Step 2: Deploy on Render**
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: portfolio-rag-backend
   - **Root Directory**: `RAG`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Step 3: Add Environment Variables**
In Render dashboard, add:
- `GEMINI_API_KEY`
- `ALLOWED_ORIGINS` (your Vercel frontend URL)

**Step 4: Update Vercel Environment Variables**
Go back to Vercel and update `RAG_BACKEND_URL` with your Render backend URL:
```
https://portfolio-rag-backend.onrender.com
```

Then redeploy your Vercel app.

---

## Option 2: Deploy on VPS

If you want full control, deploy on a VPS (DigitalOcean, Linode, AWS EC2, etc.).

### Step 1: Set Up Server
```bash
# SSH into your server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python
sudo apt install -y python3 python3-pip python3-venv

# Install Nginx
sudo apt install -y nginx

# Install PM2 for process management
sudo npm install -g pm2
```

### Step 2: Clone and Setup Your Project
```bash
# Clone your repository
git clone https://github.com/yourusername/bikram-dot-dev.git
cd bikram-dot-dev

# Setup Next.js
npm install
npm run build

# Setup RAG Backend
cd RAG
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

### Step 3: Create Environment Files
```bash
# Create .env.local for Next.js
nano .env.local
# Add your environment variables

# Create RAG/.env
nano RAG/.env
# Add your GEMINI_API_KEY
```

### Step 4: Start Services with PM2
```bash
# Start Next.js
pm2 start npm --name "portfolio-frontend" -- start

# Start RAG Backend
cd RAG
pm2 start "venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000" --name "rag-backend"
cd ..

# Save PM2 configuration
pm2 save
pm2 startup
```

### Step 5: Configure Nginx as Reverse Proxy
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Add this configuration:
```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# RAG Backend
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Setup SSL with Let's Encrypt
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

---

## Option 3: Deploy on Railway (Full Stack)

Railway can host both your Next.js app and Python backend.

### Step 1: Prepare Railway Configuration

Create `railway.toml` in your project root:
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm start"
healthcheckPath = "/"
restartPolicyType = "ON_FAILURE"
```

Create `RAG/railway.toml`:
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
healthcheckPath = "/health"
restartPolicyType = "ON_FAILURE"
```

### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository

**For Frontend:**
- Railway will auto-detect Next.js
- Add environment variables in Railway dashboard
- Deploy

**For Backend:**
- Create a new service in the same project
- Set root directory to `RAG`
- Add environment variables
- Deploy

---

## Post-Deployment Checklist

### 1. Database Setup
- [ ] MongoDB Atlas cluster created and connection string added
- [ ] Database user credentials configured
- [ ] IP whitelist configured (0.0.0.0/0 for cloud deployments)

### 2. RAG Backend
- [ ] PDFs uploaded to production backend
- [ ] ChromaDB initialized with documents
- [ ] Gemini API key configured
- [ ] CORS origins configured correctly

### 3. Frontend
- [ ] Environment variables set
- [ ] RAG_BACKEND_URL points to production backend
- [ ] Email service configured
- [ ] All API routes tested

### 4. Testing
- [ ] Test chat widget with RAG queries
- [ ] Test contact form email sending
- [ ] Test testimonials CRUD operations
- [ ] Check all pages load correctly
- [ ] Test on mobile devices

### 5. Performance & Security
- [ ] Enable caching in Next.js
- [ ] Set up CDN (Vercel does this automatically)
- [ ] Configure rate limiting on API routes
- [ ] Add security headers
- [ ] Monitor error logs

---

## Updating RAG Documents in Production

### If deployed on Render/Railway:
1. Connect to your backend service terminal
2. Upload PDFs to the `pdfs/` directory
3. Run the ingest script:
```bash
python app/ingest.py
```

### If deployed on VPS:
```bash
ssh user@your-server
cd bikram-dot-dev/RAG
# Upload your PDFs
python app/ingest.py
pm2 restart rag-backend
```

---

## Troubleshooting

### Frontend can't connect to backend
- Check `RAG_BACKEND_URL` environment variable
- Verify CORS settings in backend allow your frontend domain
- Check backend health endpoint: `https://your-backend-url/health`

### RAG queries returning empty responses
- Verify documents are ingested: Check ChromaDB has collections
- Check Gemini API key is valid
- Look at backend logs for errors

### MongoDB connection issues
- Verify connection string format
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Build failures
- Clear build cache and rebuild
- Check all dependencies are in package.json
- Verify Node.js version compatibility (18+)

---

## Monitoring & Maintenance

### Recommended Tools
- **Vercel/Render/Railway**: Built-in monitoring dashboards
- **MongoDB Atlas**: Database monitoring
- **Sentry**: Error tracking (optional)
- **Google Analytics**: Usage analytics

### Regular Maintenance
- Monitor API usage (Gemini, MongoDB)
- Check disk space for ChromaDB
- Update dependencies regularly
- Backup MongoDB database
- Review error logs weekly

---

## Need Help?

- Next.js Deployment: https://nextjs.org/docs/deployment
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app

---

## Quick Start Commands Reference

```bash
# Local Development
npm run dev                          # Start Next.js dev server
cd RAG && uvicorn app.main:app --reload  # Start RAG backend

# Production Build Test
npm run build && npm start           # Test production build locally

# Deploy to Vercel (with CLI)
npm i -g vercel
vercel --prod

# Check logs on VPS
pm2 logs portfolio-frontend
pm2 logs rag-backend
```

Good luck with your deployment! 🚀
