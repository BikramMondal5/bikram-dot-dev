# 🚀 Portfolio Website with RAG Integration

A modern, interactive portfolio website built with Next.js, featuring an AI-powered chatbot using Retrieval Augmented Generation (RAG) with Google's Gemini AI.

## ✨ Features

- **Interactive Hero Section** with 3D animations
- **RAG-Powered AI Chat** - Ask questions about the portfolio, powered by your own documents
- **Contact Form** with email integration
- **Testimonials System** with CRUD operations
- **Project Showcase** with detailed cards
- **Certificates Section** with visual displays
- **Responsive Design** - Works on all devices
- **Dark Mode** support

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D graphics
- **Radix UI** - UI components

### Backend
- **FastAPI** (Python) - RAG backend
- **MongoDB** - Database
- **ChromaDB** - Vector database
- **Google Gemini AI** - Language model
- **Nodemailer** - Email sending

## 📦 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ChatWidget.tsx     # RAG-powered chat
│   ├── HeroSection.tsx    # Landing section
│   └── ui/                # Reusable UI components
├── RAG/                   # Python RAG backend
│   ├── app/               # FastAPI application
│   ├── pdfs/              # Documents for RAG
│   └── db/                # ChromaDB storage
└── lib/                   # Utilities and database
```

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB Atlas account
- Google Gemini API key

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/bikram-dot-dev.git
cd bikram-dot-dev
npm install
```

### 2. Setup Environment Variables

Create `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string
RAG_BACKEND_URL=http://localhost:8000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

Create `RAG/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key
ALLOWED_ORIGINS=http://localhost:3000
```

### 3. Setup RAG Backend

```bash
cd RAG
pip install -r requirements.txt

# Add your PDFs to RAG/pdfs/ directory
# Then ingest them:
python app/ingest.py

# Start backend
uvicorn app.main:app --reload
```

### 4. Start Frontend

```bash
# In project root
npm run dev
```

Visit `http://localhost:3000`

## 📚 Deployment

See detailed deployment guides:

- **[🚀 QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - Fastest way to deploy (Vercel + Render) - **Start here!**
- **[📖 DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Comprehensive guide with all options
- **[✅ DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist

### Quick Deploy Summary

1. **Backend** → Deploy to [Render](https://render.com) (Free tier)
2. **Frontend** → Deploy to [Vercel](https://vercel.com) (Free tier)
3. **Database** → [MongoDB Atlas](https://mongodb.com/cloud/atlas) (Free tier)

Total time: ~15 minutes | Total cost: $0 (free tiers)

## 📝 Documentation

- **[RAG_INTEGRATION_GUIDE.md](RAG_INTEGRATION_GUIDE.md)** - How the RAG system works
- **Configuration files**:
  - `.env.local.example` - Frontend environment variables template
  - `RAG/.env.example` - Backend environment variables template
  - `render.yaml` - Render deployment config
  - `vercel.json` - Vercel deployment config

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start Next.js dev server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint

# RAG Backend
cd RAG
uvicorn app.main:app --reload      # Start dev server
python app/ingest.py               # Ingest PDFs
python clear_db.py                 # Clear vector database
```

## 🌟 Key Features Explained

### RAG-Powered Chat
The chatbot uses Retrieval Augmented Generation to answer questions based on your documents:
1. User asks a question
2. System retrieves relevant document chunks from ChromaDB
3. Gemini AI generates response using retrieved context
4. Response is displayed in chat interface

### Contact Form
- Sends emails using Nodemailer
- SMTP configuration via environment variables
- Form validation and error handling

### Testimonials
- Full CRUD operations
- MongoDB storage
- Admin interface (can be added)

## 🔒 Security

- Environment variables for sensitive data
- CORS configuration
- MongoDB access controls
- Rate limiting (recommended for production)

## 🐛 Troubleshooting

### Chat widget not working
- Verify `RAG_BACKEND_URL` is correct
- Check backend is running and healthy: visit `/health`
- Verify CORS settings allow your frontend domain

### MongoDB connection error
- Check connection string format
- Verify IP whitelist (0.0.0.0/0 for cloud)
- Test credentials

### RAG returns empty responses
- Ensure PDFs are in `RAG/pdfs/` directory
- Run `python app/ingest.py` to index documents
- Check Gemini API key is valid

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, use the contact form on the deployed site or reach out via GitHub issues.

---

Built with ❤️ using Next.js, FastAPI, and Google Gemini AI