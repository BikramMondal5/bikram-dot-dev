@echo off
REM Start RAG Backend and Next.js Development Server
REM This script starts both servers in separate windows

echo ================================================
echo Starting RAG Integration Servers
echo ================================================
echo.

REM Check if we're in the correct directory
if not exist "RAG\app\main.py" (
    echo ERROR: RAG folder not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

REM Start RAG Backend in a new window
echo Starting RAG Backend Server (Port 8000)...
start "RAG Backend - Port 8000" cmd /k "cd RAG && python -m app.main"

REM Wait a moment for the backend to start
timeout /t 3 /nobreak > nul

REM Start Next.js Dev Server in a new window
echo Starting Next.js Development Server (Port 3000)...
start "Next.js Dev - Port 3000" cmd /k "npm run dev"

echo.
echo ================================================
echo Servers Starting...
echo ================================================
echo.
echo RAG Backend:  http://localhost:8000
echo Next.js App:  http://localhost:3000
echo API Docs:     http://localhost:8000/docs
echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause
