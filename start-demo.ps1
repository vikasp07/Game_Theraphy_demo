# GameTherapy Demo Mode Quick Start Script
# Run this with: PowerShell -ExecutionPolicy Bypass -File start-demo.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GameTherapy - Demo Mode Launcher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "[✓] Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[✗] ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Backend Setup
Write-Host ""
Write-Host "[1/4] Setting up backend..." -ForegroundColor Yellow
Push-Location backend

if (-not (Test-Path "node_modules")) {
    Write-Host "[2/4] Installing backend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "[2/4] Backend dependencies already installed" -ForegroundColor Green
}

# Start Backend in new PowerShell window
Write-Host "[3/4] Starting backend server on http://localhost:5000..." -ForegroundColor Green
$backendScript = @"
cd '$pwd'
npm start
Read-Host 'Press Enter to stop backend server'
"@

$backendScript | Out-File -FilePath "backend-start.ps1" -Encoding UTF8
Start-Process powershell -ArgumentList "-NoExit", "-File", "backend-start.ps1"

Start-Sleep -Seconds 3

# Frontend Setup
Pop-Location
Push-Location frontend

if (-not (Test-Path "node_modules")) {
    Write-Host "[4/4] Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "[✓] Frontend is starting on https://game-theraphy-backend.onrender.com" -ForegroundColor Green
Write-Host "The app will open automatically in your default browser." -ForegroundColor Cyan
Write-Host ""

npm start

Pop-Location
