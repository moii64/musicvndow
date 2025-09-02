# Deploy Backend lên Render
Write-Host "🚀 Deploying Backend to Render..." -ForegroundColor Green

# Kiểm tra Git status
Write-Host "📋 Checking Git status..." -ForegroundColor Yellow
git status

# Thêm files
Write-Host "➕ Adding files to Git..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "🔧 Fix backend errors: yt-dlp detection, error handling, timeout protection"

# Push
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "✅ Backend deployed to Render!" -ForegroundColor Green
Write-Host "🔗 Check deployment at: https://dashboard.render.com" -ForegroundColor Cyan
Write-Host "⏳ Wait for build to complete..." -ForegroundColor Yellow
