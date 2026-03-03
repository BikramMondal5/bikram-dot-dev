# Pre-Deployment Checklist

## Before You Deploy

### 1. Environment Setup
- [ ] Copy `.env.local.example` to `.env.local` and fill in values
- [ ] Copy `RAG/.env.example` to `RAG/.env` and add your Gemini API key
- [ ] Set up MongoDB Atlas account and get connection string
- [ ] Get Google Gemini API key from https://makersuite.google.com/app/apikey

### 2. Database Setup
- [ ] Create MongoDB Atlas cluster
- [ ] Create database user with read/write permissions
- [ ] Whitelist IP addresses (use 0.0.0.0/0 for cloud deployments)
- [ ] Test connection locally

### 3. RAG Backend Preparation
- [ ] Add your PDF documents to `RAG/pdfs/` directory
- [ ] Test RAG backend locally: `cd RAG && uvicorn app.main:app --reload`
- [ ] Run ingest script: `python app/ingest.py`
- [ ] Test queries at http://localhost:8000

### 4. Frontend Testing
- [ ] Test build locally: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Verify all API routes work
- [ ] Test ChatWidget with RAG queries
- [ ] Test contact form email sending
- [ ] Test testimonials features

### 5. Code Repository
- [ ] Push all code to GitHub
- [ ] Add `.env.local` and `RAG/.env` to `.gitignore` (they should already be ignored)
- [ ] Verify sensitive data is not in git history
- [ ] Create a deployment branch if needed

---

## Deployment Steps (Choose One)

### Option A: Vercel + Render (Easiest)
1. [ ] Deploy backend to Render
   - Sign up at render.com
   - Create new Web Service
   - Connect GitHub repo, set root directory to `RAG`
   - Add environment variables: `GEMINI_API_KEY`, `ALLOWED_ORIGINS`
   - Wait for deployment
   - Note the backend URL

2. [ ] Deploy frontend to Vercel
   - Sign up at vercel.com
   - Import GitHub repository
   - Add environment variables including `RAG_BACKEND_URL`
   - Deploy

3. [ ] Update CORS settings
   - Update `ALLOWED_ORIGINS` in Render with Vercel URL
   - Redeploy backend

### Option B: Railway (Full Stack)
1. [ ] Deploy both services to Railway
   - Create new project
   - Add two services from same repo
   - Configure root directories
   - Set environment variables
   - Deploy

### Option C: VPS (Most Control)
1. [ ] Set up server (DigitalOcean, Linode, etc.)
2. [ ] Install dependencies (Node.js, Python, Nginx)
3. [ ] Clone repository
4. [ ] Configure environment variables
5. [ ] Set up PM2 for process management
6. [ ] Configure Nginx reverse proxy
7. [ ] Set up SSL with Let's Encrypt

---

## Post-Deployment

### 1. Verify Deployment
- [ ] Frontend loads without errors
- [ ] All pages render correctly
- [ ] ChatWidget connects to RAG backend
- [ ] RAG queries return relevant answers
- [ ] Contact form sends emails
- [ ] Testimonials CRUD operations work
- [ ] Mobile responsiveness works

### 2. Performance Check
- [ ] Run Lighthouse audit
- [ ] Check page load times
- [ ] Verify images are optimized
- [ ] Test on different devices and browsers

### 3. Security
- [ ] HTTPS is enabled
- [ ] Environment variables are secure
- [ ] MongoDB has proper access controls
- [ ] API rate limiting is configured (optional)
- [ ] CORS is properly configured

### 4. Monitoring Setup
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Enable analytics (Google Analytics, etc.)
- [ ] Monitor API usage (Gemini, MongoDB)
- [ ] Set up uptime monitoring

### 5. Documentation
- [ ] Update README with deployment info
- [ ] Document environment variables
- [ ] Add troubleshooting guide
- [ ] Create runbook for updates

---

## Common Issues & Solutions

### Frontend can't reach backend
- Check `RAG_BACKEND_URL` environment variable
- Verify CORS allows your frontend domain
- Check backend health: visit `https://your-backend/health`

### RAG returns empty responses
- Verify PDFs are ingested in production
- Check Gemini API key is valid
- Review backend logs for errors

### Build fails
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json

### MongoDB connection fails
- Check connection string format
- Verify IP whitelist includes deployment IPs
- Test connection with MongoDB Compass

---

## Updating After Deployment

### Update Frontend
```bash
git add .
git commit -m "Update frontend"
git push origin main
# Vercel/Railway will auto-deploy
```

### Update Backend
```bash
git add .
git commit -m "Update backend"
git push origin main
# Render/Railway will auto-deploy
```

### Update RAG Documents
1. Access backend terminal (Render/Railway dashboard or VPS SSH)
2. Upload new PDFs to `pdfs/` directory
3. Run: `python app/ingest.py`
4. Restart backend service

---

## Quick Commands

```bash
# Test locally
npm run dev                                    # Frontend
cd RAG && uvicorn app.main:app --reload       # Backend

# Build for production
npm run build && npm start

# Deploy with Vercel CLI
vercel --prod

# Check PM2 status (VPS)
pm2 status
pm2 logs portfolio-frontend
pm2 restart all
```

---

## Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

Good luck! 🚀
