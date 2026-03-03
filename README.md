# �✨ Modern Portfolio with AI-Powered Chat

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Python](https://img.shields.io/badge/Python-3.11-yellow)

A stunning, interactive portfolio website built with Next.js 16 and TypeScript, featuring an **AI-powered chatbot** using Retrieval Augmented Generation (RAG) with Google's Gemini AI. Ask questions about projects, experience, and skills — get intelligent responses powered by your own documents! 🤖💬

> **Sit back, sip your coffee ☕, and let AI showcase your portfolio!**

## 📸 Preview

![Portfolio Preview](public/screenshot.png)
*Note: Add your screenshot as `public/screenshot.png`*

## 🌟 Features

- 🎨 **Interactive 3D Hero Section** – Eye-catching animations with Three.js and React Three Fiber
- 🤖 **RAG-Powered AI Chat** – Intelligent chatbot that answers questions based on your documents
- 💬 **Persistent Chat History** – MongoDB-backed conversation memory
- 📧 **Contact Form** – Email integration with Nodemailer for seamless communication
- ⭐ **Testimonials System** – Full CRUD operations for managing client feedback
- 🎯 **Project Showcase** – Beautiful project cards with detailed descriptions
- 🏆 **Certificates Gallery** – Visual display of achievements and certifications
- 🌐 **Responsive Design** – Flawless experience on desktop, tablet, and mobile
- 🎭 **Smooth Animations** – Powered by Framer Motion for buttery-smooth transitions
- 🌙 **Dark Mode Support** – Built-in theme support for better UX
- ⚡ **Blazing Fast** – Optimized with Next.js 16 App Router and server components
- 🔒 **Secure** – Environment-based configuration and data validation
- 📊 **SEO Optimized** – Meta tags and structured data for better discoverability

## 🛠️ Technologies Used

### Frontend
- **Next.js 16** – React framework with App Router
- **TypeScript** – Type-safe development
- **Tailwind CSS 4** – Modern utility-first CSS framework
- **Framer Motion** – Advanced animation library
- **Three.js / React Three Fiber** – 3D graphics and animations
- **Radix UI** – Accessible, unstyled UI components
- **React Markdown** – Markdown rendering for rich content
- **Lucide React** – Beautiful icon library

### Backend & AI
- **FastAPI** (Python) – High-performance API framework for RAG system
- **Google Gemini AI** – Advanced language model for intelligent responses
- **ChromaDB** – Vector database for semantic search
- **MongoDB** – NoSQL database for data persistence
- **Mongoose** – MongoDB ODM for Node.js
- **Nodemailer** – Email service integration

### DevOps & Tools
- **ESLint** – Code linting and quality checks
- **Vapi AI** – Voice agent integration (optional)
- **GitHub Actions** – CI/CD pipeline
- **Vercel Ready** – Optimized for Vercel deployment

## 📦 Project Structure

```
bikram-dot-dev/
├── app/                    # Next.js 16 App Router
│   ├── api/               # API routes (chat, email, testimonials)
│   │   ├── chat-history/  # Chat history management
│   │   ├── rag/           # RAG integration endpoint
│   │   ├── send-email/    # Contact form handler
│   │   └── testimonials/  # Testimonials CRUD
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ChatWidget.tsx     # AI-powered chat interface
│   ├── HeroSection.tsx    # 3D animated hero
│   ├── ProjectShowcase.tsx # Project cards
│   ├── TestimonialCarousel.tsx # Testimonials slider
│   └── ui/                # Reusable UI components
├── RAG/                   # Python RAG Backend
│   ├── app/               # FastAPI application
│   │   ├── main.py        # API server
│   │   ├── rag.py         # RAG logic
│   │   ├── ingest.py      # Document processing
│   │   └── utils/         # Helper functions
│   ├── pdfs/              # Your documents (resume, projects, etc.)
│   └── db/                # ChromaDB vector storage
├── lib/                   # Utilities
│   ├── mongodb.ts         # Database connection
│   ├── utils.ts           # Helper functions
│   └── models/            # Mongoose schemas
└── public/                # Static assets
    ├── icons/             # Icons and logos
    └── Certificates/      # Certificate images
```

## ⚙️ Installation

### Prerequisites
- **Node.js 18+** – [Download here](https://nodejs.org/)
- **Python 3.11+** – [Download here](https://www.python.org/)
- **MongoDB Atlas** – [Sign up](https://www.mongodb.com/cloud/atlas)
- **Google Gemini API Key** – [Get key](https://makersuite.google.com/app/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/BikramMondal5/bikram-dot-dev.git
cd bikram-dot-dev
```

### 2. Install Dependencies

```bash
# Install Node.js dependencies
npm install
# or if you encounter peer dependency issues
npm install --legacy-peer-deps
```

### 3. Setup Environment Variables

Create `.env.local` in the root directory:
```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# RAG Backend URL
RAG_BACKEND_URL=http://localhost:8000

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

Create `RAG/.env` for the Python backend:
```env
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000
```

### 4. Setup RAG Backend

```bash
# Navigate to RAG directory
cd RAG

# Install Python dependencies
pip install -r requirements.txt

# Add your documents (PDF format) to RAG/pdfs/ directory
# Example: resume.pdf, projects.pdf, certificates.pdf

# Index your documents
python app/ingest.py

# Go back to root
cd ..
```

### 5. Start Development Servers

#### Option 1: Start Both Servers with One Command
```bash
# Windows
start_servers.bat

# Mac/Linux
chmod +x start_servers.sh
./start_servers.sh
```

#### Option 2: Start Manually
```bash
# Terminal 1: Start RAG Backend
cd RAG
uvicorn app.main:app --reload

# Terminal 2: Start Next.js Frontend
npm run dev
```

### 6. Open Your Browser

Navigate to **`http://localhost:3000`** to view your portfolio! 🎉

## � How to Use

### For Visitors
1. **🏠 Explore the Portfolio** – Navigate through different sections to learn about projects and experience
2. **💬 Chat with AI** – Click the chat widget to ask questions about skills, projects, or experience
3. **📧 Get in Touch** – Use the contact form to send a message directly
4. **⭐ Read Testimonials** – See what others say about the work

### For Developers (Customization)

#### Add Your Content
1. **Update Personal Details** – Edit `public/my-details.json` with your information
2. **Add Documents** – Place your PDFs (resume, project docs) in `RAG/pdfs/`
3. **Index Documents** – Run `python RAG/app/ingest.py` to make them searchable
4. **Add Projects** – Update project data in `components/ProjectShowcase.tsx`
5. **Add Certificates** – Place images in `public/Certificates/` and update `components/CertificatesSection.tsx`

#### Customize Styling
- **Colors & Theme** – Edit `app/globals.css` for color schemes
- **Components** – Modify components in `components/` directory
- **Layout** – Update `app/layout.tsx` for site-wide changes

#### Manage Testimonials
- Access testimonials API at `/api/testimonials` (GET, POST, PUT, DELETE)
- Add testimonials through MongoDB or create an admin panel

## 📚 Deployment

Ready to go live? We've got you covered with detailed guides!

### Quick Deploy (Recommended) ⚡
**[🚀 QUICK_DEPLOY.md](QUICK_DEPLOY.md)** – Deploy in 15 minutes!
- Vercel (Frontend) – Free tier
- Render (Backend) – Free tier  
- MongoDB Atlas – Free tier
- **Total Cost: $0/month** 💰

### Other Deployment Options
- **[📖 DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** – Comprehensive guide (Vercel+Render, VPS, Railway)
- **[✅ DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** – Step-by-step deployment checklist
- **[📁 FILES_OVERVIEW.md](FILES_OVERVIEW.md)** – All deployment files explained

### Pre-Deployment Testing
```bash
# Test your build before deploying
# Windows
test-deployment.bat

# Mac/Linux
chmod +x test-deployment.sh
./test-deployment.sh
```

## 📝 Documentation

### Core Documentation
- **[RAG_INTEGRATION_GUIDE.md](RAG_INTEGRATION_GUIDE.md)** – Complete RAG system architecture and setup
- **[DEPLOYMENT_PACKAGE.md](DEPLOYMENT_PACKAGE.md)** – Overview of all deployment files

### Configuration Templates
- `.env.local.example` – Frontend environment variables template
- `RAG/.env.example` – Backend environment variables template  
- `vercel.json` – Vercel deployment configuration
- `RAG/render.yaml` – Render deployment configuration
- `RAG/railway.toml` – Railway deployment configuration

## 🔧 Available Scripts

### Development
```bash
npm run dev              # Start Next.js development server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint linter

# Quick start both servers
start_servers.bat       # Windows - Start both frontend & backend
start_servers.sh        # Mac/Linux - Start both frontend & backend
```

### RAG Backend
```bash
cd RAG
uvicorn app.main:app --reload      # Start FastAPI dev server
python app/ingest.py               # Index PDF documents
python clear_db.py                 # Clear ChromaDB vector database
```

### Testing
```bash
test-deployment.bat     # Windows - Pre-deployment checks
test-deployment.sh      # Mac/Linux - Pre-deployment checks
```

## 🌟 Key Features Explained

### 🤖 RAG-Powered AI Chat
The intelligent chatbot uses **Retrieval Augmented Generation** to provide accurate answers:
1. **User Query** – Visitor asks a question in the chat
2. **Semantic Search** – ChromaDB finds relevant document chunks
3. **Context Injection** – Retrieved content is added to the AI prompt
4. **AI Generation** – Gemini AI generates contextual response
5. **Response Delivery** – Answer displayed in chat with sources

### 📧 Contact Form
- **Email Integration** – Nodemailer with Gmail SMTP
- **Validation** – Client & server-side form validation
- **Error Handling** – Graceful error messages
- **Anti-Spam** – Rate limiting (recommended for production)

### ⭐ Testimonials System
- **Full CRUD** – Create, Read, Update, Delete operations
- **MongoDB Storage** – Persistent data storage with Mongoose
- **API Routes** – RESTful API at `/api/testimonials`
- **Admin Panel** – Can be added for easy management

### 🎨 3D Hero Section
- **Three.js** – WebGL-powered 3D graphics
- **React Three Fiber** – React integration for Three.js
- **Smooth Animations** – 60 FPS performance
- **Responsive** – Adapts to all screen sizes

## 🔒 Security Best Practices

- ✅ Environment variables for sensitive data (API keys, passwords)
- ✅ CORS configuration to prevent unauthorized access
- ✅ MongoDB access controls and IP whitelisting
- ✅ Input validation and sanitization
- ✅ Rate limiting for API endpoints (recommended)
- ✅ HTTPS in production (auto with Vercel/Render)

## 🐛 Troubleshooting

### Chat Widget Not Responding
**Problem**: Chat doesn't work or returns errors

**Solutions**:
1. Verify `RAG_BACKEND_URL` in `.env.local` is correct
2. Check backend health: visit `http://localhost:8000/health`
3. Ensure backend is running: `cd RAG && uvicorn app.main:app --reload`
4. Check browser console for CORS errors
5. Verify `ALLOWED_ORIGINS` in `RAG/.env` includes your frontend URL

### MongoDB Connection Failed
**Problem**: Cannot connect to MongoDB

**Solutions**:
1. Verify connection string format in `.env.local`
2. Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for cloud hosting)
3. Confirm database user credentials are correct
4. Test connection with MongoDB Compass

### RAG Returns Generic/Empty Responses
**Problem**: AI doesn't use your documents

**Solutions**:
1. Check PDFs exist in `RAG/pdfs/` directory
2. Re-run ingestion: `cd RAG && python app/ingest.py`
3. Verify ChromaDB created in `RAG/db/` directory
4. Check Gemini API key is valid
5. Review backend logs for errors

### Build Errors
**Problem**: `npm run build` fails

**Solutions**:
1. Clear cache: `rm -rf .next node_modules && npm install`
2. Check Node.js version: `node --version` (should be 18+)
3. Fix any TypeScript errors shown in output
4. Ensure all dependencies are installed

### Email Not Sending
**Problem**: Contact form doesn't send emails

**Solutions**:
1. Use Gmail App Password, not regular password
2. Enable 2-Step Verification in Google Account
3. Generate App Password: Google Account → Security → App Passwords
4. Update `EMAIL_PASSWORD` in `.env.local`

## 🤝 Contribution

**Got ideas? Found a bug? Want to contribute? 🐞**

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Test your changes thoroughly
- Update documentation if needed
- Be respectful and constructive

### Ideas for Contributions
- 🎨 New UI components or themes
- 🌐 Internationalization (i18n) support
- 📊 Analytics dashboard
- 🔐 Admin panel for content management
- 🎭 More animation presets
- 📱 Progressive Web App (PWA) features
- ♿ Accessibility improvements

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

```
MIT License - You are free to:
✅ Use commercially
✅ Modify
✅ Distribute
✅ Use privately
```

## 🙏 Acknowledgments

- **Next.js Team** – For the amazing React framework
- **Vercel** – For seamless deployment platform
- **Google** – For Gemini AI API
- **Open Source Community** – For incredible libraries and tools

## 📧 Contact & Support

- **Portfolio**: [Your Live URL Here]
- **GitHub**: [@BikramMondal5](https://github.com/BikramMondal5)
- **Issues**: [Create an issue](https://github.com/BikramMondal5/bikram-dot-dev/issues)
- **Discussions**: [GitHub Discussions](https://github.com/BikramMondal5/bikram-dot-dev/discussions)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Built with ❤️ by developers, for developers**

*Using Next.js 16 • TypeScript • FastAPI • Google Gemini AI • MongoDB*

[⬆ Back to Top](#-modern-portfolio-with-ai-powered-chat)

</div>