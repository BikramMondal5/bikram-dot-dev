@echo off
REM Pre-Deployment Testing Script for Windows
REM This script tests your build locally before deploying

echo ========================================
echo Pre-Deployment Testing
echo ========================================
echo.

REM Check Node.js version
echo [1/8] Checking Node.js version...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)
echo ✓ Node.js found
echo.

REM Check Python version
echo [2/8] Checking Python version...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python not found. Please install Python 3.11+
    pause
    exit /b 1
)
echo ✓ Python found
echo.

REM Check environment files
echo [3/8] Checking environment files...
if not exist ".env.local" (
    echo WARNING: .env.local not found!
    echo Please copy .env.local.example to .env.local and fill in values
    pause
)
if not exist "RAG\.env" (
    echo WARNING: RAG\.env not found!
    echo Please copy RAG\.env.example to RAG\.env and fill in values
    pause
)
echo ✓ Environment files checked
echo.

REM Install dependencies
echo [4/8] Installing Node.js dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

REM Run linting
echo [5/8] Running linting...
call npm run lint
if %errorlevel% neq 0 (
    echo WARNING: Linting found issues. Fix them before deploying.
    pause
)
echo ✓ Linting complete
echo.

REM Build Next.js
echo [6/8] Building Next.js for production...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed! Fix errors before deploying.
    pause
    exit /b 1
)
echo ✓ Build successful
echo.

REM Test Python backend
echo [7/8] Testing Python RAG backend...
cd RAG
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -r requirements.txt
python -m py_compile app/main.py
if %errorlevel% neq 0 (
    echo ERROR: Python backend has syntax errors!
    pause
    exit /b 1
)
cd ..
echo ✓ Backend tests passed
echo.

REM Final summary
echo [8/8] Summary
echo ========================================
echo ✓ All checks passed!
echo Your project is ready for deployment.
echo.
echo Next steps:
echo 1. Push code to GitHub: git push origin main
echo 2. Follow QUICK_DEPLOY.md for deployment
echo ========================================
pause
