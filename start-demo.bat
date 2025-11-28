@echo off
REM GameTherapy Demo Mode Quick Start
REM This script starts both backend and frontend servers

echo.
echo ========================================
echo GameTherapy - Demo Mode Launcher
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Navigating to backend...
cd backend
if not exist node_modules (
    echo [2/4] Installing backend dependencies...
    call npm install
) else (
    echo [2/4] Backend dependencies already installed
)

echo.
echo [3/4] Starting backend server on port 5000...
echo.
start cmd /k "npm start"

timeout /t 3

echo [4/4] Opening new terminal for frontend...
cd ..\frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)

echo.
echo Starting frontend server on port 3000...
echo The app will open automatically in your default browser.
echo.
call npm start

pause
