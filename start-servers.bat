@echo off
echo ========================================
echo    VN Music Downloader - Start Script
echo ========================================
echo.

echo [1/3] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found! Please install Node.js first.
    pause
    exit /b 1
)
echo ✓ Node.js found

echo.
echo [2/3] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo ✓ Dependencies installed

echo.
echo [3/3] Starting servers...
echo.

echo Starting Express Server (API) on port 3000...
start "Express Server" cmd /k "npm start"

echo Waiting 3 seconds for Express Server to start...
timeout /t 3 /nobreak >nul

echo Starting Live Server (Frontend) on port 8080...
start "Live Server" cmd /k "live-server public --port=8080 --open=/index.html"

echo.
echo ========================================
echo    Servers are starting...
echo ========================================
echo.
echo Express Server (API): http://localhost:3000
echo Live Server (Frontend): http://localhost:8080/index.html
echo.
echo Press any key to open browsers...
pause >nul

echo Opening browsers...
start http://localhost:8080/index.html
start http://localhost:3000/index.html

echo.
echo ✓ All servers started successfully!
echo.
echo To stop servers, close the command windows.
pause
