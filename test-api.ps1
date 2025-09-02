# 🎵 MusicVNDow Backend API Test Script
# Chạy: .\test-api.ps1

$BASE_URL = "https://musicvndow.onrender.com"

Write-Host "🚀 Testing MusicVNDow Backend API" -ForegroundColor Green
Write-Host "Base URL: $BASE_URL" -ForegroundColor Yellow
Write-Host ""

# 1. Health Check
Write-Host "1️⃣ Testing Health Check..." -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "$BASE_URL/health" -Method GET
    Write-Host "✅ Health: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 2. Root Route
Write-Host "2️⃣ Testing Root Route..." -ForegroundColor Cyan
try {
    $root = Invoke-RestMethod -Uri "$BASE_URL/" -Method GET
    Write-Host "✅ Root: $($root.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Root failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 3. Get Files
Write-Host "3️⃣ Testing Get Files..." -ForegroundColor Cyan
try {
    $files = Invoke-RestMethod -Uri "$BASE_URL/api/files" -Method GET
    Write-Host "✅ Files: Found $($files.files.Count) files" -ForegroundColor Green
} catch {
    Write-Host "❌ Get Files failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 4. Test Download (comment out to avoid actual download)
Write-Host "4️⃣ Testing Download API..." -ForegroundColor Cyan
Write-Host "⚠️  Skipping actual download to avoid spam" -ForegroundColor Yellow
Write-Host "   Uncomment the code below to test download" -ForegroundColor Yellow

<#
try {
    $downloadBody = @{
        url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        format = "mp3"
    } | ConvertTo-Json
    
    $download = Invoke-RestMethod -Uri "$BASE_URL/api/download" -Method POST -Body $downloadBody -ContentType "application/json"
    Write-Host "✅ Download: $($download.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Download failed: $($_.Exception.Message)" -ForegroundColor Red
}
#>

Write-Host ""
Write-Host "🎉 API Testing Complete!" -ForegroundColor Green
Write-Host "💡 Check the results above to see if backend is working" -ForegroundColor Yellow
