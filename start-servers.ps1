# VN Music Downloader - Start Script (PowerShell)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   VN Music Downloader - Start Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "[1/3] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js not found! Please install Node.js first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[2/3] Installing dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to install dependencies!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[3/3] Starting servers..." -ForegroundColor Yellow
Write-Host ""

# Start Express Server
Write-Host "Starting Express Server (API) on port 3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start" -WindowStyle Normal

# Wait for Express Server to start
Write-Host "Waiting 3 seconds for Express Server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start Live Server
Write-Host "Starting Live Server (Frontend) on port 8080..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; live-server public --port=8080 --open=/index.html" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Servers are starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Express Server (API): http://localhost:3000" -ForegroundColor White
Write-Host "Live Server (Frontend): http://localhost:8080" -ForegroundColor White
Write-Host ""

$openBrowsers = Read-Host "Press Enter to open browsers (or 'n' to skip)"
if ($openBrowsers -ne 'n') {
    Write-Host "Opening browsers..." -ForegroundColor Green
    Start-Process "http://localhost:8080"
    Start-Process "http://localhost:3000"
}

Write-Host ""
Write-Host "✓ All servers started successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "To stop servers, close the command windows." -ForegroundColor Yellow
Read-Host "Press Enter to exit"
